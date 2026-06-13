"use client";

import Image from "next/image";
import { useState } from "react";
import {
  mainFrameClass,
  thumbFrameClass,
  useImageOrientation,
} from "./useImageOrientation";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const { register, getOrientation } = useImageOrientation();
  const main = images[active] ?? images[0];
  const mainOrientation = getOrientation(main);

  return (
    <div className="min-w-0 max-w-full space-y-3">
      <div
        className={`relative mx-auto w-full overflow-hidden bg-stone-100 ${mainFrameClass(mainOrientation, true)}`}
      >
        <Image
          key={main}
          src={main}
          alt={`${title} — foto ${active + 1}`}
          fill
          priority
          quality={92}
          onLoad={(e) => {
            const img = e.currentTarget;
            register(main, img.naturalWidth, img.naturalHeight);
          }}
          className="object-cover object-bottom"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {images.length > 1 && (
        <div className="hide-scrollbar flex w-full min-w-0 max-w-full items-end gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => {
            const orientation = getOrientation(src);
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                className={`relative shrink-0 overflow-hidden bg-stone-100 transition ${thumbFrameClass(orientation)} ${
                  index === active
                    ? "ring-2 ring-inset ring-gold"
                    : "opacity-80 hover:opacity-100"
                }`}
                aria-label={`Ver foto ${index + 1}`}
                aria-current={index === active}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    register(src, img.naturalWidth, img.naturalHeight);
                  }}
                  className="object-contain"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
