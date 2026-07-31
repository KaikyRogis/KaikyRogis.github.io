"use client";

import { AnimatePresence, motion } from "motion/react";
import { Command, Menu, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

export type PortfolioMode = "professional" | "experience";

const navigation = [
  ["#about", "Sobre"],
  ["#capabilities", "Capacidades"],
  ["#projects", "Projetos"],
  ["#experience", "Trajetória"],
  ["#education", "Formação"],
  ["#contact", "Contato"],
];

type HeaderProps = {
  menuOpen: boolean;
  mode: PortfolioMode;
  motionEnabled: boolean;
  soundEnabled: boolean;
  onNavigate: (id: string) => void;
  onMenuToggle: () => void;
  onModeToggle: () => void;
  onMotionToggle: () => void;
  onPaletteOpen: () => void;
  onSoundToggle: () => void;
};

export function Header(props: HeaderProps) {
  const {
    menuOpen,
    mode,
    motionEnabled,
    soundEnabled,
    onNavigate,
    onMenuToggle,
    onModeToggle,
    onMotionToggle,
    onPaletteOpen,
    onSoundToggle,
  } = props;

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Kaiky Rogis — início">
          <span>KR</span>
          <b>KAIKY.ROGIS</b>
        </a>
        <nav aria-label="Navegação principal">
          {navigation.map(([id, label]) => (
            <button key={id} onClick={() => onNavigate(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="mode"
            onClick={onModeToggle}
            aria-pressed={mode === "professional"}
            aria-label="Alternar modo de visualização"
          >
            <i />
            {mode === "experience" ? "EXPERIÊNCIA" : "PROFISSIONAL"}
          </button>
          <button
            className="key"
            onClick={onPaletteOpen}
            aria-label="Abrir central de comandos"
          >
            <Command size={13} /> K
          </button>
          <button
            className="menu-button"
            onClick={onMenuToggle}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <nav aria-label="Navegação móvel">
              {navigation.map(([id, label], index) => (
                <button key={id} onClick={() => onNavigate(id)}>
                  {String(index + 1).padStart(2, "0")} / {label}
                </button>
              ))}
            </nav>
            <div
              className="mobile-controls"
              aria-label="Controles da experiência"
            >
              <button
                onClick={onModeToggle}
                aria-pressed={mode === "professional"}
              >
                {mode === "experience"
                  ? "Alternar para modo Profissional"
                  : "Alternar para modo Experiência"}
              </button>
              <button onClick={onPaletteOpen}>
                <Command /> Abrir central de comandos
              </button>
              <button onClick={onMotionToggle} aria-pressed={!motionEnabled}>
                {motionEnabled ? <Pause /> : <Play />}{" "}
                {motionEnabled ? "Desativar animações" : "Ativar animações"}
              </button>
              <button onClick={onSoundToggle} aria-pressed={soundEnabled}>
                {soundEnabled ? <Volume2 /> : <VolumeX />}{" "}
                {soundEnabled ? "Desativar sons" : "Ativar sons"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
