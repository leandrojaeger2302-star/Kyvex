import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line pb-16 pt-40 sm:pt-44",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,162,75,0.14), transparent 65%)",
        }}
      />
      <div className="container-shell relative text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl text-balance text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
