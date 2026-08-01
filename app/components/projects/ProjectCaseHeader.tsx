import type { PortfolioProject } from "../../data/projects";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";

export function ProjectCaseHeader({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const copy = getMessages(locale).projects.common;
  return (
    <>
      <header className="evidence-case-header">
        <div>
          <p className="kicker">
            CASE {project.id} / {project.category[locale]}
          </p>
          <div className="case-title-line">
            <h2>
              {project.title}
              <span>.</span>
            </h2>
            <b className="status-badge">● {project.status[locale]}</b>
          </div>
          <p className="case-summary">{project.summary[locale]}</p>
        </div>
      </header>
      <div className="executive-summary">
        <div>
          <span>{copy.role}</span>
          <b>{project.role[locale]}</b>
        </div>
        <div>
          <span>{copy.stack}</span>
          <b>{project.stack.join(" · ")}</b>
        </div>
        <div>
          <span>{copy.scope}</span>
          <b>{project.scope[locale]}</b>
        </div>
      </div>
    </>
  );
}
