"use client";

import { memo, useEffect, useRef } from "react";

export const CustomCursor = memo(function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: -80, y: -80 });

  useEffect(() => {
    const render = () => {
      frameRef.current = null;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }
    };
    const move = (event: PointerEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null)
        frameRef.current = requestAnimationFrame(render);
    };
    const over = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !labelRef.current) return;
      const interactive = event.target.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      labelRef.current.textContent = interactive?.dataset.cursor ?? "";
      cursorRef.current?.classList.toggle(
        "is-interactive",
        Boolean(interactive),
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
});
