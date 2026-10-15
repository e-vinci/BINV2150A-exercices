const btn = document.querySelector('#add-recipe-btn');
const container = document.querySelector('#add-recipe');
const list = document.querySelector('#recipes-list');
const search = document.querySelector('#search');
btn.addEventListener('click',function(event){
    console.log('Bouton cliqué');

   container.innerHTML = `
   <form> 
   <input type = "text" name="title" placeholder="Titre : " required>
   <input type = "number" name="duration"  placeholder="Durée : " required>
   <button type="submit">Soumission</button>
   </form>  `;

   const form = document.querySelector('form');

   form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = form.elements.title.value;
    const duration = form.elements.duration.value;

    
    // même structure que les cartes existantes
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <div class="recipe-info">
        <h2>${title}</h2>
        <p class="duration">⏱️ ${duration} min</p>
      </div>
      <button class="delete-btn">Supprimer</button>
    `;
    list.appendChild(card);

    container.innerHTML = '';

   });

   
});
        

list.addEventListener('click', (e) => {
    if (e.target.matches('.delete-btn')) {
      e.target.closest('.recipe-card').remove();
    }
  });

  


search.addEventListener('input', () => {
  const text = search.value.toLowerCase();

  document.querySelectorAll('.recipe-card').forEach(card => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    card.style.display = title.includes(text) ? '' : 'none';
  });
});

// <form >