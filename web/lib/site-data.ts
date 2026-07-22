// Central content source for the Mastercut Barbershop site.
// Edit copy, prices and links here — components just render this data.

export const siteConfig = {
  name: "Mastercut Barbershop",
  shortName: "Mastercut",
  tagline: "Mehr als ein Barber. Ein Ort für Style, Qualität und Selbstbewusstsein.",
  description:
    "Mastercut Barbershop in Bregenz am Bodensee – Premium Herrenhaarschnitt, Bartpflege und klassische Rasur. Jetzt Termin sichern.",
  url: "https://mastercut-barbershop.example",
  phone: "+43 660 9603845",
  phoneHref: "tel:+436609603845",
  whatsappHref: "https://wa.me/436609603845",
  instagram: "https://www.instagram.com/mastercutbarbier",
  instagramHandle: "@mastercutbarbier",
  perfumeInstagram: "https://www.instagram.com/masterscent2023",
  address: {
    line1: "Bregenz am Bodensee",
    line2: "Vorarlberg, Österreich",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Mastercut+Barbershop+Bregenz",
  },
  secondLocation: {
    name: "Masterfade",
    line: "Hohenems, Vorarlberg",
  },
};

export const hours = [
  { day: "Montag – Freitag", time: "10:00 – 19:00" },
  { day: "Samstag", time: "09:00 – 18:00" },
  { day: "Sonntag", time: "Geschlossen" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export type ServiceCategory = "Haarschnitt" | "Bart" | "Rasur" | "Styling";

export type Service = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  icon: string;
  category: ServiceCategory;
  featured?: boolean;
};

// Preise sind marktübliche Richtwerte für ein Premium-Barbershop in Vorarlberg
// und dienen als Startpunkt. Bitte vor Veröffentlichung mit den echten,
// aktuellen Preisen von Mastercut Barbershop abgleichen.
export const services: Service[] = [
  {
    id: "haarschnitt-classic",
    title: "Classic Haarschnitt",
    description: "Präziser Schnitt mit Schere & Maschine, individuell auf Kopfform und Stil abgestimmt.",
    duration: "45 Min",
    price: "35 €",
    icon: "scissors",
    category: "Haarschnitt",
  },
  {
    id: "haarschnitt-signature",
    title: "Signature Haarschnitt",
    description: "Unser Flaggschiff: Beratung, Schnitt, Waschen, Styling und heißes Handtuch inklusive.",
    duration: "60 Min",
    price: "48 €",
    icon: "sparkles",
    category: "Haarschnitt",
    featured: true,
  },
  {
    id: "bart",
    title: "Bartschnitt & Konturen",
    description: "Konturenschnitt, Trimmen und Pflege für eine gestochen scharfe Linienführung.",
    duration: "30 Min",
    price: "25 €",
    icon: "beard",
    category: "Bart",
  },
  {
    id: "rasur",
    title: "Hot Towel Shave",
    description: "Klassische Rasur mit heißem Handtuch, Rasiermesser und pflegendem Aftershave-Balsam.",
    duration: "40 Min",
    price: "32 €",
    icon: "razor",
    category: "Rasur",
  },
  {
    id: "kombination",
    title: "Haar & Bart Komplett",
    description: "Haarschnitt und Bartpflege im Kombipaket – der komplette Look aus einer Hand.",
    duration: "75 Min",
    price: "58 €",
    icon: "combo",
    category: "Haarschnitt",
  },
  {
    id: "styling",
    title: "Waschen & Styling",
    description: "Haarwäsche mit Premiumprodukten, Föhnen und Styling für den perfekten Auftritt.",
    duration: "25 Min",
    price: "18 €",
    icon: "styling",
    category: "Styling",
  },
  {
    id: "camouflage",
    title: "Coloration & Camouflage",
    description: "Graue Ansätze dezent kaschieren oder neue Farbakzente setzen.",
    duration: "50 Min",
    price: "ab 40 €",
    icon: "color",
    category: "Styling",
  },
  {
    id: "kids",
    title: "Kinderhaarschnitt",
    description: "Geduldig, freundlich und schnell – der perfekte Schnitt auch für die Kleinsten.",
    duration: "30 Min",
    price: "22 €",
    icon: "kids",
    category: "Haarschnitt",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

// Platzhalter-Beispiele für das Layout. Bitte vor dem Live-Schalten durch
// echte Kundenbewertungen (z. B. von Google oder Instagram) ersetzen —
// erfundene Bewertungen sollten nie als echt ausgegeben werden.
export const testimonials: Testimonial[] = [
  {
    name: "Beispiel-Kunde A",
    role: "Stammkunde seit 2023",
    quote:
      "„Bester Fade der Stadt. Beratung, Ambiente und Ergebnis stimmen einfach — hier fühlt man sich wie in einer Herrenlounge, nicht wie beim Friseur.“",
    rating: 5,
  },
  {
    name: "Beispiel-Kunde B",
    role: "Google Rezension",
    quote:
      "„Die Rasur mit heißem Handtuch ist ein Erlebnis für sich. Absolut empfehlenswert für alle, die Wert auf Details legen.“",
    rating: 5,
  },
  {
    name: "Beispiel-Kunde C",
    role: "Instagram Follower",
    quote:
      "„Pünktlich, professionell und das Endergebnis hält, was die Fotos versprechen. Mein neuer Stamm-Barbershop.“",
    rating: 5,
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_395KpLNz2Cal2vvbbNQPqSeS1Uq/hf_20260722_200843_3e4046e5-c798-4b63-bea8-e3c884eaee9a.png",
    alt: "Innenraum des Mastercut Barbershop",
    width: 2400,
    height: 1792,
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_395KpLNz2Cal2vvbbNQPqSeS1Uq/hf_20260722_200844_6d660032-1eb1-40fd-8ec5-fc370c72285d.png",
    alt: "Barbier beim präzisen Haareschneiden",
    width: 2400,
    height: 1792,
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_395KpLNz2Cal2vvbbNQPqSeS1Uq/hf_20260722_200846_cef12a3f-b475-4693-b75a-1b37a31e858f.png",
    alt: "Kunde mit frischem Haarschnitt und gepflegtem Bart",
    width: 1792,
    height: 2400,
  },
  {
    src: "/images/team-opening.jpg",
    alt: "Eröffnung des neuen Masterfade Salons in Hohenems",
    width: 1179,
    height: 1291,
  },
  {
    src: "/images/founder-portrait.jpg",
    alt: "Mastercut Barbier bei der Arbeit",
    width: 1179,
    height: 1302,
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

// Rollenbezeichnungen statt erfundener Namen — bitte echte Namen/Bios ergänzen.
export const team: TeamMember[] = [
  {
    name: "Inhaber & Master Barber",
    role: "Gründer von Mastercut Barbershop",
    bio: "Mit jahrelanger Erfahrung im Herrenhaarschnitt und einem Auge fürs Detail steht er für Präzision, Stil und ehrliche Beratung.",
    image: "/images/founder-portrait.jpg",
  },
  {
    name: "Barbier-Team",
    role: "Mastercut & Masterfade",
    bio: "Unser eingespieltes Team aus erfahrenen Barbieren sorgt an beiden Standorten für gleichbleibend hohe Qualität und Handwerkskunst.",
    image: "/images/team-opening.jpg",
  },
];

export const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_395KpLNz2Cal2vvbbNQPqSeS1Uq/hf_20260722_200812_e55f17d0-f2a0-4bbd-8293-89b4243e8f1c.mp4";
export const heroPoster =
  "https://d8j0ntlcm91z4.cloudfront.net/user_395KpLNz2Cal2vvbbNQPqSeS1Uq/hf_20260722_200843_3e4046e5-c798-4b63-bea8-e3c884eaee9a.png";
export const shaveVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_395KpLNz2Cal2vvbbNQPqSeS1Uq/hf_20260722_200817_abd00a6d-be2e-40c6-8acd-4ce737c90472.mp4";
export const shaveVideoPoster =
  "https://d8j0ntlcm91z4.cloudfront.net/user_395KpLNz2Cal2vvbbNQPqSeS1Uq/hf_20260722_200844_6d660032-1eb1-40fd-8ec5-fc370c72285d.png";
export const salonReelVideo = "/videos/salon-reel.mp4";

export const whyMastercut = [
  {
    title: "Erfahrene Barbiere",
    description: "Ausgebildete Stylisten mit jahrelanger Erfahrung im klassischen und modernen Herrenschnitt.",
    icon: "award",
  },
  {
    title: "Premium-Produkte",
    description: "Wir arbeiten ausschließlich mit hochwertigen Pflege- und Stylingprodukten für beste Ergebnisse.",
    icon: "gem",
  },
  {
    title: "Entspannte Atmosphäre",
    description: "Dunkles, elegantes Ambiente mit Liege-Sesseln, guter Musik und ehrlicher Beratung.",
    icon: "sofa",
  },
  {
    title: "Zwei Standorte",
    description: "Mastercut in Bregenz und Masterfade in Hohenems — für kurze Wege am Bodensee.",
    icon: "map",
  },
];
