import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIcon } from "@/components/ServiceIcon";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { services } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function ServicesPreview() {
  const preview = services.slice(0, 6);

  return (
    <section id="leistungen-preview" className="section-shell bg-ink">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Unsere Leistungen"
          title="Für jeden Anlass der richtige Look"
          description="Von der klassischen Rasur bis zum präzisen Signature-Cut — jede Leistung mit Liebe zum Detail."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((service) => (
            <StaggerItem key={service.id}>
              <div
                className={cn(
                  "group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50",
                  service.featured && "border-gold/40"
                )}
              >
                {service.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-gold">
                    Beliebt
                  </span>
                ) : null}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors group-hover:bg-gold/10">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="mt-5 font-display text-xl text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                  <span className="text-muted">{service.duration}</span>
                  <span className="font-display text-lg text-gold">
                    {service.price}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <Link
            href="/leistungen"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold"
          >
            Alle Leistungen &amp; Preise ansehen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
