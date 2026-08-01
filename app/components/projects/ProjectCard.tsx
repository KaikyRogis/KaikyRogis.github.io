import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";

export function ProjectCard({
  project,
  locale,
  onOpen,
}: {
  project: PortfolioProject;
  locale: Locale;
  onOpen: () => void;
}) {
  const shot = project.screenshots[0];
  const copy = getMessages(locale).projects.rail;
  return (
    <article
      className="project-card"
      style={{ "--accent": project.accent } as React.CSSProperties}
      data-project-card
    >
      <div className="project-card-top">
        <span>{project.id}</span>
        <b>● {project.status[locale]}</b>
      </div>
      <div className="project-card-evidence">
        <Image
          src={shot.src}
          alt={shot.alt[locale]}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 720px) 88vw, 560px"
          loading="lazy"
        />
        <span>{getMessages(locale).projects.common.demo}</span>
      </div>
      <p className="kicker">{project.category[locale]}</p>
      <h3>{project.title}</h3>
      <p>{project.summary[locale]}</p>
      <div className="tags">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <button onClick={onOpen} data-cursor="OPEN">
        {copy.open} <ArrowDownRight />
      </button>
    </article>
  );
}
