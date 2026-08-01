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
        const slug = group
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return (
          <article key={group} className={expanded ? "expanded" : ""}>
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`skills-${slug}`}
                onClick={() => setOpen(expanded ? "" : group)}
              >
                <span>{group}</span>
                <ChevronDown aria-hidden="true" />
              </button>
            </h3>
            <div
              id={`skills-${slug}`}
              className="skill-items"
              hidden={!expanded}
            >
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
