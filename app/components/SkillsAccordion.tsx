"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function SkillsAccordion({
  groups,
}: {
  groups: Record<string, readonly string[]>;
}) {
  const [open, setOpen] = useState(Object.keys(groups)[0] ?? "");

  return (
    <div className="skill-grid">
      {Object.entries(groups).map(([group, items]) => {
        const expanded = open === group;
        return (
          <article key={group} className={expanded ? "expanded" : ""}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? "" : group)}
            >
              <h3>{group}</h3>
              <ChevronDown aria-hidden="true" />
            </button>
            <div className="skill-items">
              {items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
