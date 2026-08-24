"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { PointerEvent, useRef } from "react";
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
  const cardRef = useRef<HTMLElement>(null);
  const shot = project.screenshots[0];
  const copy = getMessages(locale).projects.rail;

  function updateDepth(event: PointerEvent<HTMLElement>) {
    const card = cardRef.current;
    if (!card || !window.matchMedia("(pointer: fine)").matches) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--card-x", `${Math.round(x * 100)}%`);
    card.style.setProperty("--card-y", `${Math.round(y * 100)}%`);
    card.style.setProperty("--card-rotate-x", `${(0.5 - y) * 3.5}deg`);
    card.style.setProperty("--card-rotate-y", `${(x - 0.5) * 4.5}deg`);
  }

  function resetDepth() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--card-x", "50%");
    card.style.setProperty("--card-y", "50%");
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
  }

  return (
    <article
      ref={cardRef}
      className="project-card"
      style={{ "--accent": project.accent } as React.CSSProperties}
      data-project-card={project.slug}
      data-accent={project.accent}
      onPointerMove={updateDepth}
      onPointerLeave={resetDepth}
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
