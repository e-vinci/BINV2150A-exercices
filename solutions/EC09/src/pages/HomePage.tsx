interface HomePageProps {
    myListIds: number[];
}

const HomePage = ({ myListIds }: HomePageProps) => {
    return (
        <>
            <h1>Bienvenue au ciné-club</h1>
            <p>Films dans « Ma liste » : {myListIds.length}</p>
        </>
    );
};

export default HomePage;