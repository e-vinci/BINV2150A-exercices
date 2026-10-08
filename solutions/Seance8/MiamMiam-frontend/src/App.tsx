import './App.css';
import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";

const App = () => {
  return (
    //exo5
    //Modification pour integrer les nouveaux components
    <PageLayout title="MiamMiam">
      <RecipeList />
    </PageLayout>
  );
};

export default App;