import { servicesMarqueeLines } from "@/lib/site";

export default function ServicesMarquee() {
  const items = [...servicesMarqueeLines, ...servicesMarqueeLines];

  return (
    <div
      className="services-marquee overflow-hidden border-y border-[#a6845d]/50 bg-gold"
      aria-label="Servicios de Jopa Real Estate"
    >
      <div className="services-marquee-track flex flex-nowrap">
        {items.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="flex shrink-0 flex-nowrap items-center gap-8 px-8 py-3.5 md:gap-10 md:px-12 md:py-4"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:text-xs">
              {text}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
