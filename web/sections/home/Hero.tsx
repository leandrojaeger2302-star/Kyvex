"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Button } from "@/components/Button";
import { heroPoster, heroVideo, siteConfig } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/75 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40" />

      <div className="container-shell relative z-10 pt-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-gold"
        >
          <span className="h-px w-8 bg-gold" />
          Herren-Barbershop &middot; Bregenz am Bodensee
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-balance text-white sm:text-6xl md:text-7xl"
        >
          Der Schnitt,
          <br />
          <span className="gold-gradient-text">der Charakter zeigt.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80"
        >
          {siteConfig.tagline} Klassisches Handwerk, moderner Stil und ein
          Ambiente, das seinesgleichen sucht.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/kontakt" size="lg">
            Jetzt Termin buchen
          </Button>
          <Button href={siteConfig.instagram} variant="outline" size="lg" external icon={<InstagramIcon className="h-4 w-4" />}>
            Instagram
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/15 pt-8 text-sm text-cream/70"
        >
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
            <span className="ml-2 font-semibold text-cream">1.497+</span>
            <span>Follower auf Instagram</span>
          </div>
          <div>
            <span className="font-semibold text-cream">Mo–Fr</span> 10:00–19:00
          </div>
          <div>
            <span className="font-semibold text-cream">Sa</span> 9:30–18:00
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#leistungen-preview"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 text-gold"
        aria-label="Nach unten scrollen"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
