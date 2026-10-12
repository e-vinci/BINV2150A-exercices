// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

import PageLayout from './components/PageLayout';
import RecipeList from './components/RecipeList';
import {createTheme, CssBaseline, ThemeProvider } from "@mui/material"

const theme = createTheme({
  palette : {
    primary : { main : "#e65100"},
  },
})


const App = () => {
return (
  

<PageLayout title="MiamMiam">
  <ThemeProvider theme = {theme}>
    <CssBaseline />
    <RecipeList/>
    
  </ThemeProvider>
  
</PageLayout>
  );
};
export default App;







