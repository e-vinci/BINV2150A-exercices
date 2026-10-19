// src/App.tsx
import BoundedCounter from "./components/BoundedCounter";
import ThemeToggle from "./components/ThemeToggle";
import Vote from "./components/Vote";

const App = () => (
  <>
    <BoundedCounter />
    <ThemeToggle />
    <Vote />
  </>
);

export default App;