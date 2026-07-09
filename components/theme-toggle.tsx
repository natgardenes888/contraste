"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("contraste-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = saved ? saved === "dark" : prefersDark;
    setDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("contraste-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-graphite transition hover:bg-ink hover:text-white dark:border-white/10 dark:text-white/70 dark:hover:bg-white dark:hover:text-ink"
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
    >
      {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
