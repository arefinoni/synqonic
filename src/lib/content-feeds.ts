import "server-only";
import { contentFeedRevalidateSeconds, mediumPublication, youtubeChannel } from "@/config/content-feeds";

export type FeedArticle = {
  title: string;
  description: string;
  url: string;
  publishedAt?: string;
  author?: string;
  image?: string;
};

export type FeedVideo = {
  id: string;
  title: string;
  url: string;
  publishedAt?: string;
  thumbnail: string;
};

export type FeedResult<T> = { items: T[]; available: boolean };

const MAX_FEED_BYTES = 1_000_000;
const FEED_USER_AGENT = "Mozilla/5.0 (compatible; Synqonic RSS reader; +https://synqonic.arefinoni.workers.dev)";

type CloudflareFetchInit = RequestInit & {
  cf?: {
    cacheEverything?: boolean;
    cacheTtl?: number;
  };
};

function decodeEntities(value: string): string {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code: string) => {
    const lower = code.toLowerCase();
    if (lower === "amp") return "&";
    if (lower === "lt") return "<";
    if (lower === "gt") return ">";
    if (lower === "quot") return '"';
    if (lower === "apos") return "'";
    const point = lower.startsWith("#x") ? Number.parseInt(lower.slice(2), 16) : Number.parseInt(lower.slice(1), 10);
    return Number.isInteger(point) && point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
  });
}

function field(xml: string, name: string): string {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}\\s*>`, "i"));
  if (!match) return "";
  return decodeEntities(match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim());
}

function linkField(xml: string): string {
  return field(xml, "link") || decodeEntities(xml.match(/<link\b[^>]*\bhref=["']([^"']+)["']/i)?.[1] ?? "");
}

function cleanText(value: string, limit = 280): string {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function safeHttpUrl(value: string, allowedHosts: string[]): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !allowedHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function mediumImage(html: string): string | undefined {
  const source = html.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1];
  if (!source) return undefined;
  return safeHttpUrl(decodeEntities(source), ["cdn-images-1.medium.com", "miro.medium.com"]);
}

async function fetchFeed(url: string): Promise<string | undefined> {
  try {
    const requestInit: CloudflareFetchInit = {
      headers: {
        Accept: "application/atom+xml, application/rss+xml, application/xml, text/xml",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": FEED_USER_AGENT,
      },
      cf: { cacheTtl: contentFeedRevalidateSeconds },
      signal: AbortSignal.timeout(8_000),
    };
    const response = await fetch(url, requestInit);
    if (!response.ok) return undefined;
    const declaredLength = Number(response.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_FEED_BYTES) return undefined;
    if (!response.body) return undefined;
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let byteLength = 0;
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_FEED_BYTES) {
        await reader.cancel();
        return undefined;
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    if (/<!DOCTYPE|<!ENTITY/i.test(text)) return undefined;
    return text;
  } catch (error) {
    console.warn(`Failed to fetch feed ${url}`, error instanceof Error ? error.message : String(error));
    return undefined;
  }
}

export async function getLatestVideos(): Promise<FeedResult<FeedVideo>> {
  const xml = await fetchFeed(youtubeChannel.feedUrl);
  if (!xml || !/<feed\b[\s>]/i.test(xml)) return { items: [], available: false };

  const entries = [...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry\s*>/gi)].map((match) => match[1]);
  const items = entries.flatMap((entry): FeedVideo[] => {
    const id = field(entry, "yt:videoId");
    const channelId = field(entry, "yt:channelId");
    const title = cleanText(field(entry, "title"), 180);
    if (!/^[\w-]{11}$/.test(id) || ![youtubeChannel.id, youtubeChannel.id.slice(2)].includes(channelId) || !title) return [];
    const url = `https://www.youtube.com/watch?v=${id}`;
    const rawThumb = entry.match(/<media:thumbnail\b[^>]*\burl=["']([^"']+)["']/i)?.[1];
    const thumbnail = rawThumb ? safeHttpUrl(decodeEntities(rawThumb), ["i.ytimg.com"]) : undefined;
    const published = field(entry, "published");
    return [{ id, title, url, publishedAt: Number.isNaN(Date.parse(published)) ? undefined : published, thumbnail: thumbnail ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }];
  });
  return { items: items.slice(0, 3), available: true };
}

export async function getLatestArticles(): Promise<FeedResult<FeedArticle>> {
  const xml = await fetchFeed(mediumPublication.feedUrl);
  if (!xml || !/<rss\b[\s>]/i.test(xml)) return { items: [], available: false };

  const entries = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item\s*>/gi)].map((match) => match[1]);
  const items = entries.flatMap((entry): FeedArticle[] => {
    const title = cleanText(field(entry, "title"), 180);
    const url = safeHttpUrl(linkField(entry), ["medium.com"]);
    if (!title || !url) return [];
    const content = field(entry, "content:encoded") || field(entry, "description");
    const published = field(entry, "pubDate");
    const creator = cleanText(field(entry, "dc:creator"), 80);
    return [{
      title,
      description: cleanText(content) || "Read the full article on Medium.",
      url,
      publishedAt: Number.isNaN(Date.parse(published)) ? undefined : published,
      author: creator || undefined,
      image: mediumImage(content),
    }];
  });
  return { items: items.slice(0, 3), available: true };
}
