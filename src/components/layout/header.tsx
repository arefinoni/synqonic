import { BrandLockup } from "@/components/layout/brand-lockup";
import { CommunityCta } from "@/components/layout/community-cta";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { ResponsiveContainer } from "@/components/ui/responsive-container";

export function Header() {
  return (
    <header className="relative z-30 border-b border-border bg-background">
      <ResponsiveContainer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-0 py-4 lg:min-h-[5.5rem] lg:py-0">
        <BrandLockup />
        <SiteNavigation />
        <CommunityCta className="hidden lg:inline-flex" />
      </ResponsiveContainer>
    </header>
  );
}
