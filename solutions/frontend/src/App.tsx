import { RecipeList } from "./components/RecipeList";
import { PageLayout } from "./components/PageLayout";

const App = () => {
  return (
    <div className="app">
      <PageLayout title="MiamMiam">
        <RecipeList />
      </PageLayout>
    </div>
  );
};
export default App;


//questions 1-4 séance 08
{/* <h1>MiamMiam</h1>
      <RecipeCard 
        title="Pâtes carbonara"
        imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
        duration={20}
        difficulty={2}
      />
      <RecipeCard 
        title="Recette 2"
        description="a recipe ?"
        imageUrl="https://tse4.mm.bing.net/th/id/OIP.Hb_34BNtsnEhbA2wAmh0fQHaHY?r=0&pid=Api"
        duration={6}
        difficulty={1}
      /> */}