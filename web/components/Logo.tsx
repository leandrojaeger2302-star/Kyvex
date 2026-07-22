import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30.5" stroke="var(--color-gold)" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="26" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.5" />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="22"
        fill="var(--color-gold-light)"
      >
        MC
      </text>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="font-display text-lg tracking-wide text-cream">
        MASTERCUT
      </span>
      <span className="text-[0.6rem] font-semibold tracking-[0.35em] text-gold">
        BARBERSHOP
      </span>
    </span>
  );
}
