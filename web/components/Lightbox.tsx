"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { GalleryImage } from "@/lib/site-data";

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;

  const goTo = useCallback(
    (next: number) => {
      const total = images.length;
      onNavigate(((next % total) + total) % total);
    },
    [images.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null) goTo(index + 1);
      if (e.key === "ArrowLeft" && index !== null) goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, index, goTo, onClose]);

  return (
    <AnimatePresence>
      {isOpen && index !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index - 1);
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold sm:left-6"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto max-h-[85vh] w-fit">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                width={images[index].width}
                height={images[index].height}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-cream/70">
              {images[index].alt}
            </p>
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + 1);
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold sm:right-6"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
