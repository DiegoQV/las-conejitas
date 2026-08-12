import { Camera } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { GalleryGrid } from "@/components/sections/gallery-grid";

export function Galeria() {
  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="gallery__ambient" aria-hidden="true" />
      <div className="shell gallery__header">
        <Reveal>
          <p className="eyebrow">Momentos Gran Regional</p>
          <h2 id="gallery-title">La noche,<br /><em><WordReveal>en imágenes</WordReveal></em></h2>
        </Reveal>
        <Reveal className="gallery__intro" delay={0.1}>
          <Camera size={19} aria-hidden="true" />
          <p>Una mirada auténtica al ambiente y a quienes dan vida a la experiencia.</p>
          <span>Selección editorial · Gran Regional</span>
        </Reveal>
      </div>
      <div className="shell">
        <GalleryGrid />
      </div>
    </section>
  );
}
