import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import MenuSection from "./components/MenuSection";
import FormulaCard from "./components/FormulaCard";
import Dish from "./components/Dish";
import Badge from "./components/Badge";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="page">
      <Header
        name="Le Comptoir MiamMiam"
        tagline="Cuisine maison, produits de saison"
        address="Rue de l'Exemple 12, 1000 Bruxelles"
      />

      <main>
        <InfoBox title="Fait maison" variant="info">
          Tous nos plats sont préparés sur place, chaque jour, avec des produits de producteurs locaux.
        </InfoBox>

        <MenuSection title="Formules du midi" subtitle="Du lundi au vendredi, de 12h à 14h">
          <div className="formulas">
            <FormulaCard name="Formule Express" price={14.5}>
              <li>Plat du jour</li>
              <li>Café ou thé</li>
            </FormulaCard>
            <FormulaCard name="Formule Complète" price={19.9} ribbon="Le plus choisi">
              <li>Entrée du jour</li>
              <li>Plat du jour</li>
              <li>Dessert du jour</li>
            </FormulaCard>
          </div>
        </MenuSection>

        <MenuSection title="Entrées">
          <Dish
            name="Velouté de potimarron"
            price={7.5}
            description="Crème de potimarron, graines de courge torréfiées et huile de noisette."
          >
            <Badge label="Végétarien" type="veggie" />
          </Dish>
          <Dish name="Tartare de saumon" price={9.9} description="Saumon frais, avocat, citron vert et coriandre.">
            <Badge label="Nouveau" type="new" />
          </Dish>
          <Dish name="Planche du Comptoir" price={16} note="Pour 2 personnes" />
        </MenuSection>

        <MenuSection title="Plats" subtitle="Servis avec une garniture au choix">
          <Dish
            name="Pâtes Carbonara"
            price={13.5}
            description="La vraie recette romaine : guanciale, pecorino, jaune d'oeuf et poivre noir."
          />
          <Dish name="Curry de légumes" price={14} description="Légumes de saison, lait de coco, riz basmati.">
            <Badge label="Végétarien" type="veggie" />
            <Badge label="Épicé" type="spicy" />
          </Dish>
          <Dish
            name="Burger du chef"
            price={15.5}
            oldPrice={18}
            description="Boeuf de race locale, cheddar affiné, oignons confits, frites maison."
            note="Prix spécial cette semaine"
          />
          <Dish name="Dos de cabillaud" price={19} description="Cabillaud rôti, purée de céleri et beurre blanc.">
            <Badge label="Nouveau" type="new" />
          </Dish>
        </MenuSection>

        <MenuSection title="Desserts">
          <Dish name="Mousse au chocolat" price={6.5} description="Chocolat noir 70 %, fleur de sel.">
            <Badge label="Végétarien" type="veggie" />
          </Dish>
          <Dish name="Tarte Tatin" price={7} description="Pommes caramélisées, crème fraîche épaisse.">
            <Badge label="Végétarien" type="veggie" />
          </Dish>
          <Dish name="Café gourmand" price={8.5} description="Un café accompagné de trois mini-desserts du jour.">
            <Badge label="Végétarien" type="veggie" />
            <Badge label="Nouveau" type="new" />
          </Dish>
        </MenuSection>

        <InfoBox title="Allergènes" variant="warning">
          La liste des allergènes de chaque plat est disponible sur demande. Signalez toute allergie à notre équipe
          avant de commander.
        </InfoBox>
      </main>

      <Footer />
    </div>
  );
};

export default App;
