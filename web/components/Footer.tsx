import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LogoMark, Wordmark } from "@/components/Logo";
import { hours, navLinks, siteConfig } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <Wordmark />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.tagline}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-colors hover:border-gold hover:text-gold"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.phoneHref}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-colors hover:border-gold hover:text-gold"
              aria-label="Anrufen"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Navigation
          </h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/75 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Kontakt &amp; Zeiten
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/75">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={1.5} />
              <span>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0 text-gold" strokeWidth={1.5} />
              <a href={siteConfig.phoneHref} className="hover:text-gold">
                {siteConfig.phone}
              </a>
            </li>
          </ul>
          <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm text-cream/60">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-cream/80">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
          <p>
            {siteConfig.secondLocation.name} · {siteConfig.secondLocation.line}
          </p>
        </div>
      </div>
    </footer>
  );
}
