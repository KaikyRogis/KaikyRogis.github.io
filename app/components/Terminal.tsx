"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useDialogFocus } from "../hooks/useDialogFocus";
import { Localized } from "../i18n";

const help = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
  "open sintegrapro",
  "open ominisafety",
  "system-status",
  "whoami",
  "sudo hire-kaiky",
  "coffee",
  "fred",
  "retro",
  "clear",
];

type TerminalProps = {
  onClose: () => void;
  onNavigate: (id: string) => void;
  onRetroToggle: () => void;
  onBeep: () => void;
};

export function Terminal({
  onClose,
  onNavigate,
  onRetroToggle,
  onBeep,
}: TerminalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Kaiky.OS 2.4 — digite “help” para listar os comandos.",
  ]);
  const close = useCallback(() => onClose(), [onClose]);
  useDialogFocus(true, dialogRef, close);

  function run(event: FormEvent) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;
    if (value === "clear") setHistory([]);
    else {
      const responses: Record<string, string> = {
        help: help.join(" · "),
        about:
          "Kaiky Rogis — desenvolvedor, problem solver e entusiasta de sistemas.",
        experience:
          "Stage Sistemas · Analista de Suporte e Sistemas · setembro/2024 — presente.",
        projects:
          "SintegraPro · OminiSafety · Finance OS · OmniChat · Kaiky Labs.",
        skills:
          "TypeScript · Next.js · NestJS · PostgreSQL · automação · suporte técnico avançado.",
        education:
          "Ciência da Computação — UNILESTE · conclusão prevista: dez/2026.",
        contact: "contato.kaikyrogis@gmail.com · LinkedIn · GitHub.",
        whoami:
          "Kaiky Rogis\nDeveloper, problem solver and systems enthusiast.\nCurrently building tools that turn complex operations into clear experiences.",
        "system-status":
          "All systems operational.\nPortfolio version 2.4 · GitHub Pages online.",
        "sudo hire-kaiky":
          "Permissão concedida. Canal de contato desbloqueado.",
        coffee: "☕ Café convertido em sistemas. Operação estável.",
        fred: "🐾 Fred detectado. Border Collie · Chief Focus Officer.",
        retro: "Modo secreto alternado. Bem-vindo ao terminal de 1984.",
      };
      if (value === "open sintegrapro") {
        window.open(
          "https://github.com/KaikyRogis/SintegraPro-Showcase",
          "_blank",
          "noopener,noreferrer",
        );
        responses[value] = "Abrindo o showcase público do SintegraPro…";
      }
      if (value === "open ominisafety") {
        onNavigate("#ominisafety");
        responses[value] = "Navegando para OminiSafety…";
      }
      if (value === "sudo hire-kaiky") onNavigate("#contact");
      if (value === "retro") onRetroToggle();
      setHistory((old) => [
        ...old,
        `> ${command}`,
        responses[value] ?? `Comando não encontrado: ${command}. Tente “help”.`,
      ]);
    }
    setCommand("");
    onBeep();
  }

  return (
    <Localized>
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) =>
          event.target === event.currentTarget && onClose()
        }
      >
        <motion.div
          ref={dialogRef}
          className="terminal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminal-title"
          initial={{ scale: 0.96, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 20 }}
        >
          <div className="terminal-bar">
            <span>● ● ●</span>
            <b id="terminal-title">KAIKY.OS / TERMINAL</b>
            <button onClick={onClose} aria-label="Fechar terminal">
              <X />
            </button>
          </div>
          <div
            className="terminal-output"
            aria-live="polite"
            aria-atomic="false"
          >
            {history.map((line, index) => (
              <pre key={`${line}-${index}`}>{line}</pre>
            ))}
          </div>
          <form onSubmit={run}>
            <label htmlFor="command">visitor@kaiky.os:~$</label>
            <input
              id="command"
              data-autofocus
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              autoComplete="off"
              aria-label="Comando do terminal"
            />
            <button type="submit" aria-label="Executar comando">
              <ArrowUpRight />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </Localized>
  );
}
