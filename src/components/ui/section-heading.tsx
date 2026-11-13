type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  level?: 1 | 2 | 3;
  headingId?: string;
};

const headingStyles = {
  1: "text-title",
  2: "text-3xl sm:text-5xl",
  3: "text-2xl sm:text-3xl",
};

export function SectionHeading({ title, eyebrow, description, level = 1, headingId }: SectionHeadingProps) {
  const Heading = `h${level}` as const;

  return (
    <header className="max-w-3xl">
      {eyebrow ? <p className="text-technical-label mb-4 text-accent">{eyebrow}</p> : null}
      <Heading id={headingId} className={`${headingStyles[level]} font-medium leading-tight tracking-[-0.04em]`}>
        {title}
      </Heading>
      {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p> : null}
    </header>
  );
}
