import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

type BrandLogoProps = {
  href?: string;
  variant?: "header" | "footer";
  className?: string;
};

export default function BrandLogo({
  href = "/",
  variant = "header",
  className = "",
}: BrandLogoProps) {
  const isHeader = variant === "header";

  const content = (
    <span
      className={`group inline-flex shrink-0 items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <Image
        src="/logo-jopa-icon.png"
        alt=""
        width={513}
        height={355}
        className={`w-auto object-contain ${isHeader ? "h-9 sm:h-10 lg:h-11" : "h-12"}`}
        priority={isHeader}
      />
      <span className="flex min-w-[5.5rem] flex-col items-center text-center leading-none">
        <span
          className={`font-display w-full font-semibold tracking-wide ${
            isHeader
              ? "text-xl text-white sm:text-2xl lg:text-[1.65rem]"
              : "text-2xl text-white"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`mt-0.5 w-full font-semibold uppercase tracking-[0.22em] ${
            isHeader
              ? "text-[8px] text-white/90 sm:text-[9px]"
              : "text-[10px] text-white/90"
          }`}
        >
          Real Estate
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex transition opacity-95 hover:opacity-100">
        {content}
      </Link>
    );
  }

  return content;
}
