"use client";

import Image from "next/image";
import { useState } from "react";

const THUMBS = 4;

type PropertyCardGalleryProps = {
  images: string[];
  title: string;
  badge?: React.ReactNode;
};

export default function PropertyCardGallery({ images, title, badge }: PropertyCardGalleryProps) {
  const [active, setActive] = useState(0);
  const thumbs = images.slice(0, THUMBS);
  const extra = images.length - THUMBS;

  return (
    <div className="bg-white">
      <div className="relative aspect-video w-full overflow-hidden bg-sand">
        <Image
          key={images[active]}
          src={images[active]}
          alt={active === 0 ? title : `${title} — foto ${active + 1}`}
          fill
          quality={85}
          className="card-photo-in object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {badge}
          {images.length > 1 && (
            <span className="rounded-full bg-navy/75 px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-white backdrop-blur-sm">
              {active + 1} / {images.length}
            </span>
          )}
        </div>
      </div>

      {thumbs.length > 1 && (
        <div className="grid grid-cols-4 gap-1.5 px-[18px] pt-3 md:px-[22px]">
          {thumbs.map((src, index) => {
            const isMore = index === THUMBS - 1 && extra > 0;
            return (
              <button
                key={src}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={(e) => {
                  if (isMore) return;
                  e.preventDefault();
                  e.stopPropagation();
                  setActive(index);
                }}
                aria-label={isMore ? `+${extra}` : `Ver foto ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-sand outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-gold ${
                  index === active ? "ring-2 ring-gold ring-offset-1 ring-offset-white" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill quality={60} className="object-cover" sizes="110px" />
                {isMore && (
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/60 text-sm font-semibold text-white">
                    +{extra}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
