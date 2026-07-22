import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  icon?: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 whitespace-nowrap";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  gold: "bg-gradient-to-br from-gold-light to-gold text-[#1a1408] hover:shadow-[0_0_30px_rgba(201,162,75,0.45)] hover:-translate-y-0.5",
  outline:
    "border border-white/25 text-cream hover:border-gold hover:text-gold",
  ghost: "text-cream/80 hover:text-gold",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  href,
  children,
  variant = "gold",
  size = "md",
  className,
  external,
  icon,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external || href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto")) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
