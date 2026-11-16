import AuthorCard from "./AuthorCard";
import Newsletter from "./NewsLetter";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <AuthorCard />
      <Newsletter />
    </aside>
  );
};

export default Sidebar;