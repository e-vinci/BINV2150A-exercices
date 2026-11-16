const AuthorCard = () => {
  return (
    <>
      <section className="author">
        <img
          src="https://i.pravatar.cc/128?img=47"
          alt="Photo d'Alice Dupont"
        />
        <div>
          <h3>Alice Dupont</h3>
          <p>
            Passionnée de cuisine française traditionnelle.
            <br />
            12 recettes publiées.
          </p>
          <a href="#">Voir ses recettes</a>
        </div>
      </section>
    </>
  );
};

export default AuthorCard;
