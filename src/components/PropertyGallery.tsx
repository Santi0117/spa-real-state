"use client";

import Image from "next/image";
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 md:aspect-[16/10]">
        <Image
          key={main}
          src={main}
          alt={`${title} — foto ${active + 1}`}
          fill
          priority
          quality={92}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-[4/3] overflow-hidden border-2 transition ${
                index === active ? "border-gold" : "border-transparent opacity-80 hover:opacity-100"
              }`}
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === active}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
