import Image from "next/image";
import { Clock3, MapPin, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { ContactButton } from "@/components/ui/contact-button";

const nightSteps = [
  ["Inicio", "El ambiente comienza", "Luces, música y el espacio preparado para recibirte."],
  ["Noche", "La energía se enciende", "Una experiencia que combina música, atención y diversión."],
  ["Show", "Las Conejitas", "El principal activo visual y comercial de Gran Regional."],
] as const;

export function EstaNoche() {
  return (
    <section className="esta-noche" id="esta-noche" aria-labelledby="esta-noche-title">
      <div className="esta-noche__backdrop" aria-hidden="true"><span /><span /><span /></div>
      <div className="shell esta-noche__layout">
        <Reveal className="esta-noche__heading">
          <p className="eyebrow">Planifica tu noche</p>
          <h2 id="esta-noche-title">Esta noche<br /><em><WordReveal>pasa algo</WordReveal></em></h2>
          <p className="esta-noche__lead">Ven temprano, quédate hasta tarde. Cada noche tiene su propio ritmo en Gran Regional.</p>
          <div className="esta-noche__meta">
            <span><Clock3 size={15} aria-hidden="true" /> Horario por confirmar</span>
            <span><MapPin size={15} aria-hidden="true" /> Chachapoyas</span>
          </div>
          <ContactButton label="Consultar por WhatsApp" />
        </Reveal>

        <div className="esta-noche__timeline" aria-label="Momentos de la experiencia">
          {nightSteps.map(([time, title, text], index) => (
            <Reveal className="esta-noche__event" key={time} delay={0.08 * index}>
              <div className="esta-noche__event-time">{time}</div>
              <div className="esta-noche__event-marker"><i aria-hidden="true" /></div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="esta-noche__note" delay={0.3}>
            <Sparkles size={17} aria-hidden="true" />
            <span>La programación puede variar.<br /><b>Déjate sorprender.</b></span>
          </Reveal>
        </div>

        <Reveal className="esta-noche__visual" delay={0.16}>
          <div className="esta-noche__visual-frame">
            <Image
              src="/images/editorial/editorial-02.webp"
              alt="Retrato editorial de una integrante de Las Conejitas"
              fill
              sizes="(min-width: 900px) 28vw, 100vw"
              className="esta-noche__visual-image"
            />
            <div className="esta-noche__visual-overlay" aria-hidden="true" />
            <span>Una noche con personalidad propia</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
