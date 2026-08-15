"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = false;
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
