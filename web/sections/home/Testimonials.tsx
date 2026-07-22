import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StarRating } from "@/components/StarRating";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="section-shell bg-ink">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Kundenbewertungen"
          title="Was unsere Kunden sagen"
          description="Vertrauen, das über Jahre gewachsen ist — nachzulesen bei uns vor Ort und auf Social Media."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8">
                <Quote className="h-8 w-8 text-gold/40" strokeWidth={1.5} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/85">
                  {t.quote}
                </p>
                <StarRating rating={t.rating} className="mt-6" />
                <div className="mt-4 border-t border-line pt-4">
                  <p className="font-display text-base text-white">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {t.role}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
