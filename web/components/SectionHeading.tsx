import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl text-balance text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
