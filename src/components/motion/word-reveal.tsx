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
            staggerChildren: reduceMotion ? 0.045 : 0.11,
            delayChildren: delay,
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
              ? { opacity: 0, y: "0.18em", filter: "blur(3px)" }
              : { opacity: 0, y: "0.9em", rotateX: 72, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: reduceMotion ? 0.38 : 0.78, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
