"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 34, filter: "blur(10px)", clipPath: "inset(0 0 18% 0)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8%" }}
      transition={{
        duration: reduceMotion ? 0 : 0.82,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
