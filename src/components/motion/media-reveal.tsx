"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface MediaRevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  direction?: "left" | "right";
}

export function MediaReveal({ children, className, delay = 0, direction = "left" }: MediaRevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(Boolean(reduceMotion));
  const from = direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

  useEffect(() => {
    if (reduceMotion) return;
    const check = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight * 0.88 && rect.bottom > 0) setVisible(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [reduceMotion]);

  return (
    <motion.div
      ref={ref}
      className={cn("media-reveal", className)}
      initial={reduceMotion ? false : { clipPath: from, filter: "blur(14px)", opacity: 0.25, y: 34, scale: 1.045 }}
      animate={visible ? { clipPath: "inset(0 0 0 0)", filter: "blur(0px)", opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: reduceMotion ? 0 : 1.15, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      <motion.span
        className="media-reveal__curtain"
        initial={reduceMotion ? false : { scaleX: 1 }}
        animate={visible ? { scaleX: 0 } : undefined}
        transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : delay + 0.12, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: direction === "left" ? "right" : "left" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
