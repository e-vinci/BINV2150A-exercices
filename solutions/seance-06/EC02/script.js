const addRecipeBtn = document.querySelector("#add-recipe-btn");
const addRecipeContainer = document.querySelector("#add-recipe");
const recipesList = document.querySelector("#recipes-list");
const searchInput = document.querySelector("#search");

addRecipeBtn.addEventListener("click", () => {
  if (addRecipeContainer.querySelector("form")) return;

  const form = document.createElement("form");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Titre";
  titleInput.required = true;

  const durationInput = document.createElement("input");
  durationInput.type = "number";
  durationInput.name = "duration";
  durationInput.placeholder = "Durée (min)";
  durationInput.min = "1";
  durationInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Ajouter";

  form.append(titleInput, durationInput, submitBtn);
  addRecipeContainer.appendChild(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const card = createRecipeCard(titleInput.value.trim(), durationInput.value);
    recipesList.appendChild(card);
    filterRecipes(searchInput.value);

    form.remove();
  });
});

function createRecipeCard(title, duration) {
  const card = document.createElement("div");
  card.className = "recipe-card";
  card.dataset.id = getNextId();

  const info = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const p = document.createElement("p");
  p.textContent = `⏱️ ${duration} min`;

  info.append(h2, p);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Supprimer";

  card.append(info, deleteBtn);
  return card;
}

function getNextId() {
  const ids = Array.from(recipesList.querySelectorAll(".recipe-card")).map((card) =>
    Number(card.dataset.id)
  );
  return ids.length === 0 ? 1 : Math.max(...ids) + 1;
}

recipesList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    event.target.closest(".recipe-card").remove();
  }
});

function filterRecipes(search) {
  const text = search.toLowerCase();
  const cards = recipesList.querySelectorAll(".recipe-card");

  cards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    card.classList.toggle("hidden", !title.includes(text));
  });
}

searchInput.addEventListener("input", (event) => filterRecipes(event.target.value));