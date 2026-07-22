import { Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site-data";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden section-shell bg-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(201,162,75,0.16), transparent 70%)",
        }}
      />
      <div className="container-shell relative text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Bereit für deinen neuen Look?
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl text-balance text-white sm:text-4xl md:text-5xl">
            Sichere dir jetzt deinen Termin bei Mastercut
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">
            Ruf uns an oder schreib uns auf Instagram — wir freuen uns
            darauf, dich in Bregenz willkommen zu heißen.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={siteConfig.phoneHref} size="lg" external icon={<Phone className="h-4 w-4" />}>
              {siteConfig.phone}
            </Button>
            <Button
              href={siteConfig.instagram}
              variant="outline"
              size="lg"
              external
              icon={<InstagramIcon className="h-4 w-4" />}
            >
              {siteConfig.instagramHandle}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
