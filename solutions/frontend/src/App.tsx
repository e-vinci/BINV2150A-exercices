// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

import PageLayout from './components/PageLayout';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import {createTheme, CssBaseline, ThemeProvider } from "@mui/material"

const theme = createTheme({
  palette : {
    primary : { main : "#e65100"},
  },
})


const App = () => {
  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <PageLayout title="MiamMiam">
        <RecipeForm />
        <RecipeList/>
      </PageLayout>
    </ThemeProvider>
  );
};
export default App;







