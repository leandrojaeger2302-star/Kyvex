import { Clock, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Reveal } from "@/components/Reveal";
import { hours, siteConfig } from "@/lib/site-data";

export function ContactInfo() {
  return (
    <Reveal className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          Kontakt
        </p>
        <h2 className="mt-4 font-display text-3xl text-balance text-white sm:text-4xl">
          Wir freuen uns auf dich
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Ruf uns an, schreib uns auf Instagram oder nutze das Formular —
          wir melden uns so schnell wie möglich zurück.
        </p>
      </div>

      <div className="space-y-5">
        <InfoRow icon={Phone} label="Telefon">
          <a href={siteConfig.phoneHref} className="hover:text-gold">
            {siteConfig.phone}
          </a>
        </InfoRow>
        <InfoRow icon={InstagramIcon} label="Instagram">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
          >
            {siteConfig.instagramHandle}
          </a>
        </InfoRow>
        <InfoRow icon={MapPin} label="Standort">
          <span>
            {siteConfig.address.line1}, {siteConfig.address.line2}
            <br />
            <span className="text-cream/50">
              {siteConfig.secondLocation.name} · {siteConfig.secondLocation.line}
            </span>
          </span>
        </InfoRow>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold">
          <Clock className="h-4 w-4" /> Öffnungszeiten
        </div>
        <ul className="space-y-2 text-sm">
          {hours.map((h) => (
            <li key={h.day} className="flex justify-between text-cream/80">
              <span>{h.day}</span>
              <span className="text-cream">{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {label}
        </p>
        <p className="mt-1 text-cream/90">{children}</p>
      </div>
    </div>
  );
}
