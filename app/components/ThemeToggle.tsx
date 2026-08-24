"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "domainlert-theme";
const CHANGE_EVENT = "domainlert-theme-change";

type ThemeToggleProps = {
  compact?: boolean;
};

function getSystemTheme(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function resolveTheme(): ThemeMode {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return getSystemTheme();
}

function getInitialTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }

  const current = document.documentElement.dataset.theme;
  if (current === "dark" || current === "light") {
    return current;
  }

  return resolveTheme();
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }

      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      applyTheme(systemTheme);
    };

    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<ThemeMode>;
      const next = customEvent.detail;
      if (next !== "dark" && next !== "light") {
        return;
      }

      setTheme(next);
      applyTheme(next);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener(CHANGE_EVENT, handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener(CHANGE_EVENT, handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: nextTheme }));
  };

  const nextLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      className={`${styles.toggle} ${compact ? styles.compact : ""}`.trim()}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      title={`Switch to ${nextLabel.toLowerCase()} mode`}
    >
      <span aria-hidden="true" className={styles.icon}>
        {theme === "dark" ? "☀" : "◐"}
      </span>
      {!compact && <span className={styles.text}>{nextLabel}</span>}
    </button>
  );
}
