import Link from "next/link";

import { siteIdentity } from "@/data/site";

export const metadata = {
  title: `Términos y condiciones | ${siteIdentity.name}`,
  description: `Términos y condiciones de uso de ${siteIdentity.name}.`,
};

const lastUpdated = "12 de agosto de 2026";

export default function TermsPage() {
  return (
    <main className="legal-page shell">
      <p className="eyebrow">{siteIdentity.name}</p>
      <h1>Términos y condiciones</h1>
      <p className="legal-page__updated">Última actualización: {lastUpdated}</p>

      <section aria-labelledby="terms-acceptance">
        <h2 id="terms-acceptance">1. Aceptación</h2>
        <p>
          El acceso y uso de este sitio implica la lectura y aceptación de estos
          términos. Si no estás de acuerdo, debes dejar de utilizar el sitio.
        </p>
      </section>

      <section aria-labelledby="terms-purpose">
        <h2 id="terms-purpose">2. Finalidad del sitio</h2>
        <p>
          Este sitio presenta información institucional, ubicación, imágenes y
          canales de contacto de {siteIdentity.name} {siteIdentity.descriptor} en
          {" "}{siteIdentity.city}. La información puede cambiar sin aviso para
          reflejar la programación y disponibilidad real del establecimiento.
        </p>
      </section>

      <section aria-labelledby="terms-age">
        <h2 id="terms-age">3. Acceso exclusivo para mayores de edad</h2>
        <p>
          El contenido y la experiencia promocionada están dirigidos exclusivamente
          a personas de {siteIdentity.minimumAge} años o más. Al confirmar la edad,
          declaras que cumples ese requisito. El establecimiento puede solicitar un
          documento de identidad y negar el ingreso cuando corresponda.
        </p>
      </section>

      <section aria-labelledby="terms-content">
        <h2 id="terms-content">4. Contenido, promociones y disponibilidad</h2>
        <ul>
          <li>Las imágenes tienen finalidad ilustrativa y pueden no representar una noche específica.</li>
          <li>La programación, promociones, precios, horarios y disponibilidad están sujetos a confirmación.</li>
          <li>Las condiciones concretas de ingreso, consumos y promociones se informarán por los canales oficiales o en el local.</li>
          <li>Una consulta por WhatsApp no constituye una reserva ni garantiza disponibilidad, salvo confirmación expresa.</li>
        </ul>
      </section>

      <section aria-labelledby="terms-use">
        <h2 id="terms-use">5. Uso permitido</h2>
        <p>
          Te comprometes a utilizar el sitio de forma lícita, responsable y sin
          afectar su seguridad, disponibilidad o funcionamiento. Está prohibido
          intentar acceder sin autorización a sus sistemas, introducir código dañino,
          extraer contenido de forma automatizada o utilizar la marca para engañar a
          terceros.
        </p>
      </section>

      <section aria-labelledby="terms-property">
        <h2 id="terms-property">6. Propiedad intelectual</h2>
        <p>
          Los textos, signos distintivos, diseños, fotografías, videos y demás
          elementos del sitio pertenecen a sus respectivos titulares. No se permite
          reproducirlos, distribuirlos o modificarlos con fines comerciales sin
          autorización previa, salvo los usos permitidos por la ley.
        </p>
      </section>

      <section aria-labelledby="terms-links">
        <h2 id="terms-links">7. Enlaces externos</h2>
        <p>
          El sitio puede enlazar a WhatsApp, Google Maps y otras plataformas de
          terceros. Esos servicios tienen sus propios términos, políticas y
          disponibilidad; {siteIdentity.name} no controla sus contenidos ni sus
          prácticas posteriores a la redirección.
        </p>
      </section>

      <section aria-labelledby="terms-consumer">
        <h2 id="terms-consumer">8. Protección al consumidor</h2>
        <p>
          Nada en estos términos limita los derechos reconocidos por la legislación
          peruana de protección y defensa del consumidor. Los reclamos y solicitudes
          se atenderán mediante los canales oficiales del establecimiento y, cuando
          corresponda, a través del Libro de Reclamaciones.
        </p>
      </section>

      <section aria-labelledby="terms-changes">
        <h2 id="terms-changes">9. Cambios y ley aplicable</h2>
        <p>
          Estos términos pueden actualizarse cuando cambien el sitio, los servicios o
          la normativa aplicable. Se rigen por las leyes de la República del Perú,
          sin perjuicio de los derechos irrenunciables que correspondan a las
          personas consumidoras.
        </p>
      </section>

      <div className="legal-page__actions">
        <Link className="button button--secondary" href="/privacidad">
          Ver política de privacidad
        </Link>
        <Link className="button button--ghost" href="/">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
