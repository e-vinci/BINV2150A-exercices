import PageLayout from "./components/PageLayout";
import RecipeList from "./components/RecipeList";

const App = () => {
  return (
    <PageLayout title="MiamMiam">
      <RecipeList />
    </PageLayout>
  );
};

export default App;