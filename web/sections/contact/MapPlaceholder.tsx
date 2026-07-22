import { MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

// Platzhalter statt echtem Google-Maps-Embed, da dafür ein API-Key und die
// exakte Straßenadresse nötig sind. Der Button verlinkt bereits jetzt auf
// eine echte Maps-Suche für den Standort.
export function MapPlaceholder() {
  return (
    <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-8 text-center sm:aspect-video">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,75,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,75,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold">
        <MapPin className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <div className="relative">
        <p className="font-display text-lg text-white">
          {siteConfig.address.line1}
        </p>
        <p className="text-sm text-muted">{siteConfig.address.line2}</p>
      </div>
      <a
        href={siteConfig.address.mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold"
      >
        <Navigation className="h-4 w-4" />
        In Google Maps öffnen
      </a>
    </div>
  );
}
