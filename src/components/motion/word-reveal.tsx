"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WordRevealProps {
  children: string;
  delay?: number;
}

export function WordReveal({ children, delay = 0 }: WordRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = children.trim().split(/\s+/);

  return (
    <motion.span
      className="word-reveal"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.07,
            delayChildren: reduceMotion ? 0 : delay,
          },
        },
      }}
      aria-label={children}
    >
      {words.map((word, index) => (
        <motion.span
          className="word-reveal__word"
          key={`${word}-${index}`}
          variants={{
            hidden: reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: "0.65em", rotate: 2 },
            visible: { opacity: 1, y: 0, rotate: 0 },
          }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
