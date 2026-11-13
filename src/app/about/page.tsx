import { ContentCard } from "@/components/ui/content-card";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SYNQONIC's mission, vision, and direction across education, research, media, and community.",
  openGraph: {
    title: "About - SYNQONIC",
    description: "Learn about SYNQONIC's mission, vision, and direction across education, research, media, and community.",
  },
};

export default function AboutPage() {
  return (
    <ResponsiveContainer>
      <section className="page-section" aria-labelledby="about-title">
        <SectionHeading
          title="Question the system. Break assumptions."
          eyebrow="About SYNQONIC"
          description="SYNQONIC is a cybersecurity education, research, media, and community platform for people who want to understand how systems work and how to make them safer."
          headingId="about-title"
        />
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
          <ContentCard>
            <p className="text-technical-label text-accent">Mission</p>
            <h2 className="mt-5 text-2xl font-medium">Make responsible security thinking easier to access.</h2>
            <p className="mt-3 text-sm leading-7 text-muted">We explain concepts clearly, point to reliable references, and encourage careful practice rather than shortcuts or unsupported claims.</p>
          </ContentCard>
          <ContentCard>
            <p className="text-technical-label text-accent">Vision</p>
            <h2 className="mt-5 text-2xl font-medium">A more curious and capable security culture.</h2>
            <p className="mt-3 text-sm leading-7 text-muted">The direction is simple: learn deeply, research responsibly, publish useful work, and make room for people to keep asking better questions.</p>
          </ContentCard>
        </div>
        <div className="mt-16 grid gap-4 border-t border-border pt-10 sm:mt-20 sm:grid-cols-3">
          {[
            ["Education", "Build fundamentals and practical context through structured learning and dependable external resources."],
            ["Research", "Explore systems carefully, document findings clearly, and respect authorization and responsible disclosure."],
            ["Community", "Create space for thoughtful exchange among people learning, building, and improving their security practice."],
          ].map(([title, description]) => (
            <ContentCard key={title}>
              <p className="text-technical-label text-accent">{title}</p>
              <p className="mt-5 text-sm leading-7 text-muted">{description}</p>
            </ContentCard>
          ))}
        </div>
      </section>
    </ResponsiveContainer>
  );
}
