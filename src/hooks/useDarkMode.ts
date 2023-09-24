import { geThemeFromHTMLElement, getSystemTheme } from "@/utils/common";
import { LOCAL_STORAGE_KEYS } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

const { THEME } = LOCAL_STORAGE_KEYS;

type Theme = "dark" | "light";

let element: HTMLElement;
let initialTheme: Theme;
let initialIsDark: boolean;
let systemTheme: Theme;
let preferedTheme: Theme | null;
let applyTheme: (isDark: boolean) => void;
let storageValueChanged: (e: StorageEvent) => boolean;

if (typeof window !== "undefined") {
  element = document.querySelector("html")!;

  preferedTheme = geThemeFromHTMLElement(element);
  systemTheme = getSystemTheme();
  initialTheme = preferedTheme || "light";
  initialIsDark = initialTheme === "dark";

  applyTheme = (isDark: boolean) => {
    element.classList.toggle("dark", isDark);
    element.classList.toggle("light", !isDark);
    localStorage.setItem(THEME, isDark ? "dark" : "light");
    document.cookie = `theme=${isDark ? "dark" : "light"}; path=/`;
  };
  storageValueChanged = (e: StorageEvent) => {
    return e.key === THEME && e.oldValue !== e.newValue;
  };
}

export function useDarkMode(initialTheme: Theme): [boolean, Function] {
  const [dark, setDark] = useState(initialTheme === "dark" || initialIsDark);

  const setDarkMode = (isDark: boolean) => {
    applyTheme(isDark);
    setDark(isDark);
  };

  const toggleDarkMode = () => setDarkMode(!dark);

  const storageHandler = useCallback((e: StorageEvent) => {
    if (storageValueChanged(e)) setDarkMode(e.newValue === "dark");
  }, []);

  useEffect(() => {
    setDarkMode(initialIsDark);
    window.addEventListener("storage", storageHandler);

    return () => window.removeEventListener("storage", storageHandler);
  }, [storageHandler]);

  return [dark, toggleDarkMode];
}
