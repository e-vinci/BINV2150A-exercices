import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#e67300" },
  },
});

const App = () => {
  return (
    <PageLayout title="MiamMiam">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecipeList />
      </ThemeProvider>
    </PageLayout>
  );
};

export default App;
