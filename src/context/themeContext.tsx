import { Theme, ThemeOption } from "@/utils/constants";
import { createContext, useContext } from "react";

export type ThemeContextType = {
  theme: Theme;
  themeOption: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
};
const ThemeContext = createContext({});
export default ThemeContext;

export const useThemeContext = () =>
  useContext(ThemeContext) as ThemeContextType;
