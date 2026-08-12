"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";

import { ageGateContent, siteIdentity } from "@/data/site";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { Brand } from "@/components/ui/brand";

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const ageConfirmationEvent = "gran-regional-age-confirmation";
let sessionConfirmed = false;

function subscribeToAgeConfirmation(callback: () => void) {
  window.addEventListener(ageConfirmationEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(ageConfirmationEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getAgeConfirmationSnapshot() {
  try {
    return (
      sessionConfirmed ||
      localStorage.getItem(ageGateContent.storageKey) === "true"
    );
  } catch {
    return sessionConfirmed;
  }
}

export function AgeGate() {
  const isConfirmed = useSyncExternalStore(
    subscribeToAgeConfirmation,
    getAgeConfirmationSnapshot,
    () => false,
  );
  const isOpen = !isConfirmed;
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) confirmRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function confirmAge() {
    sessionConfirmed = true;
    try {
      localStorage.setItem(ageGateContent.storageKey, "true");
    } catch {
      // Access is still granted for the current page view.
    }
    window.dispatchEvent(new Event(ageConfirmationEvent));
  }

  if (!isOpen) return null;

  return (
    <div className="age-gate" role="presentation">
      <div
        ref={dialogRef}
        className="age-gate__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-description"
      >
        <div className="age-gate__glow" aria-hidden="true" />
        <Brand />
        <div className="age-gate__icon" aria-hidden="true">
          <ShieldCheck size={22} />
          <span>+{siteIdentity.minimumAge}</span>
        </div>
        <h2 id="age-gate-title">{ageGateContent.title}</h2>
        <p id="age-gate-description">{ageGateContent.description}</p>
        <div className="age-gate__actions">
          <button
            ref={confirmRef}
            type="button"
            className="button button--primary button--wide"
            onClick={confirmAge}
          >
            {ageGateContent.confirmLabel}
            <ArrowRight aria-hidden="true" size={18} />
          </button>
          <a
            className="button button--ghost button--wide"
            href={ageGateContent.exitUrl}
          >
            {ageGateContent.exitLabel}
          </a>
        </div>
        <p className="age-gate__notice">
          {ageGateContent.responsibilityNotice}
        </p>
        <Link className="text-link" href={ageGateContent.privacyHref}>
          Política de privacidad
        </Link>
      </div>
    </div>
  );
}
