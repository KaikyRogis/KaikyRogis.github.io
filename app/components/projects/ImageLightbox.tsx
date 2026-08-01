"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDialogFocus } from "../../hooks/useDialogFocus";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";
import type { ProjectShot } from "../../data/projects";

type Props = {
  shots: ProjectShot[];
  index: number;
  locale: Locale;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function ImageLightbox({
  shots,
  index,
  locale,
  onClose,
  onChange,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef<number | null>(null);
  const copy = getMessages(locale).projects.common;
  useDialogFocus(true, dialogRef, onClose);

  const move = useCallback(
    (delta: number) => {
      setZoom(1);
      onChange((index + delta + shots.length) % shots.length);
    },
    [index, onChange, shots.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  const shot = shots[index];
  return (
    <div
      className="lightbox-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="image-lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        ref={dialogRef}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > 55) move(distance > 0 ? -1 : 1);
          touchStart.current = null;
        }}
      >
        <header>
          <div>
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(shots.length).padStart(2, "0")}
            </span>
            <strong id="lightbox-title">{shot.caption[locale]}</strong>
          </div>
          <div className="lightbox-tools">
            <button
              onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
              aria-label={copy.zoomOut}
            >
              <Minus />
            </button>
            <button
              onClick={() => setZoom((value) => Math.min(2.5, value + 0.25))}
              aria-label={copy.zoomIn}
            >
              <Plus />
            </button>
            <button onClick={onClose} aria-label={copy.close}>
              <X />
            </button>
          </div>
        </header>
        <div className="lightbox-stage">
          <button
            className="lightbox-arrow previous"
            onClick={() => move(-1)}
            aria-label={copy.previous}
          >
            <ChevronLeft />
          </button>
          <div className="lightbox-image-scroll">
            <Image
              src={shot.src}
              alt={shot.alt[locale]}
              width={shot.width}
              height={shot.height}
              priority
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
          <button
            className="lightbox-arrow next"
            onClick={() => move(1)}
            aria-label={copy.next}
          >
            <ChevronRight />
          </button>
        </div>
        <footer>
          <p>{shot.caption[locale]}</p>
          <span>{copy.demo}</span>
        </footer>
      </div>
    </div>
  );
}
