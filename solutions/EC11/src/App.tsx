import { Button, Checkbox, createTheme, CssBaseline, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { loadTasks, loadTextLibre, loadTheme, saveTasks, saveTextLibre, saveTheme } from "./storage/storage";

export interface Tache {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  
  const [nbrClick, setNbrClick] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">(() => loadTheme());
  const [taches, setTaches] = useState<Tache[]>(() => loadTasks());
  const [texteTache, setTexteTache] = useState("");
  const [texteLibre, setTextLibre] = useState(() => loadTextLibre());

  const themeComplet = createTheme({ palette: { mode: theme } });

  useEffect(() => {
    document.title = `${nbrClick} clics`;
  },[nbrClick]);

  useEffect(() => {
    saveTheme(theme);
  },[theme]);

  useEffect(() => {
    saveTasks(taches);
  }, [taches]);

  useEffect(() => {
    saveTextLibre(texteLibre);
  }, [texteLibre]);

  const handleClick = () => {
    setNbrClick((prev) => prev + 1);
  };

  const handleTheme = () => {
    if(theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const addTask = () => {
    if (texteTache.trim() === "") return;
    const newTask = {id: Date.now(), text: texteTache, done: false }
    setTaches((prev) => [
      ...prev, 
      newTask
    ]);
    setTexteTache("");
  };

  const deleteTask = (id: number) => {
    setTaches((prev) => 
      prev.filter((p) => p.id !== id));
  };

  const toggle = (id: number) => {
    setTaches((prev) => 
      prev.map((p) => p.id === id ? {...p, done: !p.done} : p));
  };

  return (
    <ThemeProvider theme={themeComplet}>
      <CssBaseline />

      <Stack spacing={3} sx={{ maxWidth: 600, mx: "auto", p: 3 }}>

        <Typography variant="h4">
          EC11 - Stockage web
        </Typography>

        <Typography variant="h6">Compteur de clics</Typography>

        <Typography>Nombre de clics : {nbrClick}</Typography>

        <Button variant="contained" onClick={handleClick}>
          Cliquer !
        </Button>

        <Stack direction="row" >
          <Typography>Mode sombre</Typography>
          <Switch checked={theme === "dark"} onChange={handleTheme} />
        </Stack>

        <Typography variant="h6">Liste de tâches</Typography>

        <TextField
          label="Nouvelle tâche"
          value={texteTache}
          onChange={(event) => setTexteTache(event.target.value)}
        />

        <Button variant="contained" onClick={addTask}>
          Ajouter une tâche
        </Button>

        {taches.map((t) => (
          <Stack key={t.id} direction="row" spacing={2}>
            <Checkbox checked={t.done} onChange={() => toggle(t.id)} />

            <Typography sx={{ flex: 1, textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </Typography>

            <Button color="error" onClick={() => deleteTask(t.id)}>
              Supprimer
            </Button>
          </Stack>
        ))}

        <Typography variant="h6">Bloc-notes</Typography>

        <TextField
          label="Texte libre"
          value={texteLibre}
          multiline
          minRows={4}
          onChange={(event) => setTextLibre(event.target.value)}
        />

      </Stack>
    </ThemeProvider>
  );
}

export default App;
