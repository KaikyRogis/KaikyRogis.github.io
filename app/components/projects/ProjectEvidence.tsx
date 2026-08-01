import Image from "next/image";
import type { PortfolioProject } from "../../data/projects";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";

export function ProjectEvidence({
  project,
  locale,
  onOpen,
}: {
  project: PortfolioProject;
  locale: Locale;
  onOpen?: () => void;
}) {
  const copy = getMessages(locale).projects.common;
  const shot = project.screenshots[0];
  return (
    <section className="project-evidence">
      <div className="evidence-label">
        <span>{copy.evidence}</span>
        <b>{copy.demo}</b>
      </div>
      <button onClick={onOpen} data-cursor="VIEW">
        <Image
          src={shot.src}
          alt={shot.alt[locale]}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 720px) 94vw, 86vw"
          loading="lazy"
        />
        <span className="demo-watermark">{copy.demo}</span>
      </button>
    </section>
  );
}
