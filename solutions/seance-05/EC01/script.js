const h1 = document.querySelector("h1");
console.log(h1.textContent);

const h2 = document.querySelector("h2");
h2.textContent = "Recette modifiée";

const card = document.querySelector(".recipe-card");
const p = document.createElement("p");
p.textContent = "Temps de préparation : 30 min";
card.appendChild(p);

const recipes = [
  { id: 1, title: "Pâtes Carbonara", duration: 15 },
  { id: 2, title: "Risotto aux champignons", duration: 30 },
  { id: 3, title: "Salade César", duration: 20 },
  { id: 4, title: "Soupe gratinée", duration: 45 },
];

const container = document.querySelector("#recipes");

recipes.forEach((recipe) => {
  const recipeCard = document.createElement("div");
  recipeCard.className = "recipe-card";

  const title = document.createElement("h2");
  title.textContent = recipe.title;

  const duration = document.createElement("p");
  duration.textContent = `${recipe.duration} min`;

  const button = document.createElement("button");
  button.textContent = "Voir";
  button.dataset.id = recipe.id;

  if (recipe.duration <= 20) {
    recipeCard.classList.add("quick");
  }

  recipeCard.append(title, duration, button);
  container.appendChild(recipeCard);
});

const count = document.querySelector("#count");
count.textContent = `${recipes.length} recettes`;