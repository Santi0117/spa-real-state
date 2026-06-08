import Link from "next/link";

const backLinkClass =
  "inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-warm transition hover:text-gold sm:text-sm";

type BackLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link href={href} className={backLinkClass}>
      {children}
    </Link>
  );
}

export { backLinkClass };
