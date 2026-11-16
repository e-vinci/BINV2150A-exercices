import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <div className="layout">
        <Recipe />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
};

export default App;