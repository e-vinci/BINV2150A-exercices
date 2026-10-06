import "./App.css";
import AuthorCard from "./components/AuthorCard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsletterCard from "./components/NewsletterCard";
import RecipeCard from "./components/RecipeCard";

function App() {
  return (
    <>
      <Header />
      <RecipeCard />
      <aside>
        <AuthorCard/>
        <NewsletterCard/>
      </aside>
      <Footer />
    </>
  );
}

export default App;
