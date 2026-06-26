"use client";

import Image from "next/image";
import { useState } from "react";
import {
  mainFrameClass,
  mainFrameStyle,
  useImageOrientation,
} from "./useImageOrientation";

type PropertyImageProps = {
  src: string;
  alt: string;
  large?: boolean;
};

export default function PropertyImage({ src, alt, large }: PropertyImageProps) {
  const [failed, setFailed] = useState(false);
  const { register, getAspectRatio } = useImageOrientation();

  if (failed) {
    return (
      <div
        className={`${mainFrameClass(large)} flex items-center justify-center`}
        style={mainFrameStyle(16 / 10)}
      >
        <span className="font-display text-2xl text-stone-400">Jopa</span>
      </div>
    );
  }

  return (
    <div
      className={mainFrameClass(large)}
      style={mainFrameStyle(getAspectRatio(src))}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={(e) => {
          const img = e.currentTarget;
          register(src, img.naturalWidth, img.naturalHeight);
        }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
