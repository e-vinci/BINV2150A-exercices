const count = document.getElementById('#count');
const titre = document.querySelector('h1');
const complexe = document.querySelector('div.recipe-card > h2'); // h2 enfant de div avec classe recipe card
const input = document.querySelector('input[type="email"]');

//plusieurs éléments
const array = document.querySelectorAll('h1');

array.forEach(element => {
    console.log(element.textContent);
});

//convertir en array
const realArray = Array.from(array);

//créer des elements
/*
const element = document.createElement('div');
element.className = 'newClass';

const container = document.querySelector('.classNameOfDiv');

container.appendChild(element);
container.append(element);
container.insertBefore(element, selectedElementFromHTML);

//supprimer
const element = document.querySelector('#meow');
element.remove();
*/

//lister les propriétés des elements
/*
.textContent
.innerHTML
.value //pour les inputs
.getAttribute('attribute');
.id, .className
*/

//modifier les éléments
/*
.textContent = 'nouvelle valeur';
.innerHTML = '<p>nouveau html</p>';
.classList.add, .remove, .toggle

.style.cssProperty = 'cssValue';

.setAttribute('attributeName', 'value');
*/




/**
//Gestion des évenements
element.addEventListener('evenement', (event)=>{
    //code
});

objet event =>
    event.target : element ayant déclenché l'evenement
    event.currentTarget : quel element a le listener sur lui
    event.key : quel touche a été pressée (si event sur clavier par exemple)
    event.preventDefault() : disable default event (I.E. : refresh on form submit)
    event.stopPropagation() : prevent bubbling (if multiple eventListeners on parent AND child. event trigger on child => all parent's listeners will be triggered)
//Evenements, sur un bouton par exemple

click
submit envoi d'un formulaire
input chaque input
change valeur validée/perte focus
keydown/keyup
mouseover/mouseout 
focus/blur reçois/pert le focus




//EXEMPLE
*/
//1)
const link = document.querySelector("#link");

link.addEventListener('click', (event) => {
    event.preventDefault();
})

//2)
//HTML=================
`
<form id="my-form">
<input type="text" name="name" placeholder="Nom">
<button type="submit">Envoyer</button>
</form>
`

//JS===================
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
event.preventDefault(); // Ne recharge pas la page!
const name = document.querySelector('input[name="name"]').value;
console.log('Recette ajoutée:', name);
});


//3) EVENT DELEGATION. Listener on parent, then target all children
//HTML
`
<div id="recipes-list">
<button class="recipe-btn" data-id="1">Carbonara</button>
<button class="recipe-btn" data-id="2">Risotto</button>
<button class="recipe-btn" data-id="3">Soupe</button>
</div>
`
//JS
const list = document.querySelector('#recipes-list');
// Un seul listener sur le parent!
list.addEventListener('click', (event) => {
// Vérifier si c'est un bouton qu'on veut
if (event.target.classList.contains('recipe-btn')) {
const recipeId = event.target.dataset.id;
console.log('Recette cliquée:', recipeId);
}
});