import { SectionHeading } from "@/components/ui/section-heading";
import { ResponsiveContainer } from "@/components/ui/responsive-container";

type RoutePlaceholderProps = {
  title: string;
};

export function RoutePlaceholder({ title }: RoutePlaceholderProps) {
  return (
    <ResponsiveContainer>
      <section className="min-h-[55vh] py-20 sm:py-28" aria-labelledby="page-title">
        <SectionHeading title={title} headingId="page-title" />
      </section>
    </ResponsiveContainer>
  );
}
