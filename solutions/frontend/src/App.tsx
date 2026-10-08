// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import PageLayout from './components/PageLayout';

import RecipeList from './components/RecipeList';


const App = () => {
return (
<PageLayout title="MiamMiam">
  <RecipeList/>
</PageLayout>
  );
};
export default App;







