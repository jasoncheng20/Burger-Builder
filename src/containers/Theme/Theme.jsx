import React, { useContext } from "react";
import { themeStyles, ThemeContext } from "../../context/ThemeContext";

const Theme = () => {
  const { theme, toggleMode } = useContext(ThemeContext);

  let buttonText = theme === "light" ? "Dark": "Light";
  return (
    <div style={themeStyles[theme]}>
      <p>This is the {theme} theme!</p>
      <button onClick={toggleMode}>{buttonText} mode</button>
    </div>
  );
};

export default Theme;
