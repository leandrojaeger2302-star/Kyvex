import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { History } from "@/sections/about/History";
import { Team } from "@/sections/about/Team";
import { Philosophy } from "@/sections/about/Philosophy";
import { ContactCta } from "@/sections/home/ContactCta";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Die Geschichte, das Team und die Philosophie von Mastercut Barbershop in Bregenz am Bodensee.",
};

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Handwerk mit Geschichte"
        description="Wer wir sind, wofür wir stehen und wer hinter Mastercut Barbershop steckt."
      />
      <History />
      <Team />
      <Philosophy />
      <ContactCta />
    </>
  );
}
