import { ContentCard } from "@/components/ui/content-card";
import { CommunityCta } from "@/components/layout/community-cta";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "A responsible space for cybersecurity learning, discussion, and careful research practice.",
  openGraph: {
    title: "Community - SYNQONIC",
    description: "A responsible space for cybersecurity learning, discussion, and careful research practice.",
  },
};

export default function CommunityPage() {
  return (
    <ResponsiveContainer>
      <section className="page-section" aria-labelledby="community-title">
        <SectionHeading
          title="Learn better, together."
          eyebrow="Community · Responsible security"
          description="SYNQONIC is a place for curious people to exchange ideas, ask better questions, and keep security learning grounded in responsible practice."
          headingId="community-title"
        />
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
          <ContentCard>
            <p className="text-technical-label text-accent">What to expect</p>
            <h2 className="mt-5 text-2xl font-medium">Curiosity with context.</h2>
            <p className="mt-3 text-sm leading-7 text-muted">Share learning notes, compare approaches, and discuss security topics with respect for scope, consent, and the people affected by security work.</p>
          </ContentCard>
          <ContentCard>
            <p className="text-technical-label text-accent">How to participate</p>
            <h2 className="mt-5 text-2xl font-medium">Learn, contribute, verify.</h2>
            <p className="mt-3 text-sm leading-7 text-muted">Bring thoughtful questions, cite useful sources, and keep experiments inside systems you own or are explicitly authorized to test.</p>
          </ContentCard>
        </div>
        <ContentCard className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-technical-label text-accent">Discord</p>
            <h2 className="mt-4 text-2xl font-medium">Join the conversation.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Meet people who share your curiosity, exchange ideas, and keep responsible security research moving forward.</p>
          </div>
          <CommunityCta />
        </ContentCard>
      </section>
    </ResponsiveContainer>
  );
}
