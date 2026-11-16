export const SideBar = () =>{
    return(
        <aside className="sidebar">
        <section className="author">
            <img src="https://i.pravatar.cc/128?img=47" alt="Photo d'Alice Dupont" />
            <div>
            <h3>Alice Dupont</h3>
            <p>Passionnée de cuisine française traditionnelle.<br />12 recettes publiées.</p>
            <a href="#">Voir ses recettes</a>
            </div>
        </section>

        <section className="newsletter">
            <h3>Newsletter</h3>
            <p>Une nouvelle recette chaque semaine dans votre boîte mail.</p>
            <form>
                <label htmlFor="email">Votre adresse e-mail</label>
                <input type="email" id="email" name="email" placeholder="vous@exemple.be" />
                <button type="button">Je m'abonne</button>
            </form>
            <p style={{fontSize: "0.8rem", color: "#777"}}>Pas de spam, désabonnement en un clic.</p>
        </section>
    </aside>
    );


};