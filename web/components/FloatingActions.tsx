"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="top"
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.85 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-surface/90 text-cream shadow-lg backdrop-blur transition-colors hover:border-gold hover:text-gold"
            aria-label="Nach oben scrollen"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.75} />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)]"
        aria-label="Auf WhatsApp schreiben"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={1.75} fill="white" />
      </motion.a>
    </div>
  );
}
