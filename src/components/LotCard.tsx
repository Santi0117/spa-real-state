import Link from "next/link";
import {
  getLotCoverImage,
  lotStatusLabels,
  type CondominiumLot,
} from "@/lib/condominiums";
import { formatArea, formatPrice } from "@/lib/properties";
import PropertyImage from "./PropertyImage";

type LotCardProps = {
  lot: CondominiumLot;
  condominiumName: string;
  index: number;
  highlighted?: boolean;
  compact?: boolean;
  showFullDescription?: boolean;
};

export default function LotCard({
  lot,
  condominiumName,
  index,
  highlighted,
  compact = true,
  showFullDescription,
}: LotCardProps) {
  const image = getLotCoverImage(lot, index);
  const statusLabel = lotStatusLabels[lot.status];
  const visitHref = `/agendar-visita?propiedad=${encodeURIComponent(
    `Condominio ${condominiumName} — ${lot.label}`
  )}`;

  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <PropertyImage src={image} alt={lot.label} />

        <div className="absolute left-0 top-0 flex gap-px">
          <span className="bg-charcoal/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
            Terreno
          </span>
          <span
            className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white ${
              lot.status === "disponible"
                ? "bg-gold"
                : lot.status === "reservado"
                  ? "bg-amber-600"
                  : "bg-charcoal/50"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3 pt-10">
          <p className="font-display text-lg font-semibold text-white sm:text-xl">
            {formatPrice(lot.price)}
          </p>
        </div>
      </div>

      <div className="border border-t-0 border-charcoal/8 bg-white p-3 sm:p-3.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gold">
          Lote · {condominiumName}
        </p>
        <h3 className="font-display mt-1 text-base font-medium leading-snug text-charcoal group-hover:text-gold sm:text-lg">
          {lot.label}
        </h3>
        <p className="mt-0.5 text-xs text-slate-warm">{formatArea(lot.areaM2)}</p>

        <p className={`leading-relaxed text-slate-warm ${showFullDescription ? "mt-2 text-sm" : "mt-2 line-clamp-3 text-xs"}`}>
          {lot.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-charcoal/8 pt-3 text-[10px] font-medium uppercase tracking-wide text-slate-warm">
          <span>{formatArea(lot.areaM2)}</span>
          <span className="text-charcoal/20">|</span>
          <span>{statusLabel}</span>
        </div>

        {lot.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {lot.features.map((feature) => (
              <span
                key={feature}
                className="border border-charcoal/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-slate-warm"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {lot.status === "disponible" && (
          <span className="mt-3 inline-flex text-[10px] font-semibold uppercase tracking-wide text-gold group-hover:text-[#a6845d]">
            Agendar visita →
          </span>
        )}
      </div>
    </>
  );

  return (
    <article
      id={`lot-${lot.id}`}
      className={`property-card group transition-shadow duration-300 ${
        highlighted ? "ring-2 ring-gold ring-offset-2" : ""
      }`}
    >
      {lot.status === "disponible" ? (
        <Link href={visitHref} className="block">
          {content}
        </Link>
      ) : (
        <div className="block opacity-90">{content}</div>
      )}
    </article>
  );
}
