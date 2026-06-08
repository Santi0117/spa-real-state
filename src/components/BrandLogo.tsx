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
        className={`w-auto shrink-0 object-contain ${isHeader ? "h-8 sm:h-9 lg:h-10" : "h-12"}`}
        priority={isHeader}
      />
      <span className="flex flex-col justify-center gap-[0.35rem] leading-none">
        <span
          className={`font-display block whitespace-nowrap font-semibold uppercase tracking-[0.04em] ${
            isHeader ? "text-gold" : "text-white"
          } ${isHeader ? "text-[1.05rem] sm:text-[1.15rem] lg:text-[1.25rem]" : "text-2xl"}`}
        >
          {site.name}
        </span>
        <span
          className={`block whitespace-nowrap font-sans font-semibold uppercase tracking-[0.24em] text-white/90 ${
            isHeader ? "text-[7px] sm:text-[8px]" : "text-[10px]"
          }`}
        >
          {site.subtitle}
        </span>
      </span>
    </span>
  );

  const label = `${site.name} ${site.subtitle}`;

  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        className="inline-flex shrink-0 transition opacity-95 hover:opacity-100"
      >
        {content}
      </Link>
    );
  }

  return content;
}
