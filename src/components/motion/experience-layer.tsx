"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import { ageGateContent } from "@/data/site";

const scenes = [
  ["inicio", "Inicio"],
  ["conejitas", "Conejitas"],
  ["experiencia", "Experiencia"],
  ["esta-noche", "Esta noche"],
  ["galeria", "Galería"],
  ["ubicacion", "Ubicación"],
] as const;

export function ExperienceLayer() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState("inicio");
  const [ambience, setAmbience] = useState(true);
  const [experienceReady, setExperienceReady] = useState(false);
  const [pointer, setPointer] = useState({ x: -200, y: -200, visible: false });
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const haloRotate = useTransform(smoothProgress, [0, 1], [0, 210]);

  useEffect(() => {
    const unlock = () => setExperienceReady(true);
    try {
      if (localStorage.getItem(ageGateContent.storageKey) === "true") unlock();
    } catch {
      // The age gate event still unlocks the sequence when storage is unavailable.
    }
    window.addEventListener("gran-regional-age-confirmation", unlock);
    return () => window.removeEventListener("gran-regional-age-confirmation", unlock);
  }, []);

  useEffect(() => {
    const sections = scenes
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -56%", threshold: [0, 0.15, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: PointerEvent) => setPointer({ x: event.clientX, y: event.clientY, visible: true });
    const leave = () => setPointer((current) => ({ ...current, visible: false }));
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduceMotion]);

  const activeIndex = scenes.findIndex(([id]) => id === active);

  return (
    <>
      {!reduceMotion && experienceReady && (
        <motion.div
          className="intro-sequence"
          initial={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
          animate={{ opacity: [1, 1, 1], clipPath: ["inset(0 0 0 0)", "inset(0 0 0 0)", "inset(0 0 100% 0)"] }}
          transition={{ duration: 3.6, times: [0, 0.78, 1], ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.span className="intro-sequence__glow" initial={{ opacity: 0, scale: 0.25 }} animate={{ opacity: [0, 1, 0.72, 0.62, 0], scale: [0.25, 0.8, 1.05, 1.22, 1.55] }} transition={{ duration: 3.25, times: [0, 0.22, 0.5, 0.82, 1], ease: "easeOut" }} />
          <motion.span className="intro-sequence__orbit intro-sequence__orbit--one" initial={{ opacity: 0, scale: 0.4, rotate: -28 }} animate={{ opacity: [0, 0.55, 0.48, 0], scale: [0.4, 0.9, 1.08, 1.35], rotate: [-28, -5, 5, 18] }} transition={{ duration: 3.05, delay: 0.12, times: [0, 0.28, 0.76, 1], ease: [0.16, 1, 0.3, 1] }} />
          <motion.span className="intro-sequence__orbit intro-sequence__orbit--two" initial={{ opacity: 0, scale: 0.35, rotate: 35 }} animate={{ opacity: [0, 0.35, 0.3, 0], scale: [0.35, 0.88, 1.12, 1.5], rotate: [35, 8, -5, -20] }} transition={{ duration: 3.2, delay: 0.2, times: [0, 0.28, 0.76, 1], ease: [0.16, 1, 0.3, 1] }} />
          <motion.div initial={{ opacity: 0, y: 34, scale: 0.78, filter: "blur(24px)", letterSpacing: "0.48em" }} animate={{ opacity: [0, 1, 1, 1, 0], y: [34, 0, 0, 0, -18], scale: [0.78, 1.04, 1, 1, 1.08], filter: ["blur(24px)", "blur(2px)", "blur(0px)", "blur(0px)", "blur(9px)"], letterSpacing: ["0.48em", "0.16em", "0.2em", "0.2em", "0.32em"] }} transition={{ duration: 3.15, times: [0, 0.22, 0.42, 0.82, 1], ease: [0.16, 1, 0.3, 1] }}>
            <strong>GRAN REGIONAL</strong>
            <span>La noche comienza aquí</span>
          </motion.div>
          <motion.i initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 1.25, 1.25, 0], opacity: [0, 1, 1, 1, 0] }} transition={{ duration: 3.05, times: [0, 0.24, 0.48, 0.82, 1] }} />
          <motion.b className="intro-sequence__scan" initial={{ x: "-130%", opacity: 0 }} animate={{ x: ["-130%", "130%"], opacity: [0, 0.8, 0] }} transition={{ duration: 1.45, delay: 0.62, times: [0, 0.5, 1], ease: "easeInOut" }} />
        </motion.div>
      )}
      {!reduceMotion && (
        <motion.div
          className="pointer-aura"
          animate={{ x: pointer.x - 180, y: pointer.y - 180, opacity: pointer.visible && ambience ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 24, mass: 0.25 }}
          aria-hidden="true"
        />
      )}

      <motion.div className="experience-orbit" style={{ rotate: haloRotate }} aria-hidden="true" />

      <nav className="scene-nav" aria-label="Recorrido por la experiencia">
        <span className="scene-nav__line" aria-hidden="true" />
        {scenes.map(([id, label], index) => (
          <a className={active === id ? "is-active" : ""} href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}>
            <i>{String(index + 1).padStart(2, "0")}</i><span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="experience-controls">
        <button type="button" onClick={() => setAmbience((value) => !value)} aria-label={ambience ? "Desactivar ambiente visual" : "Activar ambiente visual"} aria-pressed={ambience}>
          {ambience ? <Sparkles size={15} aria-hidden="true" /> : <Sparkle size={15} aria-hidden="true" />}
          <span>Ambiente {ambience ? "on" : "off"}</span>
        </button>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span>
      </div>

      <a className="hero-scroll-cue" href="#conejitas" aria-label="Descubrir la experiencia">
        <span>Descubre</span><ArrowDown size={16} aria-hidden="true" />
      </a>
    </>
  );
}
