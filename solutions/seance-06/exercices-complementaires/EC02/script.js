const button = document.querySelector('#add-recipe-btn');
const conteneur = document.querySelector('#add-recipe');
const listConteneur = document.querySelector('#recipes-list');
button.addEventListener('click',()=>{
    conteneur.innerHTML= `
        <form id="recipe-form">
            <label for="title">Titre</label>
            <input type="text" id="title" name="title" placeholder="Ex : Pâtes" required>
            <label for="duration">Duration</label>
            <input type="number" id="duration" name="duration" placeholder="Ex : 10" required>
            <button type="submit">Ajouter</button>
        </form>
    `;
    const form = document.querySelector('#recipe-form');
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        const card = document.createElement('div');
        const title = form.querySelector('input[name="title"]').value;
        const duration = form.querySelector('input[name="duration"]').value;
        card.className = 'recipe-card';
       card.innerHTML = `
        <div>
            <h2></h2>
            <p></p>
         </div>
        <button class="delete-btn">Supprimer</button>
        `;
        card.querySelector('h2').textContent = title;
        card.querySelector('p').textContent =  `⏱️ ${duration} min`;
        listConteneur.appendChild(card);
        conteneur.innerHTML= '';
    });
});
listConteneur.addEventListener('click',(event)=>{
    const element = event.target;
    if(element.classList.contains('delete-btn')){
        element.parentElement.remove();
    };
});
const search = document.querySelector('#search');
search.addEventListener('input', (event)=>{
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(c=> {
        c.classList.toggle('hidden',!(c.querySelector('h2').textContent.toLowerCase().includes(event.target.value.toLowerCase())));
        
    });
});