"use client";

import Image from "next/image";
import { useState } from "react";
import {
  mainFrameClass,
  mainFrameStyle,
  thumbFrameClass,
  useImageOrientation,
} from "./useImageOrientation";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const { register, getOrientation, getAspectRatio } = useImageOrientation();
  const main = images[active] ?? images[0];

  return (
    <div className="min-w-0 max-w-full space-y-3">
      <div
        className={mainFrameClass(true)}
        style={mainFrameStyle(getAspectRatio(main))}
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
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {images.length > 1 && (
        <div className="hide-scrollbar -mx-1 flex w-full min-w-0 max-w-full items-end gap-2 overflow-x-auto px-1 pb-1">
          {images.map((src, index) => {
            const orientation = getOrientation(src);
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                className={`relative shrink-0 overflow-hidden rounded-sm bg-stone-100 transition ${thumbFrameClass(orientation)} ${
                  index === active
                    ? "ring-2 ring-gold"
                    : "opacity-75 hover:opacity-100"
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
                  sizes="100px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
