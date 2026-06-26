"use client";

import { useCallback, useState } from "react";

export type ImageOrientation = "portrait" | "landscape";

function guessOrientation(src: string): ImageOrientation {
  if (/\/(bathroom|garden|gallery|stairs|kitchen)\./i.test(src)) return "portrait";
  if (/\/bedroom/i.test(src) && !/attic-bedroom/i.test(src)) return "portrait";
  return "landscape";
}

function defaultAspectRatio(orientation: ImageOrientation) {
  return orientation === "portrait" ? 3 / 4 : 16 / 10;
}

export function useImageOrientation() {
  const [dimensions, setDimensions] = useState<
    Record<string, { width: number; height: number }>
  >({});

  const register = useCallback((src: string, width: number, height: number) => {
    setDimensions((prev) => {
      const current = prev[src];
      if (current?.width === width && current?.height === height) return prev;
      return { ...prev, [src]: { width, height } };
    });
  }, []);

  const getOrientation = useCallback(
    (src: string): ImageOrientation => {
      const size = dimensions[src];
      if (size) return size.height > size.width ? "portrait" : "landscape";
      return guessOrientation(src);
    },
    [dimensions]
  );

  const getAspectRatio = useCallback(
    (src: string): number => {
      const size = dimensions[src];
      if (size && size.width > 0) return size.width / size.height;
      return defaultAspectRatio(guessOrientation(src));
    },
    [dimensions]
  );

  return { register, getOrientation, getAspectRatio };
}

export function thumbFrameClass(orientation: ImageOrientation) {
  return orientation === "portrait"
    ? "h-[68px] w-[46px] sm:h-[80px] sm:w-[54px]"
    : "h-[60px] w-[84px] sm:h-[72px] sm:w-[100px]";
}

export function mainFrameClass(large?: boolean) {
  return `relative mx-auto w-full max-w-full overflow-hidden bg-stone-100 ${
    large ? "max-h-[min(70vh,680px)]" : "max-h-[min(62vh,540px)]"
  }`;
}

export function mainFrameStyle(aspectRatio: number) {
  return { aspectRatio: `${aspectRatio}` } as const;
}
