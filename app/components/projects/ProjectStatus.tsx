import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";

export function ProjectStatus({
  locale,
  implemented,
  developing,
  roadmap,
}: {
  locale: Locale;
  implemented: string[];
  developing: string[];
  roadmap: string[];
}) {
  const copy = getMessages(locale).projects.common;
  const groups = [
    [copy.implemented, implemented],
    [copy.developing, developing],
    [copy.roadmap, roadmap],
  ] as const;
  return (
    <div className="project-status-grid">
      {groups
        .filter(([, items]) => items.length)
        .map(([title, items]) => (
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
