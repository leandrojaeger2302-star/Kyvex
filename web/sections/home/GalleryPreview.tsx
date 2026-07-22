import { SectionHeading } from "@/components/SectionHeading";
import { MasonryGallery } from "@/components/MasonryGallery";
import { Button } from "@/components/Button";
import { galleryImages } from "@/lib/site-data";

export function GalleryPreview() {
  return (
    <section className="section-shell bg-surface">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Galerie"
          title="Ein Blick in unseren Salon"
          description="Impressionen aus Bregenz und Hohenems — Handwerk, Atmosphäre und Ergebnisse, die für sich sprechen."
        />

        <div className="mt-14">
          <MasonryGallery images={galleryImages} />
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/galerie" variant="outline">
            Ganze Galerie ansehen
          </Button>
        </div>
      </div>
    </section>
  );
}
