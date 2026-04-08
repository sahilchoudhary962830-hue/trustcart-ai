import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("trustcart_theme", theme);
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("trustcart_theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const useTheme = create<ThemeStore>((set) => {
  const initial = getInitialTheme();
  applyTheme(initial);

  return {
    theme: initial,

    toggle: () =>
      set((state) => {
        const next: Theme = state.theme === "dark" ? "light" : "dark";
        applyTheme(next);
        return { theme: next };
      }),

    setTheme: (theme) => {
      applyTheme(theme);
      set({ theme });
    },
  };
});
