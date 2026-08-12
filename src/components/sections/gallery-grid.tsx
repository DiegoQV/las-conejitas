"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedTrigger = useRef<HTMLButtonElement | null>(null);

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
      <div className="gallery__grid">
        {galleryImages.map((image, index) => (
          <button
            className={`gallery__item gallery__item--${image.size}`}
            key={image.src}
            type="button"
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
          </button>
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
          <figure className="gallery-lightbox__figure">
            <Image
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].alt}
              width={galleryImages[activeIndex].width}
              height={galleryImages[activeIndex].height}
              sizes="90vw"
              className="gallery-lightbox__image"
              priority
            />
            <figcaption>{galleryImages[activeIndex].label} <span>{activeIndex + 1} / {galleryImages.length}</span></figcaption>
          </figure>
          <button className="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" onClick={showNext} aria-label="Imagen siguiente">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
