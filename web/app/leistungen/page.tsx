import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PriceList } from "@/sections/services/PriceList";
import { ContactCta } from "@/sections/home/ContactCta";

export const metadata: Metadata = {
  title: "Leistungen & Preise",
  description:
    "Haarschnitt, Bart, Rasur und Styling bei Mastercut Barbershop in Bregenz — alle Leistungen und Preise auf einen Blick.",
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen & Preise"
        title="Handwerk mit Anspruch"
        description="Von der klassischen Rasur bis zum Signature-Cut — jede Leistung ist auf Präzision und Stil ausgelegt."
      />
      <section className="section-shell bg-ink">
        <div className="container-shell">
          <PriceList />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
