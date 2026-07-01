import { createContext, useContext, useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

//   Провайдер темы приложения.
//   По умолчанию используется темная тема.

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("testflow_theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function changeTheme(newTheme) {
    setTheme(newTheme);
  }

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  const value = {
    theme,
    setTheme: changeTheme,
    toggleTheme,
    isDarkTheme: theme === "dark",
    isLightTheme: theme === "light",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

//   Хук для удобного доступа к теме.

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme должен использоваться внутри ThemeProvider");
  }

  return context;
}
