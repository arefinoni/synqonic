import { Button } from "@/components/ui/button";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { SocialLinks } from "@/components/ui/social-links";
import { HeroTechnicalVisual } from "@/components/sections/hero-technical-visual";
import { HomepageSections } from "@/components/sections/homepage-sections";
import { homepagePrimarySocialLinks } from "@/config/social";

export default function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-atmosphere" aria-hidden="true">
          <svg className="home-hero-circuits" viewBox="0 0 1600 800" preserveAspectRatio="none" fill="none">
            <g>
              <path d="M0 135h132l48 48h235l42-42h278l48 48h234l42-42h541" />
              <path d="M0 362h204l34-34h188l54 54h173l38-38h236l46 46h229l39-39h163" />
              <path d="M0 624h160l46-46h218l42 42h230l40-40h205l54 54h241l36-36h188l30 30h150" />
              <path d="M188 0v84l42 42m566-126v92l-34 34m462-126v78l-38 38M344 800v-92l42-42m712 134v-82l-42-42m356 124v-96l-38-38" />
              <circle cx="180" cy="183" r="3" />
              <circle cx="783" cy="142" r="3" />
              <circle cx="1110" cy="168" r="3" />
              <circle cx="248" cy="328" r="3" />
              <circle cx="691" cy="382" r="3" />
              <circle cx="970" cy="344" r="3" />
              <circle cx="206" cy="578" r="3" />
              <circle cx="1190" cy="620" r="3" />
            </g>
          </svg>
        </div>
        <ResponsiveContainer className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="text-technical-label mb-6 text-accent">Cybersecurity · Learning · Research</p>
            <h1 id="home-title" className="home-hero-title text-display font-medium">
              Question the system.
              <br />
              <span className="text-muted">Break assumptions.</span>
            </h1>
            <div className="mt-10">
              <div className="hero-cta-row">
                <Button href="/academy" variant="primary">Explore the academy</Button>
                <nav aria-label="Primary social platforms">
                  <SocialLinks links={homepagePrimarySocialLinks} variant="outlined" />
                </nav>
              </div>
            </div>
          </div>
          <HeroTechnicalVisual />
        </ResponsiveContainer>
      </section>
      <HomepageSections />
    </>
  );
}
