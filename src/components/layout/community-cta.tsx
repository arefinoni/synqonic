import { discordInviteUrl } from "@/config/social";
import { SocialPlatformIcon } from "@/components/ui/social-platform-icon";

type CommunityCtaProps = {
  className?: string;
};

export function CommunityCta({ className = "" }: CommunityCtaProps) {
  const classes = `inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors ${className}`;

  return (
    <a className={`${classes} hover:border-accent hover:text-accent`} href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
      <SocialPlatformIcon platform="discord" />
      Join Discord
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
