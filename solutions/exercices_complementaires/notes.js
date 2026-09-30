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