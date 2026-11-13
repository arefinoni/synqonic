import type { HTMLAttributes } from "react";

type ResponsiveContainerProps = HTMLAttributes<HTMLDivElement>;

export function ResponsiveContainer({ className = "", ...props }: ResponsiveContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-width)] px-[var(--page-gutter)] ${className}`}
      {...props}
    />
  );
}
