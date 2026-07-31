"use client";

import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Code2,
  Command,
  Copy,
  Download,
  GraduationCap,
  Layers3,
  Pause,
  Play,
} from "lucide-react";
import { useDialogFocus } from "../hooks/useDialogFocus";

type Action = {
  label: string;
  keywords: string;
  icon: React.ReactNode;
  run?: () => void;
  href?: string;
};

type CommandPaletteProps = {
  motionEnabled: boolean;
  onClose: () => void;
  onMotionToggle: () => void;
  onNavigate: (id: string) => void;
  onTerminalOpen: () => void;
};

export function CommandPalette({
  motionEnabled,
  onClose,
  onMotionToggle,
  onNavigate,
  onTerminalOpen,
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const close = useCallback(() => onClose(), [onClose]);
  useDialogFocus(true, dialogRef, close);

  const actions = useMemo<Action[]>(
    () => [
      {
        label: "Explorar projetos",
        keywords: "cases sistemas sintegra",
        icon: <Layers3 />,
        run: () => onNavigate("#projects"),
      },
      {
        label: "Ver experiência",
        keywords: "trabalho stage carreira",
        icon: <BriefcaseBusiness />,
        run: () => onNavigate("#experience"),
      },
      {
        label: "Abrir formação",
        keywords: "educação faculdade cursos",
        icon: <GraduationCap />,
        run: () => onNavigate("#education"),
      },
      {
        label: "Copiar e-mail",
        keywords: "contato email mensagem",
        icon: <Copy />,
        run: async () => {
          await navigator.clipboard.writeText("contato.kaikyrogis@gmail.com");
          onClose();
        },
      },
      {
        label: "Abrir terminal",
        keywords: "console comandos",
        icon: <Code2 />,
        run: () => {
          onClose();
          onTerminalOpen();
        },
      },
      {
        label: `${motionEnabled ? "Desativar" : "Ativar"} animações`,
        keywords: "movimento acessibilidade",
        icon: motionEnabled ? <Pause /> : <Play />,
        run: onMotionToggle,
      },
      {
        label: "Baixar currículo",
        keywords: "cv pdf download",
        icon: <Download />,
        href: "/curriculo-kaiky-rogis.pdf",
      },
    ],
    [motionEnabled, onClose, onMotionToggle, onNavigate, onTerminalOpen],
  );

  const filtered = actions.filter((action) =>
    `${action.label} ${action.keywords}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const safeSelected = Math.min(selected, Math.max(filtered.length - 1, 0));

  function execute(action?: Action) {
    if (!action) return;
    if (action.href) {
      const anchor = document.createElement("a");
      anchor.href = action.href;
      anchor.download = "";
      anchor.click();
      onClose();
    } else action.run?.();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((current) => Math.min(current + 1, filtered.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((current) => Math.max(current - 1, 0));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      execute(filtered[safeSelected]);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    execute(filtered[safeSelected]);
  }

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-title"
        initial={{ scale: 0.96, y: -15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: -15 }}
      >
        <form className="palette-top" onSubmit={submit}>
          <Command />
          <label className="sr-only" htmlFor="palette-search">
            Pesquisar ações
          </label>
          <input
            id="palette-search"
            data-autofocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Navegar pelo sistema…"
            aria-controls="palette-results"
            aria-activedescendant={
              filtered[safeSelected]
                ? `palette-action-${safeSelected}`
                : undefined
            }
          />
          <button type="button" onClick={onClose}>
            ESC
          </button>
        </form>
        <p id="palette-title">NAVEGAÇÃO E AÇÕES · USE ↑ ↓ E ENTER</p>
        <div
          id="palette-results"
          role="listbox"
          aria-label="Resultados da busca"
        >
          {filtered.map((action, index) => (
            <button
              id={`palette-action-${index}`}
              role="option"
              aria-selected={safeSelected === index}
              className={safeSelected === index ? "selected" : ""}
              key={action.label}
              onMouseEnter={() => setSelected(index)}
              onClick={() => execute(action)}
            >
              {action.icon}
              <span>{action.label}</span>
              <kbd>{String(index + 1).padStart(2, "0")}</kbd>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="palette-empty" aria-live="polite">
              Nenhuma ação encontrada.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
