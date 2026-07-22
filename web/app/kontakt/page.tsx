import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/sections/contact/ContactInfo";
import { MapPlaceholder } from "@/sections/contact/MapPlaceholder";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktiere Mastercut Barbershop in Bregenz — Telefon, Öffnungszeiten, Standort und Terminanfrage.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Lass uns deinen Termin planen"
        description="Telefon, WhatsApp oder Formular — such dir aus, was für dich am schnellsten geht."
      />

      <section className="section-shell bg-ink">
        <div className="container-shell grid gap-16 lg:grid-cols-2">
          <ContactInfo />

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <h3 className="font-display text-xl text-white">
                Terminanfrage
              </h3>
              <p className="mt-2 text-sm text-muted">
                Fülle das Formular aus — wir öffnen WhatsApp mit deiner
                fertigen Nachricht.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container-shell mt-16">
          <Reveal>
            <MapPlaceholder />
          </Reveal>
        </div>
      </section>
    </>
  );
}
