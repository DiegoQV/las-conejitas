import Image from "next/image";

import { contactConfig } from "@/data/site";

export function FloatingWhatsApp() {
  const phone = contactConfig.whatsapp.value;

  if (!phone) return null;

  const href = `https://wa.me/${phone.replace(/\D/g, "")}`;

  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      title="Consultar por WhatsApp"
    >
      <Image
        className="floating-whatsapp__icon"
        src="/icons-whatsapp.svg"
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
      />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
