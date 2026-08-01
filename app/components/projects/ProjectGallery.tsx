"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { useRef, useState } from "react";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";
import type { ProjectShot } from "../../data/projects";
import { ImageLightbox } from "./ImageLightbox";

export function ProjectGallery({
  shots,
  note,
  locale,
  project,
}: {
  shots: ProjectShot[];
  note: string;
  locale: Locale;
  project: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const copy = getMessages(locale).projects.common;
  const visibleShots = shots.slice(1);
  const close = () => {
    const index = active;
    setActive(null);
    window.setTimeout(
      () => index !== null && triggers.current[index]?.focus(),
      0,
    );
  };
  return (
    <section
      className="project-gallery"
      aria-label={`${copy.gallery} — ${project}`}
    >
      <div className="gallery-heading">
        <span>{copy.gallery}</span>
        <b>{String(visibleShots.length).padStart(2, "0")} CAPTURAS</b>
      </div>
      <div className="project-gallery-track">
        {visibleShots.map((shot, index) => {
          const lightboxIndex = index + 1;
          return (
            <figure key={shot.src} className="secondary">
              <button
                ref={(node) => {
                  triggers.current[lightboxIndex] = node;
                }}
                onClick={() => setActive(lightboxIndex)}
                data-cursor="ZOOM"
                aria-label={`${copy.expand}: ${shot.caption[locale]}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt[locale]}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 720px) 78vw, 42vw"
                  loading="lazy"
                />
                <span className="demo-watermark">{copy.demo}</span>
                <span className="expand-label">
                  <Expand /> {copy.expand}
                </span>
              </button>
              <figcaption>
                <span>
                  {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                  {String(shots.length).padStart(2, "0")}
                </span>
                {shot.caption[locale]}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <button className="open-gallery" onClick={() => setActive(0)}>
        {copy.openGallery}{" "}
        <span>01 / {String(shots.length).padStart(2, "0")}</span>
      </button>
      <p className="gallery-note">{note}</p>
      {active !== null && (
        <ImageLightbox
          shots={shots}
          index={active}
          locale={locale}
          onClose={close}
          onChange={setActive}
        />
      )}
    </section>
  );
}
