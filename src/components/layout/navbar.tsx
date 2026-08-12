"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { navigation, siteIdentity } from "@/data/site";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { cn } from "@/lib/utils";
import { Brand } from "@/components/ui/brand";
import { ContactButton } from "@/components/ui/contact-button";

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useScrollLock(isMenuOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuPanelRef.current) return;

      const focusable = Array.from(
        menuPanelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  }

  return (
    <header className={cn("site-header", isScrolled && "site-header--scrolled")}>
      <nav className="navbar shell" aria-label="Navegación principal">
        <Link className="navbar__brand" href="#inicio" aria-label="Ir al inicio">
          <Brand />
        </Link>

        <div className="navbar__desktop-links">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="navbar__actions">
          <span className="navbar__age">+{siteIdentity.minimumAge}</span>
          <ContactButton
            className="navbar__contact"
            compact
            label="Consultar por WhatsApp"
          />
          <button
            ref={menuButtonRef}
            className="navbar__menu-button"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="mobile-menu"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
        >
          <div ref={menuPanelRef} className="mobile-menu__panel">
            <div className="mobile-menu__header">
              <Brand />
              <button
                ref={closeButtonRef}
                type="button"
                className="navbar__menu-button"
                aria-label="Cerrar menú"
                onClick={closeMenu}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="mobile-menu__links">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mobile-menu__footer">
              <MessageCircle aria-hidden="true" size={18} />
              <span>Consultas y reservas por WhatsApp</span>
            </div>
          </div>
          <button
            className="mobile-menu__backdrop"
            type="button"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          />
        </div>
      )}
    </header>
  );
}
