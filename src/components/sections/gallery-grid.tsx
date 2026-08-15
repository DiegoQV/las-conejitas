"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "/images/gallery/gallery-01.webp",
    alt: "Integrante de Las Conejitas frente a las geometrías iluminadas de Gran Regional",
    label: "Identidad Gran Regional",
    size: "feature",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/gallery/gallery-02.webp",
    alt: "Retrato de una integrante de Las Conejitas",
    label: "Presencia",
    size: "compact",
    width: 341,
    height: 464,
  },
  {
    src: "/images/gallery/gallery-03.webp",
    alt: "Integrante de Las Conejitas con vestido rojo",
    label: "Actitud",
    size: "tall",
    width: 444,
    height: 713,
  },
  {
    src: "/images/gallery/gallery-04.webp",
    alt: "Integrante de Las Conejitas con vestuario negro",
    label: "Personalidad",
    size: "wide",
    width: 348,
    height: 676,
  },
] as const;

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function GalleryGrid() {
  const reduceMotion = false;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gridVisible, setGridVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedTrigger = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const check = () => {
      const rect = gridRef.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight * 0.9 && rect.bottom > 0) setGridVisible(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [reduceMotion]);

  const closeLightbox = () => {
    setActiveIndex(null);
    window.setTimeout(() => lastFocusedTrigger.current?.focus(), 0);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => current === null ? null : (current + 1) % galleryImages.length);
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeButton.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex]);

  const showPrevious = () => setActiveIndex((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
  const showNext = () => setActiveIndex((current) => current === null ? null : (current + 1) % galleryImages.length);

  return (
    <>
      <div ref={gridRef} className="gallery__grid">
        {galleryImages.map((image, index) => (
          <motion.button
            className={`gallery__item gallery__item--${image.size}`}
            key={image.src}
            type="button"
            initial={reduceMotion ? { opacity: 0, filter: "blur(8px) saturate(0.65)", scale: 1.02 } : { opacity: 0, filter: "blur(32px) saturate(0.15) brightness(0.3)", clipPath: index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)", scale: 1.12 }}
            animate={gridVisible ? {
              opacity: [0, 0.18, 0.52, 0.82, 1],
              filter: [
                "blur(32px) saturate(0.15) brightness(0.3)",
                "blur(24px) saturate(0.35) brightness(0.48)",
                "blur(13px) saturate(0.7) brightness(0.68)",
                "blur(5px) saturate(0.92) brightness(0.9)",
                "blur(0px) saturate(1) brightness(1)",
              ],
              clipPath: [
                index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)",
                "inset(0 68% 0 0)",
                "inset(0 28% 0 0)",
                "inset(0 7% 0 0)",
                "inset(0 0 0 0)",
              ],
              scale: [1.12, 1.09, 1.055, 1.02, 1],
            } : undefined}
            transition={{ duration: reduceMotion ? 0.58 : 1.75, delay: index * (reduceMotion ? 0.08 : 0.22), times: [0, 0.2, 0.48, 0.76, 1], ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => {
              lastFocusedTrigger.current = event.currentTarget;
              setActiveIndex(index);
            }}
            aria-label={`Ampliar imagen: ${image.label}`}
          >
            <span className="gallery__image-wrap">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={index === 0 ? "(min-width: 900px) 42vw, 100vw" : "(min-width: 900px) 25vw, 50vw"}
                className="gallery__image"
              />
              <span className="gallery__shade" aria-hidden="true" />
            </span>
            <span className="gallery__caption"><i>{String(index + 1).padStart(2, "0")}</i>{image.label}</span>
            <Expand className="gallery__expand" size={17} aria-hidden="true" />
            <motion.span
              className="gallery__reveal-curtain"
              initial={reduceMotion ? { scaleY: 0.25, opacity: 0.25 } : { scaleY: 1 }}
              animate={gridVisible ? { scaleY: [1, 0.86, 0.42, 0], opacity: [1, 0.82, 0.38, 0] } : undefined}
              transition={{ duration: reduceMotion ? 0.45 : 1.45, delay: 0.08 + index * (reduceMotion ? 0.08 : 0.22), times: [0, 0.28, 0.68, 1], ease: [0.76, 0, 0.24, 1] }}
              aria-hidden="true"
            />
            <motion.span
              className="gallery__develop-flash"
              initial={reduceMotion ? false : { opacity: 0, x: "-120%" }}
              animate={gridVisible ? { opacity: [0, 0.7, 0], x: ["-120%", "0%", "120%"] } : undefined}
              transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.42 + index * 0.22, times: [0, 0.5, 1], ease: "easeInOut" }}
              aria-hidden="true"
            />
          </motion.button>
        ))}
      </div>

      {activeIndex !== null && (
        <div ref={dialogRef} className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Vista ampliada de la galería" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}>
          <button ref={closeButton} className="gallery-lightbox__close" type="button" onClick={closeLightbox} aria-label="Cerrar imagen">
            <X aria-hidden="true" />
          </button>
          <button className="gallery-lightbox__nav gallery-lightbox__nav--previous" type="button" onClick={showPrevious} aria-label="Imagen anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <figure
            className="gallery-lightbox__figure"
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
              if (Math.abs(distance) > 48) {
                if (distance > 0) showPrevious();
                else showNext();
              }
              touchStartX.current = null;
            }}
          >
            <Image
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].alt}
              width={galleryImages[activeIndex].width}
              height={galleryImages[activeIndex].height}
              sizes="90vw"
              className="gallery-lightbox__image"
              priority
            />
            <figcaption>{galleryImages[activeIndex].label} <span>{activeIndex + 1} / {galleryImages.length}</span><small>Desliza para explorar</small></figcaption>
          </figure>
          <button className="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" onClick={showNext} aria-label="Imagen siguiente">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
