import Image from "next/image";
import { Gift, Martini, Music2, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { MediaReveal } from "@/components/motion/media-reveal";

const experiences = [
  {
    icon: Music2,
    number: "01",
    title: "Show en vivo",
    text: "La noche se enciende con presentaciones, ritmo y una energía que no se queda en la pista.",
  },
  {
    icon: Martini,
    number: "02",
    title: "Bar & ambiente",
    text: "Un espacio pensado para compartir, brindar y dejar que la música marque el momento.",
  },
  {
    icon: Gift,
    number: "03",
    title: "Sorpresas",
    text: "Sorteos, promociones y detalles que convierten una salida cualquiera en una gran noche.",
  },
];

export function Experiencia() {
  return (
    <section className="experiencia" id="experiencia" aria-labelledby="experiencia-title">
      <div className="shell">
        <div className="experiencia__heading">
          <Reveal>
            <p className="eyebrow">Más que una salida</p>
            <h2 id="experiencia-title">La noche<br /><em><WordReveal>se vive aquí</WordReveal></em></h2>
          </Reveal>
          <Reveal className="experiencia__aside" delay={0.1}>
            <Sparkles size={20} aria-hidden="true" />
            <p>Todo lo que buscas para desconectar, celebrar y disfrutar hasta el último beat.</p>
          </Reveal>
        </div>

        <MediaReveal className="experiencia__visual" delay={0.08}>
          <div className="experiencia__visual-frame">
            <Image
              src="/images/editorial/editorial-03.webp"
              alt="Retrato editorial de una integrante de Las Conejitas en una escena de movimiento"
              fill
              sizes="(min-width: 900px) 100vw, 100vw"
              className="experiencia__visual-image"
            />
            <div className="experiencia__visual-overlay" aria-hidden="true" />
            <span>La identidad que se vive en Gran Regional</span>
          </div>
        </MediaReveal>

        <div className="experiencia__grid">
          {experiences.map(({ icon: Icon, number, title, text }, index) => (
            <Reveal key={title} delay={0.08 * index}>
              <article className="experiencia__card">
                <div className="experiencia__card-top">
                  <span>{number}</span>
                  <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <i aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="experiencia__footer" delay={0.2}>
          <span className="experiencia__footer-line" aria-hidden="true" />
          <p>Tu próxima historia comienza cuando cae la noche</p>
          <span className="experiencia__footer-line" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
