import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const { systemTheme, theme, setTheme: setNextTheme } = useNextTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return {
    toggleTheme: () => setNextTheme(isDark ? 'light' : 'dark'),
    setTheme: (newTheme: 'light' | 'dark') => setNextTheme(newTheme),
    isDark,
  }
}