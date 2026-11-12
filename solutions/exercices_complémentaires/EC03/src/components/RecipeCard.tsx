const RecipeCard = () => {
    return (
        <article className="recipe">
      <h2>Boeuf bourguignon</h2>
      <p className="subtitle">Le classique du dimanche, qui mijote longtemps.</p>

      <button className="favorite-btn">🤍 Ajouter aux favoris</button>

      <dl className="meta">
        <div>
          <dt>Préparation</dt>
          <dd>30 min</dd>
        </div>
        <div>
          <dt>Cuisson</dt>
          <dd>3 h</dd>
        </div>
        <div>
          <dt>Portions</dt>
          <dd>6 personnes</dd>
        </div>
        <div>
          <dt>Difficulté</dt>
          <dd>★★★★☆</dd>
        </div>
        <div>
          <dt>Catégorie</dt>
          <dd><a href="#">Plat</a></dd>
        </div>
      </dl>

      <figure>
        <img src="https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=1200" alt="Boeuf bourguignon dans une cocotte"/>
        <figcaption>Servi avec des pommes de terre vapeur ou des tagliatelles fraîches.</figcaption>
      </figure>

      <section>
        <h3>Ingrédients</h3>
        <p style={{ color: "#777", fontSize: "0.9rem"}}>Pour 6 personnes</p> {/* "color: #777; font-size: 0.9rem" */}
        <ul className="ingredients">
          <li><strong>1,2 kg</strong> de boeuf à braiser (paleron, macreuse)</li>
          <li><strong>75 cl</strong> de vin rouge de Bourgogne</li>
          <li><strong>3</strong> carottes</li>
          <li><strong>2</strong> oignons</li>
          <li><strong>150 g</strong> de lardons</li>
          <li><strong>250 g</strong> de champignons de Paris</li>
          <li><strong>2 c. à soupe</strong> de farine</li>
          <li>Sel, poivre, <em>bouquet garni</em></li>
        </ul>
      </section>

      <section>
        <h3>Préparation</h3>
        <ol className="steps">
          <li>Couper la viande en cubes de 4 cm. La faire dorer dans une cocotte avec un peu d'huile, par petites quantités, puis réserver.</li>
          <li>Dans la même cocotte, faire revenir les lardons, les oignons émincés et les carottes en rondelles pendant 5 minutes.</li>
          <li>Remettre la viande, saupoudrer de farine et mélanger 2 minutes (c'est le <em>singeage</em>). Mouiller avec le vin, ajouter le bouquet garni, saler et poivrer.</li>
          <li>Couvrir et laisser mijoter à feu doux pendant <strong>3 heures</strong>. Ajouter les champignons 30 minutes avant la fin.</li>
        </ol>
      </section>

      <aside className="tip">
        <h3>Le conseil du chef</h3>
        <blockquote>
          Préparez-le la veille : le bourguignon est encore meilleur réchauffé, les saveurs ont le temps de se mélanger.
        </blockquote>
        <p>— <cite>Alice Dupont</cite></p>
      </aside>

      <section>
        <h3>Valeurs nutritionnelles</h3>
        <table>
          <thead>
            <tr>
              <th>Par portion</th>
              <th>Quantité</th>
              <th><abbr title="Apports journaliers recommandés">AJR</abbr></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Énergie</td>
              <td>520 kcal</td>
              <td>26 %</td>
            </tr>
            <tr>
              <td>Protéines</td>
              <td>45 g</td>
              <td>90 %</td>
            </tr>
            <tr>
              <td>Lipides</td>
              <td>28 g</td>
              <td>40 %</td>
            </tr>
            <tr>
              <td>Glucides</td>
              <td>12 g</td>
              <td>5 %</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>Questions fréquentes</h3>
        <details>
          <summary>Peut-on le congeler ?</summary>
          <p>Oui, sans problème, jusqu'à 3 mois. Décongelez-le au réfrigérateur la veille et réchauffez-le doucement à la casserole.</p>
        </details>
        <details>
          <summary>Quel vin choisir ?</summary>
          <p>Un rouge de Bourgogne reste la référence, mais n'importe quel rouge sec et fruité fera l'affaire. Inutile d'y mettre une grande bouteille.</p>
        </details>
      </section>

      <hr/>
      <p style={{ color: "#777", fontSize: "0.9rem"}}> {/* color: #777; font-size: 0.9rem */}
        Publiée le <time dateTime="2026-09-01">1er septembre 2026</time> · Dernière modification le <time dateTime="2026-09-12">12 septembre 2026</time>
      </p>
    </article>
    );
}

export default RecipeCard;