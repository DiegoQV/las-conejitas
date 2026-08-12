import Image from "next/image";
import { Sparkles, Star } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";

export function Conejitas() {
  return (
    <section className="conejitas" id="conejitas" aria-labelledby="conejitas-title">
      <div className="conejitas__glow" aria-hidden="true" />

      <div className="shell conejitas__header">
        <Reveal>
          <p className="eyebrow">Ellas hacen la noche</p>
          <h2 id="conejitas-title">
            Conoce a <em><WordReveal>Las Conejitas</WordReveal></em>
          </h2>
        </Reveal>

        <Reveal className="conejitas__intro" delay={0.12}>
          <p>
            Carisma, actitud y una energía que transforma cada noche. Ven a
            vivir una experiencia diferente junto a las protagonistas del Gran Regional.
          </p>
          <span><Sparkles size={15} aria-hidden="true" /> Show · Música · Diversión</span>
        </Reveal>
      </div>

      <div className="shell conejitas__gallery">
        <Reveal className="conejitas__feature" delay={0.08}>
          <div className="conejitas__image-wrap conejitas__image-wrap--wide">
            <Image
              src="/images/editorial/editorial-01.webp"
              alt="Retrato editorial de una integrante de Las Conejitas en una escena de luz natural"
              fill
              sizes="(min-width: 900px) 68vw, 100vw"
              className="conejitas__image"
            />
            <div className="conejitas__image-shade" aria-hidden="true" />
            <div className="conejitas__feature-copy">
              <span>Gran Regional presenta</span>
              <strong>Una noche para recordar</strong>
            </div>
          </div>
        </Reveal>

        <Reveal className="conejitas__portrait" delay={0.18}>
          <div className="conejitas__image-wrap conejitas__image-wrap--portrait">
            <Image
              src="/images/models/hero-model-03.webp"
              alt="Integrante de Las Conejitas frente al letrero de neón"
              fill
              sizes="(min-width: 900px) 28vw, 72vw"
              className="conejitas__image"
            />
          </div>
          <div className="conejitas__portrait-label">
            <Star size={14} aria-hidden="true" />
            <span>Las protagonistas<br /><b>de tu noche</b></span>
          </div>
        </Reveal>
      </div>

      <div className="conejitas__marquee" aria-hidden="true">
        <div className="conejitas__marquee-track">
          <div className="conejitas__marquee-group">
            <span>Actitud</span><i /> <span>Carisma</span><i /> <span>Energía</span><i />
            <span>Las Conejitas</span><i /> <span>Gran Regional</span><i />
          </div>
          <div className="conejitas__marquee-group" aria-hidden="true">
            <span>Actitud</span><i /> <span>Carisma</span><i /> <span>Energía</span><i />
            <span>Las Conejitas</span><i /> <span>Gran Regional</span><i />
          </div>
        </div>
      </div>
    </section>
  );
}
