"use client";

import Image from "next/image";
import { useState } from "react";
import {
  mainFrameClass,
  thumbFrameClass,
  useImageOrientation,
} from "./useImageOrientation";

type PropertyCardGalleryProps = {
  images: string[];
  title: string;
  large?: boolean;
  overlay?: React.ReactNode;
};

export default function PropertyCardGallery({
  images,
  title,
  large,
  overlay,
}: PropertyCardGalleryProps) {
  const [active, setActive] = useState(0);
  const { register, getOrientation } = useImageOrientation();
  const main = images[active] ?? images[0];
  const mainOrientation = getOrientation(main);

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden bg-stone-200">
      <div className={`relative w-full overflow-hidden ${mainFrameClass(mainOrientation, large)}`}>
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
          className="object-cover object-bottom transition duration-700 group-hover:scale-[1.03] max-lg:group-hover:scale-100"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        {overlay}
      </div>

      {images.length > 1 && (
        <div className="hide-scrollbar flex w-full min-w-0 max-w-full items-end gap-1 overflow-x-auto border-t border-charcoal/8 bg-stone-100 p-1">
          {images.map((src, index) => {
            const orientation = getOrientation(src);
            return (
              <button
                key={src}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActive(index);
                }}
                className={`relative shrink-0 overflow-hidden bg-stone-100 transition ${thumbFrameClass(orientation)} ${
                  index === active
                    ? "ring-2 ring-inset ring-gold"
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
                  className="object-contain object-bottom"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
