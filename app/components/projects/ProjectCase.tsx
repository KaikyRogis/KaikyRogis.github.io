"use client";

import { ArrowDownRight } from "lucide-react";
import { useState } from "react";
import type { PortfolioProject } from "../../data/projects";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";
import { ImageLightbox } from "./ImageLightbox";
import { ProjectCaseHeader } from "./ProjectCaseHeader";
import { ProjectContribution } from "./ProjectContribution";
import { ProjectEvidence } from "./ProjectEvidence";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectStatus } from "./ProjectStatus";

export function ProjectCase({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const [primaryOpen, setPrimaryOpen] = useState<number | null>(null);
  const copy = getMessages(locale).projects.common;
  return (
    <section
      className={`case-study evidence-case evidence-${project.slug}`}
      id={project.slug}
      data-project-index={project.id}
    >
      <ProjectCaseHeader project={project} locale={locale} />
      <ProjectEvidence
        project={project}
        locale={locale}
        onOpen={() => setPrimaryOpen(0)}
      />
      <div className="problem-solution">
        <article>
          <span>{copy.problem}</span>
          <p>{project.problem[locale]}</p>
        </article>
        <ArrowDownRight />
        <article>
          <span>{copy.solution}</span>
          <p>{project.solution[locale]}</p>
        </article>
      </div>
      <ProjectContribution project={project} locale={locale} />
      <ProjectStatus
        locale={locale}
        implemented={project.implemented}
        developing={project.developing}
        roadmap={project.roadmap}
      />
      <ProjectGallery
        shots={project.screenshots}
        note={project.note[locale]}
        locale={locale}
        project={project.title}
      />
      {primaryOpen !== null && (
        <ImageLightbox
          shots={project.screenshots}
          index={primaryOpen}
          locale={locale}
          onClose={() => setPrimaryOpen(null)}
          onChange={setPrimaryOpen}
        />
      )}
    </section>
  );
}
