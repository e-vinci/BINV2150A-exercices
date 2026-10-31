import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";
import miammiam from "./assets/miammiam.png";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import RecipeDetail from "./components/RecipeDetail";
import RecipeForm from "./components/RecipeForm";
import { recipes } from "./data/recipes";

const theme = createTheme({
  palette: {
    primary: { main: "#e65100" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <img src={miammiam} alt="MiamMiam" />
      <PageLayout title="MiamMiam">
        <RecipeForm />
        <RecipeList />
        <RecipeDetail recipe={recipes[0]} />
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;