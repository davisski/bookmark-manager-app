import { createContext, useContext, useEffect, useState } from "react";


interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: (theme: 'light' | 'dark') => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") setTheme(saved);
    }
  }, []);

  const toggleTheme = (theme: 'light' | 'dark') => {
    setTheme(theme);
    window.localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}