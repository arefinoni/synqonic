import { CommunityCta } from "@/components/layout/community-cta";
import { ContentCard } from "@/components/ui/content-card";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLatestArticles, getLatestVideos } from "@/lib/content-feeds";
import { YouTubeVideoCard } from "@/components/sections/youtube-video-card";
import { MediumArticleImage } from "@/components/sections/medium-article-image";

const learningAreas = [
  { title: "Cybersecurity fundamentals", level: "Start here", focus: "Build a clear foundation in security concepts, threat models, and responsible practice." },
  { title: "Ethical hacking", level: "Guided practice", focus: "Learn how authorized testing finds weaknesses and helps teams reduce risk." },
  { title: "Web application security", level: "Hands-on focus", focus: "Explore common web vulnerabilities, secure design, and practical testing methods." },
  { title: "Networks & Linux", level: "Core skills", focus: "Get comfortable with the systems, protocols, and tools used in security work." },
  { title: "Bug bounty & research", level: "Research practice", focus: "Develop a careful workflow for scoped testing, evidence, and responsible disclosure." },
];

const resources = [
  { name: "OWASP Top 10", kind: "Awareness guide", description: "A regularly updated overview of critical web application security risks.", href: "https://owasp.org/www-project-top-ten/" },
  { name: "OWASP Cheat Sheet Series", kind: "Practical guidance", description: "Concise security guidance for developers and application defenders.", href: "https://cheatsheetseries.owasp.org/" },
  { name: "ZAP", kind: "Open-source tool", description: "A free, open-source web application security scanner from the ZAP project.", href: "https://www.zaproxy.org/" },
  { name: "Web Security Academy", kind: "Free training", description: "Free web security lessons and interactive labs from PortSwigger.", href: "https://portswigger.net/web-security" },
  { name: "CVE Program", kind: "Vulnerability reference", description: "The official program for identifying and cataloging publicly disclosed vulnerabilities.", href: "https://www.cve.org/" },
  { name: "NIST CSRC", kind: "Standards & research", description: "Cybersecurity and privacy standards, guidance, and research from NIST.", href: "https://csrc.nist.gov/" },
];

function dateLabel(date?: string) {
  if (!date) return undefined;
  return new Date(date).toLocaleDateString("en", { dateStyle: "medium" });
}

export async function HomepageSections() {
  const [videos, articles] = await Promise.all([getLatestVideos(), getLatestArticles()]);

  return (
    <>
      <section className="home-content-section" aria-labelledby="latest-heading">
        <ResponsiveContainer>
          <SectionHeading headingId="latest-heading" eyebrow="Latest from Synqonic" title="Fresh ideas. Practical security." description="Recent videos and writing from the Synqonic channels." level={2} />
          <div className="latest-columns">
            <section className="latest-column" aria-labelledby="latest-videos-heading">
              <div className="content-subheading">
                <h3 id="latest-videos-heading">On YouTube</h3>
                <a href="https://www.youtube.com/@synqonic" target="_blank" rel="noopener noreferrer">Visit channel <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
              {videos.items.length ? (
                <div className="feed-grid">{videos.items.map((video) => <YouTubeVideoCard key={video.id} video={video} />)}</div>
              ) : (
                <p className="feed-empty">{videos.available ? "No recent uploads are listed in the public channel feed right now." : "Recent uploads could not be loaded right now."} Browse the channel for the latest videos.</p>
              )}
            </section>
            <section className="latest-column" aria-labelledby="latest-writing-heading">
              <div className="content-subheading">
                <h3 id="latest-writing-heading">On Medium</h3>
                <a href="https://medium.com/@synqonic" target="_blank" rel="noopener noreferrer">Visit publication <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
              {articles.items.length ? (
                <div className="article-list">
                  {articles.items.map((article) => (
                    <article className="article-row" key={article.url}>
                      {article.image ? <MediumArticleImage src={article.image} /> : null}
                      <div className="article-row-copy">
                        <h4><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}<span className="sr-only"> (opens in a new tab)</span></a></h4>
                        <p>{article.description}</p>
                        <div className="article-meta">{article.author ? <span>{article.author}</span> : null}{article.author && article.publishedAt ? <span aria-hidden="true">·</span> : null}{article.publishedAt ? <time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time> : null}</div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="feed-empty">{articles.available ? "No recent articles are listed in the public publication feed right now." : "Recent articles could not be loaded right now."} Browse Synqonic on Medium.</p>
              )}
            </section>
          </div>
        </ResponsiveContainer>
      </section>

      <section className="home-content-section home-content-section-alt" aria-labelledby="academy-heading">
        <ResponsiveContainer>
          <SectionHeading headingId="academy-heading" eyebrow="Academy" title="Build your security skills." description="A free learning space for curious minds. Explore core topics, then keep learning through practice and research." level={2} />
          <div className="learning-grid">
            {learningAreas.map((area, index) => (
              <ContentCard key={area.title} className="learning-card">
                <p className="text-technical-label text-accent">0{index + 1} / {area.level}</p>
                <h3>{area.title}</h3>
                <p>{area.focus}</p>
              </ContentCard>
            ))}
          </div>
          <a className="section-text-link" href="/academy">Explore the Academy <span aria-hidden="true">→</span></a>
        </ResponsiveContainer>
      </section>

      <section className="home-content-section" aria-labelledby="resources-heading">
        <ResponsiveContainer>
          <SectionHeading headingId="resources-heading" eyebrow="Resources" title="Tools and references worth keeping close." description="A short list of established resources for learning, testing, and staying informed." level={2} />
          <div className="resource-grid">
            {resources.map((resource) => (
              <ContentCard key={resource.name} className="resource-card">
                <p className="text-technical-label text-accent">{resource.kind}</p>
                <h3><a href={resource.href} target="_blank" rel="noopener noreferrer">{resource.name}<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a></h3>
                <p>{resource.description}</p>
              </ContentCard>
            ))}
          </div>
          <a className="section-text-link" href="/resources">Browse resources <span aria-hidden="true">→</span></a>
        </ResponsiveContainer>
      </section>

      <section className="home-content-section home-content-section-alt" aria-labelledby="community-heading">
        <ResponsiveContainer>
          <ContentCard className="community-card">
            <div>
              <SectionHeading headingId="community-heading" eyebrow="Community" title="Learn better, together." description="Meet people who share your curiosity, exchange ideas, and keep responsible security research moving forward." level={2} />
              <a className="section-text-link" href="/community">About the community <span aria-hidden="true">→</span></a>
            </div>
            <div className="community-action">
              <p>Join the conversation</p>
              <CommunityCta />
            </div>
          </ContentCard>
        </ResponsiveContainer>
      </section>
    </>
  );
}
