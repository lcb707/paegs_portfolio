"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/src/lib/basePath";

type GalleryImage = {
  src: string;
  alt: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  const normalized = useMemo(() => images.filter((image) => image.src.trim().length > 0), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (normalized.length === 0) return null;

  const active = normalized[Math.min(activeIndex, normalized.length - 1)];

  return (
    <div className="my-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="relative aspect-[16/10] max-h-[420px] w-full">
          <Image
            src={withBasePath(active.src)}
            alt={active.alt || "project image"}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 768px"
          />
        </div>
      </div>

      {normalized.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {normalized.map((image, index) => (
            <button
              type="button"
              key={`${image.src}-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`relative shrink-0 overflow-hidden rounded-lg border transition ${
                index === activeIndex ? "border-emerald-500" : "border-zinc-200 hover:border-zinc-300"
              }`}
              aria-label={`Select image ${index + 1}`}
            >
              <Image
                src={withBasePath(image.src)}
                alt={image.alt || `thumbnail ${index + 1}`}
                width={110}
                height={76}
                className="h-16 w-24 object-cover"
              />
              {index === activeIndex && <span className="pointer-events-none absolute inset-0 ring-2 ring-emerald-200" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
