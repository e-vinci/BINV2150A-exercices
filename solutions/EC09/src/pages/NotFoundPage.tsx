import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <>
            <h1>Page introuvable</h1>
            <Link to="/movies">Retour aux films</Link>
        </>
    );
};

export default NotFoundPage;