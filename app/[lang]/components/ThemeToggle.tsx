"use client";

import { useEffect, useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "domainlert-theme";
const CHANGE_EVENT = "domainlert-theme-change";

type ThemeToggleProps = {
  compact?: boolean;
  labels: { light: string; dark: string };
  hints: { light: string; dark: string };
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

function subscribeToTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleThemeChange = () => callback();

  mediaQuery.addEventListener("change", handleThemeChange);
  window.addEventListener(CHANGE_EVENT, handleThemeChange);

  return () => {
    mediaQuery.removeEventListener("change", handleThemeChange);
    window.removeEventListener(CHANGE_EVENT, handleThemeChange);
  };
}

function getThemeSnapshot(): ThemeMode {
  return resolveTheme();
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

export function ThemeToggle({ compact = false, labels, hints }: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: nextTheme }));
  };

  const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
  const nextLabel = labels[nextTheme];
  const nextHint = hints[nextTheme];

  return (
    <button
      type="button"
      className={`${styles.toggle} ${compact ? styles.compact : ""}`.trim()}
      onClick={toggleTheme}
      aria-label={nextHint}
      title={nextHint}
    >
      <span aria-hidden="true" className={styles.icon}>
        {theme === "dark" ? "☀" : "◐"}
      </span>
      {!compact && <span className={styles.text}>{nextLabel}</span>}
    </button>
  );
}
