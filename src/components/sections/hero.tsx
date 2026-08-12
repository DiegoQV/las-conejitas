import { MapPin } from "lucide-react";
import { getImageProps } from "next/image";
import Link from "next/link";

import { heroContent, heroHighlights, siteIdentity } from "@/data/site";
import {
  AnimatedCount,
  HeroImageReveal,
  HeroLightSweep,
  HeroOrnamentMotion,
  HeroRailMotion,
  HeroTitleMotion,
} from "@/components/motion/hero-motion";
import { Reveal } from "@/components/motion/reveal";
import { ContactButton } from "@/components/ui/contact-button";

export function Hero() {
  const commonImageProps = {
    alt: "Modelo en una composición nocturna de Gran Regional",
    sizes: "100vw",
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: "/images/models/hero-model-desktop-red.webp",
    width: 3000,
    height: 2000,
    quality: 90,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    alt: "Modelo de Las Conejitas del Gran Regional junto al letrero de neón del establecimiento",
    src: "/images/models/hero-model-03.webp",
    width: 1200,
    height: 1600,
    quality: 90,
  });

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__background" aria-hidden="true">
        <span className="hero__shape hero__shape--one" />
        <span className="hero__shape hero__shape--two" />
        <span className="hero__gold-line" />
        <span className="hero__light-beam hero__light-beam--magenta" />
        <span className="hero__light-beam hero__light-beam--blue" />
        <HeroLightSweep />
      </div>

      <div className="hero__layout shell">
        <div className="hero__intro">
          <Reveal>
            <p className="eyebrow">{heroContent.eyebrow}</p>
          </Reveal>
          <HeroTitleMotion
            lead={heroContent.title}
            accent={heroContent.titleAccent}
          />
          <HeroOrnamentMotion />
        </div>

        <HeroImageReveal className="hero__visual">
          <div className="hero__visual-stage">
            <div className="hero__frame">
              <span className="hero__frame-layer" aria-hidden="true" />
              <span className="hero__frame-accent" aria-hidden="true" />
              <picture className="hero__picture">
                <source
                  media="(min-width: 1200px)"
                  srcSet={desktopSrcSet}
                />
                <source
                  media="(max-width: 1199px)"
                  srcSet={mobileSrcSet}
                />
                <img
                  {...mobileImageProps}
                  alt="Modelo de Las Conejitas del Gran Regional junto al letrero de neón del establecimiento"
                  className="hero__image"
                  fetchPriority="high"
                />
              </picture>
            </div>
            <div className="hero__visual-caption">
              <span>Las Conejitas</span>
              <i aria-hidden="true" />
              <span>Gran Regional</span>
            </div>
          </div>
        </HeroImageReveal>

        <Reveal className="hero__copy" delay={0.18}>
          <p className="hero__description">{heroContent.description}</p>
          <div className="hero__actions">
            <ContactButton label={heroContent.primaryCta} />
            <Link className="button button--secondary" href="#ubicacion">
              <MapPin aria-hidden="true" size={19} />
              {heroContent.secondaryCta}
            </Link>
          </div>
          <AnimatedCount
            value={siteIdentity.featuredWomenCount}
            label="integrantes"
            note="Experiencia Gran Regional"
          />
        </Reveal>
      </div>

      <HeroRailMotion
        items={heroHighlights}
        location="Chachapoyas · Manchibamba"
      />
    </section>
  );
}
