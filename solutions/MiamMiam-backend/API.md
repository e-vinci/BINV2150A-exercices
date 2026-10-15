# API SEANCE 2 Partie 1 MiamMiam

## auth

### POST /auth/register

- Description : Crée un compte et renvoie un token
- Body : Nouveau compte à créer
- Réponse : 
    - 400 : Body du nouveau user pas conforme au format  attendu
    - 409 : email pour le nouveau user est déja utilisé pour un autre
    - 500 : echec de la crétion d'un token 
    - 201 : réussite de de la création d'un nouveau compte 
        - Body : renvoie le token

### POST /auth/login

- Description : Vérifient les identifiants et renvoie le token
- Body : Les identifiants pour la connexion
- Réponse : 
    - 401 : échec de connexion, user inexistant ou données de body incorrect
    - 200 : Connection réussite
        - Body : renvoie du token


### GET /auth/me 

- Description : renvoie l'utilisateur correspondant au token 
- Réponse : 
    - 200 : réussite de l'opération de la recherche de son user
        - Body : renvoie des données du user


## catégories

### GET /catégorie

- Description : Renvoie toute les catégories existante
- Réponse : 
    - 200 : Réussite du renvoie de toute les catégories
        - Body : liste de toute les catégories 

### GET /catégories/:id

- Description : Recherche d'un description à partir de son id 
- Parametre : 
    Id (path) : id de la catégorie que l'on recherche 
- Réponse : 
    - 404 : id invalid ou catégorie inexistante
    - 200 : Réussite de la recherche de la catégorie
        - Body : La catégorie recherchée

## récipes 

### GET /recipes?categoryId=&authorId=&search=&ingredient=&maxPrepTime=

- Description : Toutes les recettes, éventuellement filtrées par les query parametrés
- Parametres : 
    - categoryId : Par catégorie
    - authorId : Par auteur
    - search : Par caractere en question dans le titre ou dans le description
    - ingredient : Par ingrédient
    - maxPrepTime : Par temps de préparation
- Reponse : 
    - 200 : liste de recette triées
        - Body : liste de recettes filtrées

### GET /recipes/:id

- Description : recherche d'une recette avec son id
- Parametre : 
    - Id (path) : id de la recette que l'on recherche
- Reponse : 
    - 400 : id invalid
    - 404 : si l'id ne refere aucune recette existante
    - 200 : réussite de la recherche de la recette
        - Body : la recette voulue

### POST /recipes

- Description : Crée une recette (utilisateur connecté = auteur)
- Body : Body de la nouvelle recette à créer
- Reponse :
    - 401 : utilisateur non authentifié 
    - 400 : Echec de la création de la recette si la catégorie est inextistante dans la base de donnée
    - 201 : Réussite de la création de la nouvelle recette
        - Body : Renvoie des informations de la nouvelle recette
    
### PUT /recipes/:id 

- Description : Remplace une recette (auteur ou admin uniquement)
- Parametre : 
    - Id (path) : id de la recette que l'on cherche à remplacer
- Body : Nouvelle recette à remplacer
- Reponse : 
    - 401 : utilisateur non authentifié
    - 400 : id invalid, body invalid, body ne referent aucune catégory existante
    - 404 : id ne referant aucune recette existante
    - 403 : User non auteur de la recette deja présente et ne possede pas le role d'admin pour pouvoir la changer
    - 500 : remplacement échoué
    - 204 : réussite de l'opération

### DELETE /recipes/:id

- Description : Supprime une recette (auteur ou admin uniquement)
- Parametre : 
    - Id (path) : id de la recette que l'on cherche à supprimer
- Reponse :
    - 401 : utilisateur non authentifié 
    - 400 : id invalid
    - 404 : id ne referant aucune recette existante
    - 403 : User non auteur de la recette et ne possede pas le role d'admin pour pouvoir la supprimer
    - 500 : suppression échouée
    - 204 : réussite de l'opération

## Users

### GET /users

- Description : Tous les utilisateurs (admin uniquement)
- Reponse : 
    - 401 : utilisateur non authentifié
    - 403 : utilisateur non admin
    - 200 : Réussite de l'opération
        - Body : liste des utilisateurs

### GET /users/me/favorites

- Description : Les recettes favorites de l'utilisateur connecté
- Reponse : 
    - 401 : utilisateur non authentifié
    - 200 : Réussite de l'opération 
        - Body : liste de recettes favorites

### PUT /users/me/favorites/:recipeId

- Description : Ajoute une recette aux favoris de l'utilisateur connecté
- Parametre : 
    - recipeId (path) : id de la recette à ajouter aux favoris
- Reponse : 
    - 400 : recipeId invalid
    - 401 : utilisateur non authentifié
    - 404 : recipeId ne referant aucune recette existante
    - 500 : ajout échoué
    - 204 : réussite de l'opération

### DELETE /users/me/favorites/:recipeId

- Description : Retire une recette des favoris de l'utilisateur connecté
- Parametre : 
    - recipeId (path) : id de la recette à retirer des favoris
- Reponse : 
    - 400 : recipeId invalid
    - 401 : utilisateur non authentifié
    - 500 : suppression échouée
    - 204 : réussite de l'opération de suppression

### GET /users/:id

- Description : Un utilisateur (informations complètes pour soi-même ou un admin, publiques sinon)
- Parametre : 
    - Id (path) : id de l'utilisateur que l'on cherche à récupérer
- Reponse : 
    - 400 : id invalid
    - 401 : utilisateur non authentifié
    - 404 : id ne referant aucun utilisateur existant
    - 200 : réussite de la recherche de l'user 
        - Body : informations de l'utilisateur 

### DELETE /users/:id

- Description : Supprime un utilisateur (admin uniquement, pas soi-même)
- Parametre : 
    - Id (path) : id de l'utilisateur que l'on cherche à supprimer
- Reponse : 
    - 400 : id invalid, ou id correspondant à l'utilisateur connecté (suppression de soi-même interdite)
    - 401 : utilisateur non authentifié
    - 403 : utilisateur non admin
    - 404 : id ne referant aucun utilisateur existant
    - 500 : suppression échouée
    - 204 : réussite de l'opération

### PATCH /recipes/:id

- Description : Met à jour partiellement une recette (auteur ou admin uniquement)
- Parametre : 
    - Id (path) : id de la recette que l'on cherche à mettre à jour
- Body : Champs partiels de la recette à mettre à jour
- Reponse : 
    - 400 : id invalide, body invalide, ou categoryId ne referant aucune catégorie existante
    - 401 : utilisateur non authentifié
    - 404 : id ne referant aucune recette existante
    - 403 : User non auteur de la recette et ne possede pas le role d'admin pour pouvoir la modifier
    - 500 : mise à jour échouée
    - 200 : mise à jour réussit
        - Body: recette mis à jour