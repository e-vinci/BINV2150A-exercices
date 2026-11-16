export interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string;
}

export const movies: Movie[] = [
    { id: 1, title: "Inception", year: 2010, genre: "Science-fiction" },
    { id: 2, title: "Amélie Poulain", year: 2001, genre: "Comédie" },
    { id: 3, title: "Le Parrain", year: 1972, genre: "Drame" },
    { id: 4, title: "Parasite", year: 2019, genre: "Thriller" },
    { id: 5, title: "Intouchables", year: 2011, genre: "Comédie" },
    { id: 6, title: "Alien", year: 1979, genre: "Horreur" },
];