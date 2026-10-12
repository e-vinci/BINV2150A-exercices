// 1,2
// 3
const t = document.querySelector('h1');
console.log(t.textContent);
// 4
const t2 = document.querySelector('h2');
t2.textContent = 'Recette modifié';

// 5
const rc = document.querySelector('.recipe-card')
const p = document.querySelector('p');
p.textContent = 'Temps de préparation : 30 min';
rc.appendChild(p);


// 6
const recipes = [
    { id: 1, title: 'Pâtes Carbonara', duration: 30 },
  { id: 2, title: 'Salade César', duration: 15 },
  { id: 3, title: 'Omelette', duration: 10 },
  { id: 4, title: 'Lasagnes', duration: 60 }
];

const container = document.querySelector('#recipes');

recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    
    // 8
    if (recipe.duration <= 20) {
    card.classList.add('quick');
    }

    const title = document.createElement('h2');
    title.textContent = recipe.title;

    const duration = document.createElement('p');
    duration.textContent = 'Durée : ' + recipe.duration +' min';

    const button = document.createElement('button')
    button.textContent = 'Voir';
    button.setAttribute('data-id',recipe.id)

    card.appendChild(title);
    card.appendChild(duration);
    card.appendChild(button);
    container.appendChild(card);
});

// 7
document.querySelector('#count').textContent = recipes.length + ' recettes';