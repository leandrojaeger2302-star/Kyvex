import type { Metadata } from "next";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { PageHero } from "@/components/PageHero";
import { MasonryGallery } from "@/components/MasonryGallery";
import { Button } from "@/components/Button";
import { ContactCta } from "@/sections/home/ContactCta";
import { galleryImages, siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Impressionen aus dem Mastercut Barbershop in Bregenz und dem Masterfade Salon in Hohenems.",
};

export default function GaleriePage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Handwerk in Bildern"
        description="Ein Blick hinter die Kulissen von Mastercut Barbershop — Salon, Details und Ergebnisse."
      />
      <section className="section-shell bg-ink">
        <div className="container-shell">
          <MasonryGallery images={galleryImages} />
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted">
              Noch mehr Eindrücke und tägliche Updates findest du auf unserem
              Instagram-Profil.
            </p>
            <Button
              href={siteConfig.instagram}
              variant="outline"
              external
              icon={<InstagramIcon className="h-4 w-4" />}
            >
              {siteConfig.instagramHandle}
            </Button>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
