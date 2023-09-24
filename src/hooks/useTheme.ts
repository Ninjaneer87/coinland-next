import { geThemeFromHTMLElement, getSystemTheme } from "@/utils/common";
import {
  LOCAL_STORAGE_KEYS,
  THEMES,
  Theme,
  ThemeOption,
} from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

const { THEME, THEME_OPTION } = LOCAL_STORAGE_KEYS;
const isClient = typeof window !== "undefined";

let element: HTMLElement;
let extractedTheme: Theme;
let preferedTheme: Theme | null;
let applyTheme: (selectedTheme: ThemeOption) => Theme;
let storageValueChanged: (e: StorageEvent) => boolean;

if (isClient) {
  element = document.querySelector("html")!;

  preferedTheme = geThemeFromHTMLElement(element);
  extractedTheme = preferedTheme || "light";

  applyTheme = (selectedThemeOption: ThemeOption) => {
    let selectedTheme: Theme;
    const systemTheme = getSystemTheme();
    selectedTheme =
      selectedThemeOption === "system" ? systemTheme : selectedThemeOption;

    THEMES.forEach((theme) =>
      element.classList.toggle(theme, selectedTheme === theme)
    );

    localStorage.setItem(THEME, selectedTheme);
    localStorage.setItem(THEME_OPTION, selectedThemeOption);
    document.cookie = `${THEME}=${selectedTheme}; path=/`;
    document.cookie = `${THEME_OPTION}=${selectedThemeOption}; path=/`;

    return selectedTheme;
  };

  storageValueChanged = (e: StorageEvent) => {
    return (
      (e.key === THEME || e.key === THEME_OPTION) && e.oldValue !== e.newValue
    );
  };
}

type UseTheme = {
  theme: Theme;
  themeOption: ThemeOption;
  setTheme: (selectedThemeOption: ThemeOption) => void;
};

export function useTheme(
  serverTheme: Theme,
  serverThemeOption: ThemeOption
): UseTheme {
  const initialTheme = serverTheme || extractedTheme;
  const [theme, setTheme] = useState(serverTheme || initialTheme);
  const [themeOption, setThemeOption] =
    useState<ThemeOption>(serverThemeOption);

  const setSelectedTheme = (selectedThemeOption: ThemeOption) => {
    const selectedTheme = applyTheme(selectedThemeOption);
    setTheme(selectedTheme);
    setThemeOption(selectedThemeOption);
  };

  const storageHandler = useCallback((e: StorageEvent) => {
    if (storageValueChanged(e)) setSelectedTheme(e.newValue as ThemeOption);
  }, []);

  useEffect(() => {
    setSelectedTheme(serverThemeOption);
    window.addEventListener("storage", storageHandler);

    return () => window.removeEventListener("storage", storageHandler);
  }, [storageHandler, serverThemeOption]);

  return { theme, themeOption, setTheme: setSelectedTheme };
}
