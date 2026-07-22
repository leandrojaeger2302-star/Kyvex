import { Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";

const pillars = [
  {
    icon: Compass,
    title: "Präzision",
    description:
      "Jeder Schnitt folgt einem klaren Plan — von der Beratung bis zum letzten Detail.",
  },
  {
    icon: HeartHandshake,
    title: "Respekt",
    description:
      "Wir hören zu, bevor wir schneiden. Dein Wunsch und deine Persönlichkeit stehen im Mittelpunkt.",
  },
  {
    icon: ShieldCheck,
    title: "Qualität",
    description:
      "Hochwertige Werkzeuge, geprüfte Hygiene-Standards und Premium-Produkte — ohne Kompromisse.",
  },
];

export function Philosophy() {
  return (
    <section className="section-shell bg-ink">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Unsere Philosophie"
          title="Mehr als ein Barber. Ein Ort für Style, Qualität und Selbstbewusstsein."
          description="Diese drei Werte tragen jede Entscheidung, die wir bei Mastercut treffen."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="h-full rounded-2xl border border-line bg-surface p-8 text-center transition-colors hover:border-gold/40">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <pillar.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-xl text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
