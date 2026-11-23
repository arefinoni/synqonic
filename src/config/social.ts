export type SocialPlatform =
  | "youtube"
  | "instagram"
  | "x"
  | "threads"
  | "bluesky"
  | "tiktok"
  | "mastodon"
  | "twitch"
  | "kick"
  | "medium"
  | "facebook"
  | "discord";

export type SocialLink = {
  platform: Exclude<SocialPlatform, "discord">;
  label: string;
  href: string;
  category?: string;
};

export type SocialGroup = {
  label: string;
  links: SocialLink[];
};

export const primarySocialLinks: SocialLink[] = [
  { platform: "youtube", label: "YouTube", href: "https://youtube.com/@synqonic?sub_confirmation=1", category: "Video" },
  { platform: "x", label: "X", href: "https://x.com/synqonic", category: "Social" },
  { platform: "medium", label: "Medium", href: "https://medium.com/@synqonic", category: "Publishing" },
];

const homepagePrimaryOrder: SocialLink["platform"][] = ["x", "youtube", "medium"];
export const homepagePrimarySocialLinks = [...primarySocialLinks].sort(
  (a, b) => homepagePrimaryOrder.indexOf(a.platform) - homepagePrimaryOrder.indexOf(b.platform),
);

export const secondarySocialGroups: SocialGroup[] = [
  {
    label: "Meta",
    links: [
      { platform: "facebook", label: "Facebook", href: "https://facebook.com/synqonic", category: "Social" },
      { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/synqonic", category: "Social" },
      { platform: "threads", label: "Threads", href: "https://www.threads.com/@synqonic", category: "Social" },
    ],
  },
  {
    label: "Video & streaming",
    links: [
      { platform: "youtube", label: "YouTube Live", href: "https://youtube.com/@synqoniclive?sub_confirmation=1", category: "Streaming" },
      { platform: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@synqonic", category: "Video" },
      { platform: "twitch", label: "Twitch", href: "https://www.twitch.tv/synqonic", category: "Streaming" },
      { platform: "kick", label: "Kick", href: "https://kick.com/synqonic", category: "Streaming" },
    ],
  },
  {
    label: "Other networks",
    links: [
      { platform: "bluesky", label: "Bluesky", href: "https://bsky.app/profile/synqonic.bsky.social", category: "Social" },
      { platform: "mastodon", label: "Mastodon", href: "https://mastodon.social/@synqonic", category: "Social" },
    ],
  },
];

export const secondarySocialLinks: SocialLink[] = secondarySocialGroups.flatMap((group) => group.links);

export const socialLinks: SocialLink[] = [
  ...primarySocialLinks,
  ...secondarySocialLinks,
];

export const discordInviteUrl = "https://discord.com/invite/syA5UQbx5u";
