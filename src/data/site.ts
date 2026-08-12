import type {
  AgeGateContent,
  ConfiguredValue,
  HeroContent,
  NavigationItem,
} from "@/types/site";

export const siteIdentity = {
  name: "Gran Regional",
  descriptor: "Lounge & Bar",
  city: "Chachapoyas",
  region: "Amazonas",
  country: "Perú",
  address: "Avenida Aeropuerto, cuadra 15. Sector Manchibamba.",
  minimumAge: 18,
  featuredWomenCount: 16,
} as const;

export const contactConfig: {
  whatsapp: ConfiguredValue<string>;
  mapsUrl: ConfiguredValue<string>;
  openingHours: ConfiguredValue<string>;
  socialLinks: ConfiguredValue<readonly string[]>;
} = {
  whatsapp: { status: "confirmed", value: "51928174629" },
  mapsUrl: { status: "confirmed", value: "https://maps.app.goo.gl/6TtEaUrsrkb9C4qc8" },
  openingHours: { status: "pending", value: null },
  socialLinks: { status: "pending", value: null },
};

export const navigation: readonly NavigationItem[] = [
  { label: "Las Conejitas", href: "#conejitas" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Esta noche", href: "#esta-noche" },
  { label: "Galería", href: "#galeria" },
  { label: "Ubicación", href: "#ubicacion" },
];

export const heroContent: HeroContent = {
  eyebrow: "Lounge & Bar · Chachapoyas",
  title: "La noche tiene",
  titleAccent: "protagonistas",
  description:
    "Vive Gran Regional con Las Conejitas, show en vivo, música y entretenimiento nocturno para mayores de 18 años en Chachapoyas.",
  primaryCta: "Consultar por WhatsApp",
  secondaryCta: "Cómo llegar",
};

export const heroHighlights = [
  "Show en vivo",
  "Entrada gratis",
  "Sorteos y sorpresas",
] as const;

export const ageGateContent: AgeGateContent = {
  storageKey: "gran-regional-age-confirmed",
  title: "Una experiencia exclusiva para adultos",
  description:
    "Este sitio presenta contenido de entretenimiento nocturno dirigido únicamente a personas mayores de 18 años.",
  confirmLabel: "Soy mayor de 18 años",
  exitLabel: "Salir",
  exitUrl: "https://www.gob.pe/",
  privacyHref: "/privacidad",
  responsibilityNotice:
    "Disfruta responsablemente. Prohibida la venta de bebidas alcohólicas a menores de 18 años.",
};

export const pendingSections = navigation.map((item) => ({
  ...item,
  id: item.href.slice(1),
}));
