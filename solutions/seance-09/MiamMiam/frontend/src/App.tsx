import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";
import miammiam from "./assets/miammiam.png";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Css } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: { main: "#e65100"},
  },
});

const App = () => {
  return (
    
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <img src={miammiam} alt="MiamMiam" />
    <PageLayout title="MiamMiam">
      <RecipeList />
    </PageLayout>
    </ThemeProvider>
    
  );
};

export default App;