"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}
