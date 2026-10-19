import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Counter } from "./components/Counter";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Vote } from "./components/Vote";

function App() {
  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        mode: "light",
      },
    }),
  );
  const [isLight, setIsLight] = useState(true);

  const handleThemeDark = () => {
    setIsLight(false);
    setTheme(
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    );
  };

  const handleThemeLight = () => {
    setIsLight(true);
    setTheme(
      createTheme({
        palette: {
          mode: "light",
        },
      }),
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7,
          padding: 5,
        }}
      >
        <Typography variant="h3" component={"h1"} sx={{ textAlign: "center" }}>
          EC5
        </Typography>

        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Counter></Counter>
        </Container>

        <Container sx={{ display: "flex", justifyContent: "center" }}>
          {isLight ? (
            <Button variant="contained" onClick={handleThemeDark}>
              Dark mode
            </Button>
          ) : (
            <Button variant="contained" onClick={handleThemeLight}>
              Light mode
            </Button>
          )}
        </Container>

        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Vote />
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
