"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Gift, MapPin, Mic2, Ticket } from "lucide-react";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HeroTitleMotionProps {
  accent: string;
  lead: string;
}

export function HeroTitleMotion({ accent, lead }: HeroTitleMotionProps) {
  const reduceMotion = false;

  return (
    <h1 id="hero-title">
      <motion.span
        className="hero__title-lead"
        initial={
          reduceMotion
            ? false
            : { clipPath: "inset(100% 0 0 0)", opacity: 0, y: 18 }
        }
        animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.72,
          delay: reduceMotion ? 0 : 0.16,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {lead}
      </motion.span>
      <motion.span
        className="hero__title-accent"
        initial={
          reduceMotion
            ? false
            : {
                clipPath: "inset(100% 0 0 0)",
                letterSpacing: "0.075em",
                opacity: 0,
                y: 24,
              }
        }
        animate={{
          clipPath: "inset(0% 0 0 0)",
          letterSpacing: "0.015em",
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.82,
          delay: reduceMotion ? 0 : 0.24,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {accent}
      </motion.span>
    </h1>
  );
}

export function HeroOrnamentMotion() {
  const reduceMotion = false;

  return (
    <div className="hero__ornament" aria-hidden="true">
      <motion.span
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ transformOrigin: "right" }}
        transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.54 }}
      />
      <motion.i
        initial={reduceMotion ? false : { opacity: 0, rotate: 45, scale: 0 }}
        animate={{ opacity: 1, rotate: 45, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, delay: 0.78 }}
      />
      <motion.span
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.54 }}
      />
    </div>
  );
}

interface HeroImageRevealProps {
  children: ReactNode;
  className?: string;
}

export function HeroImageReveal({
  children,
  className,
}: HeroImageRevealProps) {
  const reduceMotion = false;
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 7);
    rotateX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 7);
  };

  const resetTilt = () => {
    animate(rotateX, 0, { duration: 0.45 });
    animate(rotateY, 0, { duration: 0.45 });
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      initial={
        reduceMotion
          ? false
          : { clipPath: "inset(0 100% 0 0)", opacity: 0.55 }
      }
      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 1.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroLightSweep() {
  const reduceMotion = false;

  if (reduceMotion) return null;

  return (
    <motion.span
      className="hero__cinematic-sweep"
      aria-hidden="true"
      initial={{ opacity: 0, x: "-135%" }}
      animate={{ opacity: [0, 0.32, 0], x: "135%" }}
      transition={{ duration: 1.45, delay: 0.12, ease: "easeInOut" }}
    />
  );
}

interface AnimatedCountProps {
  label: string;
  note: string;
  value: number;
}

export function AnimatedCount({ label, note, value }: AnimatedCountProps) {
  const reduceMotion = false;
  const count = useMotionValue(reduceMotion ? value : 0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (reduceMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration: 0.85,
      delay: 0.86,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [count, reduceMotion, value]);

  return (
    <motion.p
      className="hero__count"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: 0.82 }}
    >
      <motion.strong>{rounded}</motion.strong>
      <span>
        <b>{label}</b>
        <small>{note}</small>
      </span>
    </motion.p>
  );
}

interface HeroRailMotionProps {
  items: readonly string[];
  location: string;
}

const railIcons = [Mic2, Ticket, Gift] as const;

export function HeroRailMotion({ items, location }: HeroRailMotionProps) {
  const reduceMotion = false;

  return (
    <motion.div
      className="hero__experience-rail"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.48, delay: 0.88 }}
    >
      <div className="shell hero__experience-rail-inner">
        {items.map((item, index) => {
          const Icon = railIcons[index];

          return (
            <motion.div
              className="hero__experience-item"
              key={item}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.38,
                delay: reduceMotion ? 0 : 0.98 + index * 0.07,
              }}
            >
              <Icon aria-hidden="true" size={20} />
              <span>{item}</span>
            </motion.div>
          );
        })}
        <motion.div
          className="hero__experience-location"
          initial={reduceMotion ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: 1.22 }}
        >
          <MapPin aria-hidden="true" size={18} />
          <span>{location}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
