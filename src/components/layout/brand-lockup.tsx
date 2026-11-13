import Image from "next/image";
import Link from "next/link";
import { ScrambleText } from "@/components/ui/scramble-text";

type BrandLockupProps = {
  className?: string;
  scramble?: boolean;
};

export function BrandLockup({ className = "", scramble = false }: BrandLockupProps) {
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
      {scramble ? <ScrambleText text="SYNQONIC" trigger="appear-and-hover" /> : <span>SYNQONIC</span>}
    </Link>
  );
}
