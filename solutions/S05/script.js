// Affiche le texte du titre h1
const title = document.querySelector("h1");
console.log(title.textContent);

// Modifie le titre h2
const recipeTitle = document.querySelector(".recipe-card h2");
recipeTitle.textContent = "Recette modifiée";

// Ajoute le temps de préparation à la première carte
const firstCard = document.querySelector(".recipe-card");

const preparationTime = document.createElement("p");
preparationTime.textContent = "Temps de préparation : 30 min";

firstCard.appendChild(preparationTime);

// Liste des recettes
const recipes = [
  {
    id: 1,
    title: "Pâtes Carbonara",
    duration: 15,
  },
  {
    id: 2,
    title: "Risotto",
    duration: 30,
  },
  {
    id: 3,
    title: "Soupe gratinée",
    duration: 45,
  },
  {
    id: 4,
    title: "Salade César",
    duration: 20,
  },
];

// Récupère le conteneur des recettes
const recipesContainer = document.querySelector("#recipes");

// Crée une carte pour chaque recette
recipes.forEach((recipe) => {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  // Ajoute la classe quick aux recettes de 20 minutes ou moins
  if (recipe.duration <= 20) {
    card.classList.add("quick");
  }

  const title = document.createElement("h2");
  title.textContent = recipe.title;

  const duration = document.createElement("p");
  duration.textContent = `Durée : ${recipe.duration} min`;

  const button = document.createElement("button");
  button.textContent = "Voir";
  button.setAttribute("data-id", recipe.id);

  card.append(title, duration, button);
  recipesContainer.appendChild(card);
});

// Affiche le nombre de recettes
const count = document.querySelector("#count");
count.textContent = `${recipes.length} recettes`;