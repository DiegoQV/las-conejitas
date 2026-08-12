import { ArrowUpRight, MapPin, Navigation } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";

const mapsUrl = "https://maps.app.goo.gl/6TtEaUrsrkb9C4qc8";

export function Ubicacion() {
  return (
    <section className="ubicacion" id="ubicacion" aria-labelledby="ubicacion-title">
      <div className="ubicacion__glow" aria-hidden="true" />
      <div className="shell ubicacion__layout">
        <Reveal className="ubicacion__copy">
          <p className="eyebrow">Encuéntranos</p>
          <h2 id="ubicacion-title">Tu noche<br /><em><WordReveal>comienza aquí</WordReveal></em></h2>
          <p className="ubicacion__lead">
            Estamos en Chachapoyas, en una ubicación fácil de encontrar y cerca de los principales accesos de la ciudad.
          </p>
          <div className="ubicacion__address">
            <MapPin size={20} aria-hidden="true" />
            <div>
              <strong>Gran Regional Lounge &amp; Bar</strong>
              <span>Avenida Aeropuerto, cuadra 15</span>
              <span>Referencia: sector Manchibamba</span>
              <small>Chachapoyas, Amazonas · Perú</small>
            </div>
          </div>
          <a className="button button--primary ubicacion__cta" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation size={17} aria-hidden="true" />
            <span>Cómo llegar</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal className="ubicacion__map" delay={0.12}>
          <div className="ubicacion__map-art" aria-hidden="true">
            <span className="ubicacion__map-grid" />
            <span className="ubicacion__map-route ubicacion__map-route--one" />
            <span className="ubicacion__map-route ubicacion__map-route--two" />
            <span className="ubicacion__map-pin"><MapPin size={24} /></span>
            <span className="ubicacion__map-label">MANCHIBAMBA</span>
          </div>
          <div className="ubicacion__map-footer">
            <span><MapPin size={14} aria-hidden="true" /> Chachapoyas</span>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
