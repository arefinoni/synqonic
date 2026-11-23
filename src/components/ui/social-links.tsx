import { primarySocialLinks, secondarySocialGroups } from "@/config/social";
import type { SocialLink } from "@/config/social";
import { SocialPlatformIcon } from "@/components/ui/social-platform-icon";

type SocialLinksProps = {
  links: SocialLink[];
  variant?: "featured" | "outlined" | "compact";
  ariaLabel?: string;
};

export function SocialLinks({ links, variant = "compact", ariaLabel }: SocialLinksProps) {
  const featured = variant === "featured";
  const outlined = variant === "outlined";

  return (
    <ul
      className={featured
        ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        : outlined
          ? "flex flex-wrap gap-2"
          : "flex flex-wrap gap-x-4 gap-y-1"}
      aria-label={ariaLabel ?? (featured || outlined ? "Primary platforms" : undefined)}
    >
      {links.map(({ platform, label, href, category }) => (
        <li key={`${platform}-${label}`}>
          <a
            className={featured
              ? "group flex min-h-20 items-center gap-4 rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:border-accent hover:bg-surface-raised focus-visible:outline-offset-4"
              : outlined
                ? "group inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-2.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                : "group inline-flex min-h-9 items-center gap-2 text-sm text-muted transition-colors hover:text-accent"}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialPlatformIcon
              platform={platform}
              className={featured
                ? "size-6 text-accent transition-transform group-hover:scale-105"
                : outlined
                  ? "size-5 text-muted transition-colors group-hover:text-accent"
                  : "text-subtle transition-colors group-hover:text-accent"}
            />
            {featured ? (
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                {category ? <span className="text-technical-label text-subtle">{category}</span> : null}
                <span className="font-medium text-foreground">{label}</span>
              </span>
            ) : <span>{label}</span>}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SocialGroups() {
  return (
    <div className="grid gap-7 sm:grid-cols-3">
      {secondarySocialGroups.map(({ label, links }) => {
        const headingId = `social-group-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

        return (
          <section key={label} aria-labelledby={headingId}>
            <h3 id={headingId} className="text-technical-label mb-3 text-subtle">
              {label}
            </h3>
            <SocialLinks links={links} />
          </section>
        );
      })}
    </div>
  );
}

export function PrimarySocialLinks({ variant = "featured" }: { variant?: "featured" | "compact" }) {
  return <SocialLinks links={primarySocialLinks} variant={variant} />;
}
