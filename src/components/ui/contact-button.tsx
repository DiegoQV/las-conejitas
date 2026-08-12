import { MessageCircle } from "lucide-react";

import { contactConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  className?: string;
  compact?: boolean;
  label: string;
}

export function ContactButton({
  className,
  compact = false,
  label,
}: ContactButtonProps) {
  const phone = contactConfig.whatsapp;

  if (phone.status === "pending" || !phone.value) {
    return (
      <button
        type="button"
        className={cn("button button--primary", className)}
        disabled
        title="WhatsApp no disponible"
      >
        <MessageCircle aria-hidden="true" size={compact ? 17 : 19} />
        {!compact && <span>{label}</span>}
        {compact && <span className="sr-only">{label}</span>}
      </button>
    );
  }

  const href = `https://wa.me/${phone.value.replace(/\D/g, "")}`;

  return (
    <a
      className={cn("button button--primary", className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle aria-hidden="true" size={compact ? 17 : 19} />
      {!compact && <span>{label}</span>}
      {compact && <span className="sr-only">{label}</span>}
    </a>
  );
}
