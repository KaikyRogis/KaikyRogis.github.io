"use client";

import { MouseEvent, ReactNode, useRef } from "react";

export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (event: MouseEvent<HTMLSpanElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;
    ref.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.14}px, ${(event.clientY - rect.top - rect.height / 2) * 0.14}px)`;
  };
  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={move}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}
