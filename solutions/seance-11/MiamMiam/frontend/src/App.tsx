import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import miammiam from "./assets/miammiam.png";
import { recipes } from "./data/recipes";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette : {
    primary : { main : "#e65100"}
  }
});
const App = () =>{
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <PageLayout title="MiamMiam">
          <img src={miammiam} alt="Bannière MiamMiam" />
          <RecipeList/>
          <RecipeDetail recipe={recipes[0]} />
        </PageLayout>
      </div>
      
    </ThemeProvider>
  );
};

export default App;