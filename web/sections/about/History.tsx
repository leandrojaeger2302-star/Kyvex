import { Reveal } from "@/components/Reveal";
import { salonReelVideo, siteConfig } from "@/lib/site-data";

export function History() {
  return (
    <section className="section-shell bg-ink">
      <div className="container-shell grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Unsere Geschichte
          </p>
          <h2 className="mt-4 font-display text-3xl text-balance text-white sm:text-4xl">
            Vom ersten Stuhl zu zwei Standorten
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              Mastercut Barbershop begann mit einer einfachen Idee: Herren
              sollen einen Ort haben, der Handwerk, Stil und Selbstbewusstsein
              vereint — ohne Kompromisse bei der Qualität.
            </p>
            <p>
              Aus dieser Vision wurde ein fester Anlaufpunkt in Bregenz am
              Bodensee mit einer treuen Community aus mittlerweile über
              1.497 Followern auf Instagram. Im Dezember eröffneten wir mit{" "}
              {siteConfig.secondLocation.name} einen zweiten Standort in{" "}
              {siteConfig.secondLocation.line}, um noch mehr Kunden das
              Mastercut-Erlebnis zu bieten.
            </p>
            <p>
              Heute stehen beide Salons für dieselben Werte: Präzision,
              ehrliche Beratung und ein Ambiente, in dem man sich vom ersten
              Moment an wohlfühlt.
            </p>
          </div>
        </Reveal>

        <Reveal className="relative aspect-[9/16] max-h-[560px] overflow-hidden rounded-2xl border border-line justify-self-center">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={salonReelVideo} type="video/mp4" />
          </video>
        </Reveal>
      </div>
    </section>
  );
}
