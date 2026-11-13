"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CommunityCta } from "@/components/layout/community-cta";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/academy" },
  { label: "Resources", href: "/resources" },
  { label: "Media", href: "/media" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

function isCurrentRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const linkClassName = (active: boolean) =>
    `relative inline-flex min-h-11 items-center text-sm transition-colors hover:text-accent ${active ? "text-accent" : "text-muted"}`;

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground hover:border-accent hover:text-accent focus-visible:outline-offset-2 lg:hidden"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
          {isMenuOpen ? (
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <nav className="hidden lg:block" aria-label="Main navigation">
        <ul className="flex items-center gap-x-5 xl:gap-x-7">
          {navigation.map(({ label, href }) => {
            const active = isCurrentRoute(pathname, href);
            return (
              <li key={href}>
                <Link className={linkClassName(active)} href={href} aria-current={active ? "page" : undefined}>
                  {label}
                  {active ? <span className="absolute inset-x-0 -bottom-1 h-px bg-accent" aria-hidden="true" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        id="mobile-navigation"
        className={`${isMenuOpen ? "block" : "hidden"} w-full border-t border-border pt-3 lg:hidden`}
        aria-label="Mobile navigation"
      >
        <ul className="grid gap-1">
          {navigation.map(({ label, href }) => {
            const active = isCurrentRoute(pathname, href);
            return (
              <li key={href}>
                <Link
                  className={`${linkClassName(active)} w-full gap-3 rounded-md px-3 ${active ? "bg-surface-raised" : "hover:bg-surface"}`}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={`size-1.5 rounded-full ${active ? "bg-accent" : "bg-transparent"}`} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <CommunityCta className="w-full justify-center hover:border-accent" />
          </li>
        </ul>
      </nav>
    </>
  );
}
