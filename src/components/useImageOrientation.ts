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
    ? "h-[88px] w-[58px] sm:h-[100px] sm:w-[66px]"
    : "h-[72px] w-[104px] sm:h-[88px] sm:w-[120px]";
}

export function mainFrameClass(orientation: ImageOrientation, large?: boolean) {
  if (orientation === "portrait") {
    return large
      ? "mx-auto aspect-[3/4] w-full max-w-sm sm:max-w-md"
      : "mx-auto aspect-[3/4] w-full max-w-xs";
  }
  return large ? "aspect-[16/10] lg:aspect-[2/1]" : "aspect-[4/3]";
}
