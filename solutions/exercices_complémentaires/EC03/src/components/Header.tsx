const Header = () => {
  return (
    <>
      <header className="site-header">
        <h1>🍳 MiamMiam</h1>
        <nav>
          <ul>
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <a href="#" className="active">
                Recettes
              </a>
            </li>
            <li>
              <a href="#">Favoris</a>
            </li>
            <li>
              <a href="#">Connexion</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
