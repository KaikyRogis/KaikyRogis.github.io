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
  const [selected, setSelected] = useState(1);
  const stageTrigger = useRef<HTMLButtonElement | null>(null);
  const copy = getMessages(locale).projects.common;
  const visibleShots = shots.slice(1);
  const selectedShot = shots[selected] ?? visibleShots[0];
  const close = () => {
    setActive(null);
    window.setTimeout(() => stageTrigger.current?.focus(), 0);
  };
  if (!selectedShot) return null;
  return (
    <section
      className="project-gallery"
      aria-label={`${copy.gallery} — ${project}`}
    >
      <div className="gallery-heading">
        <span>{copy.gallery}</span>
        <b>{String(visibleShots.length).padStart(2, "0")} CAPTURAS</b>
      </div>
      <div className="gallery-feature">
        <button
          ref={stageTrigger}
          className="gallery-feature-image"
          onClick={() => setActive(selected)}
          data-cursor="ZOOM"
          aria-label={`${copy.expand}: ${selectedShot.caption[locale]}`}
        >
          <Image
            src={selectedShot.src}
            alt={selectedShot.alt[locale]}
            width={selectedShot.width}
            height={selectedShot.height}
            sizes="(max-width: 720px) 100vw, 1180px"
            loading="lazy"
          />
          <span className="demo-watermark">{copy.demo}</span>
          <span className="expand-label">
            <Expand /> {copy.expand}
          </span>
        </button>
        <div className="gallery-feature-copy">
          <span>
            {String(selected + 1).padStart(2, "0")} /{" "}
            {String(shots.length).padStart(2, "0")}
          </span>
          <strong>{selectedShot.caption[locale]}</strong>
          <button onClick={() => setActive(selected)}>
            {copy.expand} <Expand />
          </button>
        </div>
      </div>
      <div className="gallery-filmstrip" aria-label={copy.gallery}>
        {visibleShots.map((shot, index) => {
          const lightboxIndex = index + 1;
          return (
            <button
              key={shot.src}
              className={selected === lightboxIndex ? "active" : ""}
              onClick={() => setSelected(lightboxIndex)}
              aria-pressed={selected === lightboxIndex}
              aria-label={`${String(lightboxIndex + 1).padStart(2, "0")}: ${shot.caption[locale]}`}
            >
              <span className="gallery-thumb-image">
                <Image
                  src={shot.src}
                  alt={shot.alt[locale]}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 720px) 78vw, 42vw"
                  loading="lazy"
                />
              </span>
              <span className="gallery-thumb-copy">
                <b>{String(lightboxIndex + 1).padStart(2, "0")}</b>
                <span>{shot.caption[locale]}</span>
              </span>
            </button>
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
