"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";
import type { GalleryImage } from "@/lib/site-data";

export function MasonryGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {images.map((image, i) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            className="group relative block w-full overflow-hidden rounded-xl border border-line"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold">
                <Expand className="h-4 w-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </>
  );
}
