import Image from "next/image";
import Link from "next/link";

type BrandLockupProps = {
  className?: string;
};

export function BrandLockup({ className = "" }: BrandLockupProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-2.5 text-lg font-bold tracking-[0.14em] ${className}`}
      aria-label="SYNQONIC home"
    >
      <Image
        src="/brand/synqonic-logo.png"
        alt=""
        width={56}
        height={56}
        sizes="48px"
        className="size-12 object-contain"
      />
      <span>SYNQONIC</span>
    </Link>
  );
}
