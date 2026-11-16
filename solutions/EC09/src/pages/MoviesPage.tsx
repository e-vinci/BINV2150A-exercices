import { movies } from "../data/movies";

interface MoviesPageProps {
    myListIds: number[];
    toggleMovie: (id: number) => void;
}

const MoviesPage = ({ myListIds, toggleMovie }: MoviesPageProps) => {
    return (
        <>
            <h1>Films</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} ({movie.year}), {movie.genre}{" "}
                        <button onClick={() => toggleMovie(movie.id)}>
                            {myListIds.includes(movie.id)
                                ? "Retirer de ma liste"
                                : "Ajouter à ma liste"}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MoviesPage;