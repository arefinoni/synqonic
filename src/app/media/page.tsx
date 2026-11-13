import { MediumArticleImage } from "@/components/sections/medium-article-image";
import { YouTubeVideoCard } from "@/components/sections/youtube-video-card";
import { getLatestArticles, getLatestVideos } from "@/lib/content-feeds";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialGroups, SocialLinks } from "@/components/ui/social-links";
import { secondarySocialGroups } from "@/config/social";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media",
  description: "The latest SYNQONIC videos, articles, and official streaming channels.",
  openGraph: {
    title: "Media - SYNQONIC",
    description: "The latest SYNQONIC videos, articles, and official streaming channels.",
  },
};

export default async function MediaPage() {
  const [videos, articles] = await Promise.all([getLatestVideos(), getLatestArticles()]);
  const streamingLinks = secondarySocialGroups.find((group) => group.label === "Video & streaming")?.links.filter(({ label }) => ["YouTube Live", "Twitch", "Kick"].includes(label)) ?? [];

  return (
    <ResponsiveContainer>
      <section className="page-section" aria-labelledby="media-title">
        <SectionHeading
          title="Media"
          eyebrow="Video · Publishing · Social"
          description="The latest SYNQONIC videos and field notes, plus the official channels where new work appears."
          headingId="media-title"
        />

        <div className="mt-12 sm:mt-16">
          <h2 className="text-technical-label mb-5 text-subtle">Latest videos</h2>
          {videos.items.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {videos.items.map((video) => <YouTubeVideoCard key={video.id} video={video} />)}
            </div>
          ) : (
            <p className="rounded-md border border-border p-6 text-sm leading-7 text-muted">The YouTube feed is unavailable right now. Visit the channel for the latest videos.</p>
          )}
        </div>

        <div className="mt-16 border-t border-border pt-8 sm:mt-20">
          <h2 className="text-technical-label mb-6 text-subtle">Latest articles</h2>
          {articles.items.length ? (
            <div className="article-list">
              {articles.items.map((article) => (
                <article key={article.url} className="article-row">
                  {article.image ? <MediumArticleImage src={article.image} /> : <div className="article-image article-image-placeholder" aria-hidden="true"><span>Synqonic · Field notes</span></div>}
                  <div className="article-row-copy">
                    <h3 className="text-base font-medium"><a href={article.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">{article.title}<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a></h3>
                    <p>{article.description}</p>
                    <div className="article-meta">{article.author ? <span>{article.author}</span> : null}{article.publishedAt ? <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en", { dateStyle: "medium" })}</time> : null}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-md border border-border p-6 text-sm leading-7 text-muted">The Medium feed is unavailable right now. Visit the publication for the latest articles.</p>
          )}
        </div>

        <div className="mt-16 border-t border-border pt-8 sm:mt-20">
          <h2 className="text-technical-label mb-5 text-subtle">Primary platforms</h2>
          <SocialLinks links={streamingLinks} variant="featured" />
          <div className="mt-10">
            <h2 className="text-technical-label mb-5 text-subtle">More channels</h2>
            <SocialGroups />
          </div>
        </div>
      </section>
    </ResponsiveContainer>
  );
}
