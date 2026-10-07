//EX 1
const titre1 = document.querySelector('h1').textContent;
console.log(titre1);

//EX 2
const titre2 = document.querySelector('h2');
titre2.textContent = "Recette modifiée";

//EX 3
const recipeCard = document.querySelector('.recipe-card');

const newP = document.createElement('p');
newP.textContent = 'Temps de préparation: 30min';

recipeCard.appendChild(newP);


//EX 4
const recipes = [
    {id: 1, title:'Pates Bolognaise', duration: 45},
    {id: 2, title:'Pates Pesto', duration: 15},
    {id: 3, title:"Pates à l'encre", duration: 60},
    {id: 4, title:'Pates aux légumes', duration: 30},
];

const container = document.querySelector("#recipes");

recipes.forEach(recette => {
    let card = document.createElement('div');
    card.className="recipe-card";

    if(recette.duration<=20) card.classList.add("quick");

    card.innerHTML = `
        <h2>${recette.title}</h2>
        <p>${recette.duration}</p>
        <button data-id=${recette.id}>Voir</button>
    `
    container.appendChild(card);
});


//EX 5
const count = document.getElementById('count');

//EX 6
count.textContent = `Nombre de recettes: ${recipes.length}`;
