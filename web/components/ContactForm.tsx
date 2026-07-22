"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { services, siteConfig } from "@/lib/site-data";

// Kein Backend/E-Mail-Versand angebunden: die Anfrage wird als vorausgefüllte
// WhatsApp-Nachricht an die echte Geschäftsnummer geöffnet. Sobald ein
// Buchungssystem oder eine geschäftliche E-Mail-Adresse existiert, kann hier
// stattdessen eine echte API-Route (app/api/contact) angebunden werden.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState(services[0]?.title ?? "");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = [
      `Neue Terminanfrage über die Website`,
      `Name: ${name}`,
      `Kontakt: ${contact}`,
      `Gewünschte Leistung: ${service}`,
      message ? `Nachricht: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `${siteConfig.whatsappHref}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-2xl border border-gold/30 bg-surface p-10 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={1.5} />
        <h3 className="font-display text-xl text-white">
          Deine Anfrage wurde vorbereitet
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Wir haben WhatsApp mit deiner Nachricht geöffnet. Sende sie ab,
          damit wir uns schnellstmöglich bei dir melden.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-semibold text-gold hover:underline"
        >
          Neue Anfrage stellen
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dein Name"
            className={inputClasses}
          />
        </Field>
        <Field label="Telefon oder E-Mail" htmlFor="contact">
          <input
            id="contact"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Wie erreichen wir dich?"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Gewünschte Leistung" htmlFor="service">
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={inputClasses}
        >
          {services.map((s) => (
            <option key={s.id} value={s.title} className="bg-surface">
              {s.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Nachricht (optional)" htmlFor="message">
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Wunschtermin, besondere Anliegen ..."
          className={inputClasses}
        />
      </Field>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light to-gold px-6 py-3.5 text-sm font-semibold text-[#1a1408] transition-all hover:shadow-[0_0_28px_rgba(201,162,75,0.4)] hover:-translate-y-0.5"
      >
        Anfrage per WhatsApp senden
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

const inputClasses =
  "w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-gold";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
