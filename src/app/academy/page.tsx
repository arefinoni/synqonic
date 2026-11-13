import { ContentCard } from "@/components/ui/content-card";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy",
  description: "A free cybersecurity learning hub with practical paths, core topics, and reliable external references.",
  openGraph: {
    title: "Academy - SYNQONIC",
    description: "A free cybersecurity learning hub with practical paths, core topics, and reliable external references.",
  },
};

const learningPaths = [
  {
    title: "Security foundations",
    level: "Start here",
    description: "Build a working vocabulary for confidentiality, integrity, availability, threat modeling, and risk.",
    topics: ["Security principles", "Threat modeling", "Risk and controls"],
  },
  {
    title: "Web application security",
    level: "Build practical context",
    description: "Study how web applications fail and how developers and testers can reduce those risks responsibly.",
    topics: ["HTTP and browsers", "OWASP Top 10", "Secure design"],
  },
  {
    title: "Systems and networks",
    level: "Develop core skills",
    description: "Understand the operating systems, networks, and protocols that security work depends on.",
    topics: ["Linux basics", "Networking", "Identity and access"],
  },
  {
    title: "Security research practice",
    level: "Apply careful methods",
    description: "Learn a repeatable approach to scoped testing, evidence, documentation, and responsible disclosure.",
    topics: ["Reconnaissance", "Evidence and notes", "Disclosure"],
  },
];

const learningResources = [
  { name: "PortSwigger Web Security Academy", href: "https://portswigger.net/web-security", description: "Free interactive lessons and labs for web security." },
  { name: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/", description: "A current awareness document for common web application risks." },
  { name: "MITRE ATT&CK", href: "https://attack.mitre.org/", description: "A knowledge base for adversary tactics and techniques." },
  { name: "Linux Journey", href: "https://linuxjourney.com/", description: "A practical, self-paced introduction to Linux concepts." },
];

export default function AcademyPage() {
  return (
    <ResponsiveContainer>
      <section className="page-section" aria-labelledby="academy-title">
        <SectionHeading
          title="Build your security skills."
          eyebrow="Academy · Free learning hub"
          description="A clear starting point for curious learners. Choose a path, build context through reliable references, and practice only where you have permission."
          headingId="academy-title"
        />
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
          {learningPaths.map((path, index) => (
            <ContentCard key={path.title} className="flex h-full flex-col">
              <p className="text-technical-label text-accent">{String(index + 1).padStart(2, "0")} / {path.level}</p>
              <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em]">{path.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{path.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs text-subtle" aria-label={`${path.title} topics`}>
                {path.topics.map((topic) => <li key={topic} className="rounded border border-border px-2.5 py-1.5">{topic}</li>)}
              </ul>
            </ContentCard>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-10 sm:mt-20">
          <SectionHeading
            title="References worth keeping close."
            eyebrow="Learning resources"
            description="Use these established resources to go deeper. They are references and practice environments, not SYNQONIC-issued courses or certifications."
            level={2}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {learningResources.map((resource) => (
              <ContentCard key={resource.name}>
                <h3 className="text-lg font-medium"><a href={resource.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">{resource.name}<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a></h3>
                <p className="mt-2 text-sm leading-7 text-muted">{resource.description}</p>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>
    </ResponsiveContainer>
  );
}
