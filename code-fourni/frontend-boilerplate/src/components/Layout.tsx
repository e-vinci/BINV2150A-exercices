import { NavLink, Outlet } from "react-router";
import type { User } from "../models/user";

interface LayoutProps {
  user: User | null;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout = ({ user, isLoggedIn, onLogout }: LayoutProps) => (
  <>
    <header>
      <NavLink to="/" end>Accueil</NavLink>
      <span className="spacer" />
      {isLoggedIn ? (
        <>
          <span>{user?.firstName}</span>
          <button onClick={onLogout}>Déconnexion</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Connexion</NavLink>
          <NavLink to="/register">Inscription</NavLink>
        </>
      )}
    </header>
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
