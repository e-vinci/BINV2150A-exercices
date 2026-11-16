import { Link } from "react-router";
import { movies } from "../data/movies";

interface MyListPageProps {
    myListIds: number[];
}

const MyListPage = ({ myListIds }: MyListPageProps) => {
    const myMovies = movies.filter((movie) => myListIds.includes(movie.id));

    if (myMovies.length === 0) {
        return (
            <>
                <h1>Ma liste</h1>
                <p>Votre liste est vide.</p>
                <Link to="/movies">Découvrir les films</Link>
            </>
        );
    }
    
    return (
        <>
            <h1>Ma liste</h1>
            <ul>
                {myMovies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} ({movie.year}), {movie.genre}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MyListPage;