import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { team } from "@/lib/site-data";

export function Team() {
  return (
    <section className="section-shell bg-surface">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Unser Team"
          title="Die Hände hinter Mastercut"
          description="Erfahrene Barbiere mit einer gemeinsamen Leidenschaft: euch den besten Schnitt eures Lebens zu geben."
        />

        <StaggerGroup className="mt-14 grid gap-8 sm:grid-cols-2">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <div className="group overflow-hidden rounded-2xl border border-line bg-ink">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {member.bio}
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
