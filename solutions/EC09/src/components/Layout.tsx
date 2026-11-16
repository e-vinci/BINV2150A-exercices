import { Link, Outlet } from "react-router"

const Layout = () => {
    return (
        <>
            <nav style={{ display: "flex", gap: "1rem" }}>
                <Link to="/">Accueil</Link>
                <Link to="/movies">Films</Link>
                <Link to="/my-list">Ma liste</Link>
            </nav>

            <main>
                <Outlet />
            </main>

        </>
    )
};

export default Layout;