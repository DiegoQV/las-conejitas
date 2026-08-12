import Link from "next/link";

import { siteIdentity } from "@/data/site";
import { contactConfig, navigation } from "@/data/site";
import { Brand } from "@/components/ui/brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <Brand />
          <p>Una experiencia nocturna diferente en Chachapoyas.</p>
          <span className="site-footer__age">+{siteIdentity.minimumAge} · Solo para mayores de edad</span>
        </div>
        <nav className="site-footer__nav" aria-label="Navegación del pie de página">
          <strong>Explora</strong>
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="site-footer__contact">
          <strong>Encuéntranos</strong>
          <address>{siteIdentity.address}</address>
          {contactConfig.mapsUrl.value ? <a href={contactConfig.mapsUrl.value} target="_blank" rel="noopener noreferrer">Cómo llegar ↗</a> : <span>Punto de ubicación pendiente</span>}
        </div>
        <div className="site-footer__legal">
          <Link href="/privacidad">Política de privacidad</Link>
          <Link href="/terminos">Términos y condiciones</Link>
          <span>© {new Date().getFullYear()} {siteIdentity.name}</span>
        </div>
        <div className="site-footer__socials" aria-label="Redes sociales">
          <span>Redes sociales · Pendiente de confirmación</span>
        </div>
      </div>
    </footer>
  );
}
