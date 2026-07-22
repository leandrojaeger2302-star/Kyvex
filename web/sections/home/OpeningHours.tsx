import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { hours, siteConfig } from "@/lib/site-data";

export function OpeningHours() {
  return (
    <section className="section-shell bg-ink">
      <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <Image
            src="/images/team-opening.jpg"
            alt="Mastercut &amp; Masterfade Team"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </Reveal>

        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Öffnungszeiten
          </p>
          <h2 className="mt-4 font-display text-3xl text-balance text-white sm:text-4xl">
            Wann du uns findest
          </h2>

          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
            {hours.map((h) => (
              <div key={h.day} className="flex items-center justify-between px-6 py-4">
                <span className="flex items-center gap-3 text-sm text-cream/80">
                  <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  {h.day}
                </span>
                <span className="font-display text-base text-gold-light">
                  {h.time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={1.5} />
            <span>
              {siteConfig.address.line1}, {siteConfig.address.line2} — zweiter
              Standort {siteConfig.secondLocation.name} in{" "}
              {siteConfig.secondLocation.line}.
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/kontakt" icon={<MapPin className="h-4 w-4" />}>
              Anfahrt &amp; Kontakt
            </Button>
            <Button href={siteConfig.phoneHref} variant="outline" external icon={<Phone className="h-4 w-4" />}>
              {siteConfig.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
