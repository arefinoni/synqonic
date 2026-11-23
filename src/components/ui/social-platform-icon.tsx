import type { SocialPlatform } from "@/config/social";

type SocialPlatformIconProps = {
  platform: SocialPlatform;
  className?: string;
};

export function SocialPlatformIcon({ platform, className = "" }: SocialPlatformIconProps) {
  const hasCustomSize = /\bsize-\d+\b/.test(className);
  const common = {
    "aria-hidden": true as const,
    className: `${hasCustomSize ? "" : "size-5 "}shrink-0 ${className}`.trim(),
    fill: "none",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (platform) {
    case "youtube":
      return <svg {...common}><path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.5 4.6 12 4.6 12 4.6s-5.5 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.7.5 7.2.5 7.2.5s5.5 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9Z" fill="currentColor"/><path d="m10 15.5 5.2-3.5L10 8.5v7Z" fill="var(--background)"/></svg>;
    case "instagram":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.6" cy="6.6" r="1.1" fill="currentColor"/></svg>;
    case "x":
      return <svg {...common}><path d="M4 3h4.7l11.3 18h-4.7L4 3Zm1.1 18 6.7-7.7m.4-2.6L18.9 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "threads":
      return <svg {...common}><path d="M19.6 12.7c-.2 4.1-2.4 7.1-6.4 7.1-4.7 0-7.4-3.3-7.4-8.1 0-4.9 2.8-8.2 7.2-8.2 3.4 0 5.8 1.7 6.4 4.8m-6.9 4.3c2.2-.1 3.8-1.3 3.8-3.4 0-2.3-1.6-3.6-3.8-3.6-2.4 0-3.8 1.5-3.8 3.6 0 2.3 1.6 3.6 4.1 3.6 2.2 0 3.7.9 3.7 2.8 0 1.7-1.2 2.9-3 2.9-1.7 0-2.8-1.1-2.8-2.6 0-1.4 1.1-2.4 2.9-2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
    case "bluesky":
      return <svg {...common}><path d="M12 10.3C10.9 8.2 7.8 4.4 5.5 3.2 3.3 2.1 2.5 3.1 2.5 4.4c0 2.2 1.2 6.4 4.8 8.1-3.1-.3-4.1 1.2-3.2 3.2.8 1.8 2.7 2.3 4.6 1.6-1 4.1 1.4 4.7 3.3 1.2 1.9 3.5 4.3 2.9 3.3-1.2 1.9.7 3.8.2 4.6-1.6.9-2-.1-3.5-3.2-3.2 3.6-1.7 4.8-5.9 4.8-8.1 0-1.3-.8-2.3-3-.9-2.3 1.2-5.4 5-6.5 7.1Z" fill="currentColor"/></svg>;
    case "tiktok":
      return <svg {...common}><path d="M14.2 3v11.2a3.3 3.3 0 1 1-2.8-3.3V8a6.2 6.2 0 1 0 5.8 6.2V8.5a8.2 8.2 0 0 0 4.1 1.1V6.7A5.3 5.3 0 0 1 14.2 3Z" fill="currentColor"/></svg>;
    case "mastodon":
      return <svg {...common}><path d="M5 5.2C7.4 3.4 16.6 3.4 19 5.2c1.4 1.1 1.7 3.1 1.7 6.1 0 3.7-.7 5.4-2.5 6.5-1.4.9-3.6 1.2-6.2 1.2l.4-2.3c2.1.1 3.8-.1 4.5-.7.4-.3.6-.8.7-1.4-1.4.4-3.2.6-5.5.6-2.9 0-5.1-.4-6.3-1.4C4.2 12.6 4 10.6 4 8.5c0-1.4.2-2.6 1-3.3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8.5 8.1v4.5m7-4.5v4.5M8.5 8.3c0-1 2.2-1.1 3.5-.2 1.3-.9 3.5-.8 3.5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
    case "twitch":
      return <svg {...common}><path d="M5 3h17v12l-5 5h-4l-3 2v-2H6v-4H3V6l2-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 7v6m6-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
    case "kick":
      return <svg {...common}><path d="M5 3h5v6l5-6h6l-7 8 7 10h-6l-5-7v7H5V3Z" fill="currentColor"/></svg>;
    case "medium":
      return <svg {...common}><path d="M3 6.1 8.1 4l5.1 11L18.3 4 21 5.2v13.6L18 20V9.1l-4.8 10.4h-1.3L7 9.1v9.1l2.1 1.1H3l2.1-1.1V7.3L3 6.1Z" fill="currentColor"/></svg>;
    case "facebook":
      return <svg {...common}><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.6v8H14Z" fill="currentColor"/></svg>;
    case "discord":
      return <svg {...common}><path d="M19.6 5.2A18 18 0 0 0 15.2 4l-.6 1.2a16 16 0 0 0-5.2 0L8.8 4a18 18 0 0 0-4.4 1.2C1.6 9.3.8 13.4 1.2 17.5a18 18 0 0 0 5.4 2.7l1.2-2a11 11 0 0 1-1.9-.9l.5-.4a13 13 0 0 0 11.2 0l.5.4a11 11 0 0 1-1.9.9l1.2 2a18 18 0 0 0 5.4-2.7c.5-4.8-.8-8.9-3.2-12.3ZM8.8 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" fill="currentColor"/></svg>;
  }
}
