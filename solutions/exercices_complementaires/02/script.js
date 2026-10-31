function addRecipe(addForm){
    const recipeList = document.getElementById("recipes-list");

    //On créé la nouvelle recette
    let newRecipe = document.createElement('div');

    newRecipe.className = "recipe-card"
    newRecipe.dataset.id = recipeList.childElementCount+1;


    newRecipe.innerHTML =`
        <div>
            <h2>${addForm.querySelector('input[name="titre"]').value}</h2>
            <p>⏱️ ${addForm.querySelector('input[name="duree"]').value} min</p>
        </div>
        <button class="delete-btn">Supprimer</button>
    `

    recipeList.appendChild(newRecipe);
} //Fonction pour l'ajout de la recette dans l'exercice 2

//EX 1
const btnAdd = document.querySelector("#add-recipe-btn");

btnAdd.addEventListener('click', () =>{
    const divAdd = document.querySelector("#add-recipe");

    divAdd.innerHTML = 
    `
        <form id="add-form">
            <label for="titre">Titre</label><br/>
            <input type="text" name="titre" required><br/>
            <label for="duree">Durée</label><br/>
            <input type="text" name="duree" required><br/>
            <input type="submit" value="Ajouter">
        </form>
    `


    //EX 2

    const addForm = document.querySelector("#add-form");


    addForm.addEventListener('submit', (event) =>{
        //On empêche le refresh
        event.preventDefault();
        
        addRecipe(addForm); //Gère l'ajout de la nouvelle recette
        
        //On supprime le form
        addForm.remove();
    });
});



//EX 3 (OPTIONNEL)
const recipeList = document.querySelector("#recipes-list");

recipeList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('delete-btn')){
        event.target.parentElement.remove();
    }
});

//EX 4 (OPTIONNEL)

const search = document.getElementById("search");

search.addEventListener('input', (event)=>{
    const recipes = document.querySelectorAll(".recipe-card");

    filter = event.target.value;
    
    recipes.forEach(e => {
        let title = e.querySelector('h2').textContent.toLowerCase();
        if(!title.includes(filter.toLowerCase())) e.classList.add("hidden");
        else e.classList.remove("hidden");
    });
});
