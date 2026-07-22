"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { services, type ServiceCategory } from "@/lib/site-data";

const categories: ServiceCategory[] = ["Haarschnitt", "Bart", "Rasur", "Styling"];

export function PriceList() {
  const [active, setActive] = useState<ServiceCategory | "Alle">("Alle");

  const filtered = useMemo(
    () => (active === "Alle" ? services : services.filter((s) => s.category === active)),
    [active]
  );

  return (
    <div>
      <Reveal className="flex flex-wrap justify-center gap-2.5">
        {(["Alle", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-colors",
              active === cat
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/15 text-cream/70 hover:border-white/35 hover:text-cream"
            )}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2">
        {filtered.map((service, i) => (
          <motion.div
            layout
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
            className={cn(
              "flex items-start gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-gold/40",
              service.featured && "border-gold/40 bg-gradient-to-br from-gold/[0.06] to-transparent"
            )}
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
              <ServiceIcon name={service.icon} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg text-white">{service.title}</h3>
                <span className="font-display text-xl text-gold">{service.price}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-cream/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {service.duration}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 uppercase tracking-widest">
                  {service.category}
                </span>
                {service.featured ? (
                  <span className="flex items-center gap-1 text-gold">
                    <Check className="h-3.5 w-3.5" /> Beliebt
                  </span>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-8 text-center text-xs text-muted">
        Alle Preise verstehen sich als Richtwerte und können je nach Haarlänge
        oder Aufwand variieren. Endgültiger Preis wird vor der Behandlung
        bestätigt.
      </p>
    </div>
  );
}
