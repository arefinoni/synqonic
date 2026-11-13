import Link from "next/link";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { SocialLinks } from "@/components/ui/social-links";
import { socialLinks } from "@/config/social";

const footerNavigation = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/academy" },
  { label: "Resources", href: "/resources" },
  { label: "Media", href: "/media" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="md:col-span-2 lg:col-span-4">
          <BrandLockup />
          <p className="mt-5 text-xl font-medium leading-snug tracking-[-0.02em]">
            Question the system.<br />
            <span className="text-muted">Break assumptions.</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Cybersecurity education, research, media, and community.
          </p>
        </div>

        <nav className="lg:col-span-2" aria-label="Footer navigation">
          <h2 className="text-technical-label mb-4 text-subtle">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {footerNavigation.map(({ label, href }) => (
              <li key={href}>
                <Link className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-accent" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-6" aria-label="Social links">
          <h2 className="text-technical-label mb-3 text-subtle">Connect</h2>
          <SocialLinks links={socialLinks} />
        </nav>
      </div>

      <div className="mt-7 border-t border-border pt-5">
        <p className="font-mono text-xs text-subtle">© {new Date().getFullYear()} SYNQONIC</p>
      </div>
    </footer>
  );
}
