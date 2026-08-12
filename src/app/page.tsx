import { Hero } from "@/components/sections/hero";
import { Conejitas } from "@/components/sections/conejitas";
import { Experiencia } from "@/components/sections/experiencia";
import { EstaNoche } from "@/components/sections/esta-noche";
import { Galeria } from "@/components/sections/galeria";
import { Ubicacion } from "@/components/sections/ubicacion";
import { contactConfig, siteIdentity } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "NightClub",
  "@id": `${absoluteUrl("/")}#business`,
  name: `${siteIdentity.name} ${siteIdentity.descriptor}`,
  description:
    "Entretenimiento nocturno para mayores de 18 años en Chachapoyas, Amazonas.",
  url: absoluteUrl("/"),
  image: absoluteUrl("/images/og-image.webp"),
  telephone: "+51 928 174 629",
  hasMap: contactConfig.mapsUrl.value ?? undefined,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteIdentity.address,
    addressLocality: siteIdentity.city,
    addressRegion: siteIdentity.region,
    addressCountry: "PE",
  },
  areaServed: siteIdentity.city,
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: siteIdentity.minimumAge,
  },
  ...(contactConfig.socialLinks.value
    ? { sameAs: [...contactConfig.socialLinks.value] }
    : {}),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Conejitas />
      <Experiencia />
      <EstaNoche />
      <Galeria />
      <Ubicacion />
    </main>
  );
}
