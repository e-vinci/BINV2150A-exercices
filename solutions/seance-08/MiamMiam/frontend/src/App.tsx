import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";

const App = () =>{
  return (
    <div className="app">
      <PageLayout title="MiamMiam">
        <RecipeList/>
      </PageLayout>
    </div>
  );
};

export default App;