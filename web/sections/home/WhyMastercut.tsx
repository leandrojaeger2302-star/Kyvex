import Image from "next/image";
import { Award, Gem, MapPin, Sofa } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { whyMastercut } from "@/lib/site-data";
import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  award: Award,
  gem: Gem,
  sofa: Sofa,
  map: MapPin,
};

export function WhyMastercut() {
  return (
    <section className="section-shell bg-surface">
      <div className="container-shell grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/founder-portrait.jpg"
              alt="Barbier bei Mastercut Barbershop bei der Arbeit"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-gold/30 bg-ink/95 px-7 py-5 shadow-2xl backdrop-blur sm:block">
            <p className="font-display text-3xl text-gold">1.497+</p>
            <p className="text-xs uppercase tracking-widest text-muted">
              Zufriedene Follower
            </p>
          </div>
        </Reveal>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Warum Mastercut
          </p>
          <h2 className="mt-4 font-display text-3xl text-balance text-white sm:text-4xl md:text-5xl">
            Mehr als ein Haarschnitt —
            <br />
            ein Statement.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Bei uns bekommst du einen Look, der zu deiner Persönlichkeit
            passt. Wir kombinieren klassisches Barbier-Handwerk mit modernen
            Trends, in einer Atmosphäre, die genauso viel Wert legt auf
            Stil wie auf Ergebnis.
          </p>

          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyMastercut.map((item) => {
              const Icon = icons[item.icon] ?? Award;
              return (
                <StaggerItem key={item.title}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
