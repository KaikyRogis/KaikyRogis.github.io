import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";

export type ProjectStatusGroup = readonly [string, string[]];

export function getProjectStatusGroups({
  implementedLabel,
  developingLabel,
  roadmapLabel,
  implemented,
  developing,
  roadmap,
}: {
  implementedLabel: string;
  developingLabel: string;
  roadmapLabel: string;
  implemented: string[];
  developing: string[];
  roadmap: string[];
}): ProjectStatusGroup[] {
  const groups: ProjectStatusGroup[] = [
    [implementedLabel, implemented],
    [developingLabel, developing],
    [roadmapLabel, roadmap],
  ];
  return groups.filter(([, items]) => items.length > 0);
}

export function ProjectStatus({
  locale,
  implemented,
  developing,
  roadmap,
  developingLabel,
}: {
  locale: Locale;
  implemented: string[];
  developing: string[];
  roadmap: string[];
  developingLabel?: string;
}) {
  const copy = getMessages(locale).projects.common;
  const groups = getProjectStatusGroups({
    implementedLabel: copy.implemented,
    developingLabel: developingLabel ?? copy.developing,
    roadmapLabel: copy.roadmap,
    implemented,
    developing,
    roadmap,
  });

  if (!groups.length) return null;

  return (
    <div className="project-status-grid" data-status-groups={groups.length}>
      {groups.map(([title, items]) => (
        <section key={title}>
          <span>{title}</span>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
