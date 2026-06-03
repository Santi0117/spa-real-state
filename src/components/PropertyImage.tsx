"use client";

import Image from "next/image";
import { useState } from "react";

type PropertyImageProps = {
  src: string;
  alt: string;
};

export default function PropertyImage({ src, alt }: PropertyImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-stone-200">
        <span className="font-display text-2xl text-stone-400">Jopa</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      quality={90}
      className="object-cover transition duration-700 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setFailed(true)}
    />
  );
}
