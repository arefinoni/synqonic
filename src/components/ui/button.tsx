import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "quiet";
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = ButtonBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };
type NativeButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants = {
  primary: "border-accent bg-accent text-accent-foreground hover:bg-transparent hover:text-accent",
  secondary: "border-border bg-surface text-foreground hover:border-accent",
  quiet: "border-transparent text-foreground hover:text-accent",
};

export function Button(props: ButtonProps) {
  const { href, variant = "primary", className = "", children, ...attributes } = props;
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-2.5 text-sm font-semibold transition-colors button-glow ${variants[variant]} ${className}`;

  if (typeof href === "string") {
    return <Link className={classes} href={href} {...(attributes as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}>{children}</Link>;
  }

  return <button className={classes} {...(attributes as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
