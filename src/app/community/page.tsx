import { ContentCard } from "@/components/ui/content-card";
import { CommunityCta } from "@/components/layout/community-cta";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { socialLinks } from "@/config/social";
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

        <ContentCard className="mt-12 flex flex-col gap-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-technical-label text-accent">Discord</p>
            <h2 className="mt-4 text-2xl font-medium">Join the conversation.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Meet people who share your curiosity, exchange ideas, and keep responsible security research moving forward.</p>
          </div>
          <CommunityCta size="large" />
        </ContentCard>

        <div className="mt-4">
          <SocialLinks links={socialLinks} variant="featured" ariaLabel="All social media channels" />
        </div>
      </section>
    </ResponsiveContainer>
  );
}
