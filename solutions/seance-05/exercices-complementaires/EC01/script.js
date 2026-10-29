const titre = document.querySelector('h1');
console.log(titre.textContent);

const titreH2 = document.querySelector('h2');
titreH2.textContent = "Recette modifiée";


const recipeCard = document.querySelector(".recipe-card");
const p = document.createElement('p');
p.textContent = "Temps de préparation : 30 min";
recipeCard.appendChild(p);


const recipes = [
    { id: 1, title: 'Pâtes Carbonara', duration: 15 },
    { id: 2, title: 'Nouilles instantanées', duration: 3 },
    { id: 3, title: 'Pizza 4 fromages', duration: 25 },
    { id: 4, title: 'Soupe aux légumes', duration: 45 }
];

const container = document.querySelector('#recipes');
recipes.forEach(recipe =>{
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
    <h2>${recipe.title}</h2>
    <p>${recipe.duration} min</p>
    <button data-id="${recipe.id}"> Voir </button>
    `
    if(recipe.duration<=20){
        card.classList.add('quick');
    }
    container.appendChild(card);
});
const count = document.querySelector('#count');
count.textContent = recipes.length + ' recettes';

