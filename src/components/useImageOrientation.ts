"use client";

import { useCallback, useState } from "react";

export type ImageOrientation = "portrait" | "landscape";

function guessOrientation(src: string): ImageOrientation {
  if (/\/(bathroom|garden|gallery)\./i.test(src)) return "portrait";
  if (/\/bedroom\./i.test(src) && !/attic-bedroom/i.test(src)) return "portrait";
  return "landscape";
}

export function useImageOrientation() {
  const [orientations, setOrientations] = useState<Record<string, ImageOrientation>>({});

  const register = useCallback((src: string, width: number, height: number) => {
    const orientation: ImageOrientation = height > width ? "portrait" : "landscape";
    setOrientations((prev) => (prev[src] === orientation ? prev : { ...prev, [src]: orientation }));
  }, []);

  const getOrientation = useCallback(
    (src: string): ImageOrientation => orientations[src] ?? guessOrientation(src),
    [orientations]
  );

  return { register, getOrientation };
}

export function thumbFrameClass(orientation: ImageOrientation) {
  return orientation === "portrait"
    ? "h-[72px] w-[48px] sm:h-[88px] sm:w-[58px]"
    : "h-[64px] w-[88px] sm:h-[72px] sm:w-[104px]";
}

export function mainFrameClass(orientation: ImageOrientation, large?: boolean) {
  if (orientation === "portrait") {
    return large
      ? "mx-auto aspect-[3/4] w-full max-w-full sm:max-w-md"
      : "mx-auto aspect-[3/4] w-full max-w-full sm:max-w-xs";
  }
  return large ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2/1]" : "aspect-[4/3]";
}
