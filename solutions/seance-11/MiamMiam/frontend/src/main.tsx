import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// 5. Dans App.tsx , créez un thème avec l’orange #e65100 comme couleur principale, et ajoutez
// ThemeProvider et CssBaseline
const theme = createTheme({
  palette: {
    primary: { main: "#e65100" }, // orange MiamMiam
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
