"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { LogoMark, Wordmark } from "@/components/Logo";
import { navLinks, siteConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "bg-ink/90 backdrop-blur-xl border-b border-line"
          : "bg-transparent"
      )}
    >
      <nav className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide text-cream/80 transition-colors hover:text-gold",
                    active && "text-gold"
                  )}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-cream/80 hover:text-gold"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            {siteConfig.phone}
          </a>
          <Link
            href="/kontakt"
            className="rounded-full bg-gradient-to-br from-gold-light to-gold px-5 py-2.5 text-sm font-semibold text-[#1a1408] transition-all hover:shadow-[0_0_24px_rgba(201,162,75,0.4)] hover:-translate-y-0.5"
          >
            Termin buchen
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-shell flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-lg font-medium text-cream/85 hover:bg-white/5 hover:text-gold",
                      pathname === link.href && "text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <Link
                  href="/kontakt"
                  className="flex items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold px-5 py-3 text-sm font-semibold text-[#1a1408]"
                >
                  Jetzt Termin buchen
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
