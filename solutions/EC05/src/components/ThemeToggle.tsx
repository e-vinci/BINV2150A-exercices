import { useState } from "react";

type Theme = "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const isDark = theme === "dark";

  return (
    <div
      style={{
        padding: 16,
        backgroundColor: isDark ? "#222" : "#fff",
        color: isDark ? "#fff" : "#222",
      }}
    >
      <h2>Thème</h2>
      <p>Thème actuel : {isDark ? "sombre" : "clair"}</p>
      <button onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}>
        Passer au thème {isDark ? "clair" : "sombre"}
      </button>
    </div>
  );
};

export default ThemeToggle;