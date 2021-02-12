import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const themeStyles = {
  light: {
    color: "#03dac5",
    backgroundColor: "#ffffff",
    highlight: "#fdb813",
  },
  dark: {
    color: "#bb86fc",
    backgroundColor: "#121212",
    highlight: "#ffffff",
  },
};

const ThemeContextProvider = (props) => {
  const [mode, setMode] = useState("light");
  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme: mode, toggleMode: toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
