import { pendingSections } from "@/data/site";

export function PendingSections() {
  return (
    <div className="pending-sections" aria-label="Próximas secciones">
      {pendingSections.filter((section) => !["conejitas", "experiencia", "esta-noche", "galeria", "ubicacion"].includes(section.id)).map((section) => (
        <section
          className="pending-section"
          id={section.id}
          key={section.id}
          aria-labelledby={`${section.id}-title`}
        >
          <div className="shell pending-section__inner">
            <p className="eyebrow">Próximo sprint</p>
            <h2 id={`${section.id}-title`}>{section.label}</h2>
          </div>
        </section>
      ))}
    </div>
  );
}
