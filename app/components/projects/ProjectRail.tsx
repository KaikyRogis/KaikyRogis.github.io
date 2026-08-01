import type { RefObject } from "react";
import { ArrowDownRight } from "lucide-react";
import { projects } from "../../data/projects";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";
import { ProjectCard } from "./ProjectCard";

export function ProjectRail({
  locale,
  sectionRef,
  railRef,
  introRef,
  onNavigate,
}: {
  locale: Locale;
  sectionRef: RefObject<HTMLElement | null>;
  railRef: RefObject<HTMLDivElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  onNavigate: (id: string) => void;
}) {
  const copy = getMessages(locale).projects.rail;
  return (
    <section className="projects-cinema" id="projects" ref={sectionRef}>
      <div className="projects-mask" aria-hidden="true" />
      <div className="projects-intro" ref={introRef}>
        <p className="kicker">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>
          <span className="desktop-copy">{copy.description}</span>
          <span className="mobile-copy">{copy.mobileDescription}</span>
        </p>
      </div>
      <div className="project-rail" ref={railRef}>
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            onOpen={() => onNavigate(`#${project.slug}`)}
          />
        ))}
        <div className="rail-end">
          <span>04 / 04</span>
          <strong>{copy.end}</strong>
          <button onClick={() => onNavigate("#sintegrapro")}>
            {copy.continue}
            <ArrowDownRight />
          </button>
        </div>
      </div>
    </section>
  );
}
