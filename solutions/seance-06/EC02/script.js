// Quand on clique sur le bouton "Ajouter une recette",
// un formulaire apparaît dans le conteneur #add-recipe,
// avec les champs "Titre" et "Durée" et un bouton de soumission

document.getElementById("add-recipe-btn").addEventListener("click", () => {
  const form = document.createElement("form");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";

  const durationInput = document.createElement("input");
  durationInput.type = "number";
  durationInput.name = "duration";

  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Envoyer";

  form.appendChild(titleInput);
  form.appendChild(durationInput);
  form.appendChild(btn);

  document.getElementById("add-recipe").appendChild(form);

  // Quand on soumet le formulaire,
  // la recette est ajoutée à la liste du conteneur #recipes-list
  // (même structure que les cartes existantes) et le formulaire disparaît de #add-recipe
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const { title, duration } = Object.fromEntries(formData);

    const recipeList = document.getElementById("recipes-list");
    const id = recipeList.childElementCount + 1;

    const card = document.createElement("div");
    card.className = "recipe-card";
    card.setAttribute("data-id", id);

    const cardContent = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = title;

    const p = document.createElement("p");
    p.textContent = `⏱️ ${duration} min`;

    cardContent.appendChild(h2);
    cardContent.appendChild(p);

    const btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.textContent = "Supprimer";
    handleSuppression(btn);

    card.appendChild(cardContent);
    card.appendChild(btn);

    document.getElementById("recipes-list").appendChild(card);
    document.getElementById("add-recipe").removeChild(form);
  });
});

// Optionnel : le bouton "Supprimer" de chaque carte retire la carte de la liste —
// y compris pour les recettes ajoutées après le chargement de la page (pensez à l'event delegation)
const handleSuppression = (el) => {
  el.addEventListener("click", (e) => {
    // e.stopPropagation();
    el.parentElement.remove();

    // Au cas où on veut réorganiser les ids
    let idx = 1;
    document.querySelectorAll(".recipe-card").forEach((el) => {
      el.setAttribute("data-id", idx);
      idx++;
    });
  });
};

document.querySelectorAll(".delete-btn").forEach(handleSuppression);

// Optionnel : le champ #search filtre les cartes affichées à chaque frappe
// (masquer les cartes dont le titre ne contient pas le texte recherché)
document.getElementById("search").addEventListener("input", (e) => {
  document.querySelectorAll(".recipe-card").forEach((el) => {
    const h2 = el.querySelector("h2");

    if (h2.textContent.toLowerCase().includes(e.target.value.toLowerCase()))
      el.classList.remove("hidden");
    else el.classList.add("hidden");
  });
});
