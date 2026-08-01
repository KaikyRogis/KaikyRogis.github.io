import { ExternalLink } from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";

export function ProjectContribution({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const copy = getMessages(locale).projects.common;
  return (
    <section className="project-contribution">
      <span>{copy.contribution}</span>
      <p>{project.contribution[locale]}</p>
      {project.collaboration && (
        <div className="collaboration-card">
          <b>
            {locale === "pt" ? "PROJETO COLABORATIVO" : "COLLABORATIVE PROJECT"}
          </b>
          <div>
            <span>BACKEND E ARQUITETURA</span>
            <strong>{project.collaboration.backend[locale]}</strong>
          </div>
          <div>
            <span>FRONTEND</span>
            <strong>{project.collaboration.frontend[locale]}</strong>
          </div>
          <a href={project.collaboration.url} target="_blank" rel="noreferrer">
            {locale === "pt"
              ? "CONHEÇA A IMPLEMENTAÇÃO DO FRONTEND — HAUAN FELIPE"
              : "VIEW THE FRONTEND IMPLEMENTATION — HAUAN FELIPE"}{" "}
            <ExternalLink />
          </a>
        </div>
      )}
    </section>
  );
}
