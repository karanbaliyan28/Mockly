import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme && ["dark", "light"].includes(savedTheme))
      setTheme(savedTheme);
    else if (prefersDark) setTheme("dark");
    else setTheme("light");
  }, []);
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
export { ThemeProvider, ThemeContext };
