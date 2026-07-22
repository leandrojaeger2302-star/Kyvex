import { Hero } from "@/sections/home/Hero";
import { ServicesPreview } from "@/sections/home/ServicesPreview";
import { WhyMastercut } from "@/sections/home/WhyMastercut";
import { Testimonials } from "@/sections/home/Testimonials";
import { GalleryPreview } from "@/sections/home/GalleryPreview";
import { OpeningHours } from "@/sections/home/OpeningHours";
import { ContactCta } from "@/sections/home/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyMastercut />
      <Testimonials />
      <GalleryPreview />
      <OpeningHours />
      <ContactCta />
    </>
  );
}
