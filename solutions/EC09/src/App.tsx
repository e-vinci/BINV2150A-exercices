import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MyListPage from "./pages/MyListPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    const [myListIds, setMyListIds] = useState<number[]>([]);

    const toggleMovie = (id: number) => {
        setMyListIds(
            myListIds.includes(id)
                ? myListIds.filter((movieId) => movieId !== id) // déjà dans la liste → on retire
                : [...myListIds, id]                            // sinon → on ajoute
        );
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage myListIds={myListIds} />} />
                    <Route
                        path="movies"
                        element={<MoviesPage myListIds={myListIds} toggleMovie={toggleMovie} />}
                    />
                    <Route path="my-list" element={<MyListPage myListIds={myListIds} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;