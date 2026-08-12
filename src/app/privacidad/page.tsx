import Link from "next/link";

import { siteIdentity } from "@/data/site";

export const metadata = {
  title: `Política de privacidad | ${siteIdentity.name}`,
  description: `Política de privacidad de ${siteIdentity.name}.`,
};

const lastUpdated = "12 de agosto de 2026";

export default function PrivacyPage() {
  return (
    <main className="legal-page shell">
      <p className="eyebrow">{siteIdentity.name}</p>
      <h1>Política de privacidad</h1>
      <p className="legal-page__updated">Última actualización: {lastUpdated}</p>

      <section aria-labelledby="privacy-responsible">
        <h2 id="privacy-responsible">1. Responsable</h2>
        <p>
          El responsable del sitio es {siteIdentity.name} {siteIdentity.descriptor},
          con domicilio comercial en {siteIdentity.address}, {siteIdentity.city},
          {" "}{siteIdentity.region}, {siteIdentity.country}.
        </p>
        <p className="legal-page__notice">
          Antes de la publicación comercial debe incorporarse aquí la razón social,
          el número de RUC y el correo oficial para solicitudes de privacidad.
        </p>
      </section>

      <section aria-labelledby="privacy-scope">
        <h2 id="privacy-scope">2. Alcance y datos tratados</h2>
        <p>
          Este sitio es informativo. Actualmente no incluye formularios, cuentas de
          usuario, analítica, publicidad comportamental ni herramientas propias de
          seguimiento.
        </p>
        <p>
          La confirmación de mayoría de edad se guarda únicamente en el
          almacenamiento local del navegador mediante una clave técnica. El sitio no
          recibe ni almacena esa confirmación en un servidor.
        </p>
      </section>

      <section aria-labelledby="privacy-purposes">
        <h2 id="privacy-purposes">3. Finalidades</h2>
        <ul>
          <li>Mostrar el contenido del sitio y recordar la confirmación de edad en el navegador.</li>
          <li>Mantener la seguridad, disponibilidad y funcionamiento técnico del sitio.</li>
          <li>Atender consultas que la persona decida iniciar voluntariamente por WhatsApp.</li>
        </ul>
      </section>

      <section aria-labelledby="privacy-third-parties">
        <h2 id="privacy-third-parties">4. Servicios de terceros</h2>
        <p>
          Al seleccionar enlaces de WhatsApp, Google Maps u otros servicios externos,
          la persona abandona este sitio y queda sujeta a las políticas y condiciones
          del proveedor correspondiente. El sitio no controla el tratamiento que esos
          terceros realicen después de la redirección.
        </p>
      </section>

      <section aria-labelledby="privacy-retention">
        <h2 id="privacy-retention">5. Conservación y eliminación</h2>
        <p>
          La preferencia de edad permanece en el navegador hasta que la persona
          elimine los datos del sitio o utilice las herramientas de limpieza del
          navegador. No conservamos una base de datos propia de visitantes desde este
          sitio.
        </p>
      </section>

      <section aria-labelledby="privacy-rights">
        <h2 id="privacy-rights">6. Derechos de la persona</h2>
        <p>
          Conforme a la normativa peruana de protección de datos personales, puedes
          solicitar acceso, rectificación, cancelación u oposición respecto de datos
          personales que eventualmente tratemos. Las solicitudes deberán dirigirse
          al canal oficial que se publique en esta página, indicando el derecho que
          deseas ejercer y la información necesaria para atenderlo.
        </p>
        <p>
          Si consideras que tu solicitud no fue atendida, puedes acudir a la
          Autoridad Nacional de Protección de Datos Personales.
        </p>
      </section>

      <section aria-labelledby="privacy-changes">
        <h2 id="privacy-changes">7. Cambios</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios en el sitio, en los
          servicios utilizados o en la normativa aplicable. La versión vigente será
          la publicada en esta página junto con su fecha de actualización.
        </p>
      </section>

      <div className="legal-page__actions">
        <Link className="button button--secondary" href="/terminos">
          Ver términos y condiciones
        </Link>
        <Link className="button button--ghost" href="/">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
