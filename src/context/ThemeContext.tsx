import { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@/src/constants/Colors";

type ColorTokens = typeof Colors.light;

interface ThemeContextValue {
  colors: ColorTokens;
  setColors: (overrides: Partial<ColorTokens>) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: Colors.light,
  setColors: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme() ?? "light";
  const [overrides, setOverrides] = useState<Partial<ColorTokens>>({});

  function setColors(newOverrides: Partial<ColorTokens>) {
    setOverrides((prev) => ({ ...prev, ...newOverrides }));
  }

  const colors = { ...Colors[scheme], ...overrides };

  return (
    <ThemeContext.Provider value={{ colors, setColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
