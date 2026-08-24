import Image from "next/image";
import { motion } from "motion/react";
import type { PortfolioProject } from "../../data/projects";
import type { Locale } from "../../i18n";
import { getMessages } from "../../messages";

export function ProjectEvidence({
  project,
  locale,
  motionEnabled,
  onOpen,
}: {
  project: PortfolioProject;
  locale: Locale;
  motionEnabled: boolean;
  onOpen?: () => void;
}) {
  const copy = getMessages(locale).projects.common;
  const shot = project.screenshots[0];
  return (
    <motion.section
      className="project-evidence"
      initial={
        motionEnabled
          ? { opacity: 0, y: 42, clipPath: "inset(9% 0 9% 0)" }
          : false
      }
      animate={
        motionEnabled
          ? undefined
          : { opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" }
      }
      whileInView={
        motionEnabled
          ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" }
          : undefined
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={
        motionEnabled
          ? { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0 }
      }
    >
      <div className="evidence-label">
        <span>{copy.evidence}</span>
        <b>{copy.demo}</b>
      </div>
      <button
        onClick={onOpen}
        data-cursor="VIEW"
        data-project-evidence={project.slug}
      >
        <Image
          src={shot.src}
          alt={shot.alt[locale]}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 720px) 94vw, 86vw"
          loading="lazy"
        />
        <span className="demo-watermark">{copy.demo}</span>
      </button>
    </motion.section>
  );
}
