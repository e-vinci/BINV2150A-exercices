import { Link, Outlet } from "react-router";
import type { User } from "../models/user";

interface LayoutProps {
  user: User | null;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout = ({ user, isLoggedIn, onLogout }: LayoutProps) => (
  <>
    <header>
      <Link to="/">Accueil</Link>
      <span className="spacer" />
      {isLoggedIn ? (
        <>
          <span>{user?.firstName}</span>
          <button onClick={onLogout}>Déconnexion</button>
        </>
      ) : (
        <>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      )}
    </header>
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
