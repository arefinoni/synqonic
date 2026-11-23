import { discordInviteUrl } from "@/config/social";
import { SocialPlatformIcon } from "@/components/ui/social-platform-icon";

type CommunityCtaProps = {
  className?: string;
  size?: "default" | "large";
  variant?: "outline" | "discord";
};

export function CommunityCta({ className = "", size = "default", variant = "discord" }: CommunityCtaProps) {
  const isLarge = size === "large";
  const isDiscord = variant === "discord";

  const sizeClasses = isLarge
    ? "min-h-16 px-8 py-4 text-base sm:text-lg gap-3.5 font-bold rounded-lg"
    : "min-h-11 px-4 text-sm gap-2 font-medium rounded-md";

  const iconClass = isLarge ? "size-7" : "size-5";

  const variantClasses = isDiscord
    ? "bg-[#5865F2] text-white border-transparent hover:bg-[#4752C4] shadow-md shadow-[#5865F2]/25 hover:shadow-xl hover:shadow-[#5865F2]/40 hover:scale-[1.02] active:scale-[0.98]"
    : "border border-border bg-surface text-foreground hover:border-accent hover:bg-surface-raised hover:text-accent";

  const classes = `inline-flex shrink-0 items-center justify-center border transition-all duration-200 focus-visible:outline-offset-4 ${sizeClasses} ${variantClasses} ${className}`;

  return (
    <a className={classes} href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
      <SocialPlatformIcon platform="discord" className={iconClass} />
      <span>Join Discord</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
