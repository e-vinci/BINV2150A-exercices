// Dans script.js, affichez dans la console le texte du titre h1
console.log(document.querySelector("h1").textContent);

// Modifiez le texte du titre h2 en "Recette modifiée"
document.querySelector("h2").textContent = "Recette modifiée";

// Ajoutez un nouveau paragraphe <p> avec le texte "Temps de préparation : 30 min" à la fin de la carte de recette
const p = document.createElement("p");
p.textContent = "Temps de préparation : 30 min";
document.querySelector(".recipe-card").appendChild(p);

// Déclarez un tableau recipes de 4 recettes (id, title, duration)
// et affichez une carte (div.recipe-card) par recette dans le conteneur #recipes :
// titre, durée et un bouton "Voir" portant l'id de la recette dans un attribut data-id
// Optionnel : ajoutez une classe quick aux cartes dont la durée est inférieure ou égale à 20 minutes (regardez le CSS de la page)
const recipes = [
  { id: 1, title: "Pâtes Carbonara", duration: 15 },
  { id: 2, title: "Risotto", duration: 30 },
  { id: 3, title: "Soupe Gratinée", duration: 45 },
  { id: 4, title: "Firtes", duration: 10 },
];

recipes.forEach((r) => {
  const card = document.createElement("div");
  card.className = "recipe-card";
  const title = document.createElement("h2");
  title.textContent = r.title;
  const p = document.createElement("p");
  p.textContent = "Temps de préparation : " + r.duration;
  const btn = document.createElement("button");
  btn.textContent = "Voir";
  btn.setAttribute("id", r.id);
  card.appendChild(title);
  card.appendChild(p);
  card.appendChild(btn);

  if (r.duration <= 20) card.classList.add("quick");

  document.getElementById("recipes").appendChild(card);
});

// Affichez le nombre de recettes dans l'élément #count
document.getElementById("count").textContent = recipes.length;
