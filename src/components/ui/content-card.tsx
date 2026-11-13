import type { HTMLAttributes, ReactNode } from "react";

type ContentCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function ContentCard({ className = "", children, ...props }: ContentCardProps) {
  return (
    <article
      className={`rounded-[var(--radius-card)] border border-border bg-surface-raised p-6 sm:p-8 ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
