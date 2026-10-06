# API MiamMiam

## GET /recipes

- Description : Récupère toutes les recettes, éventuellement filtrées.
- Paramètres :
  - categoryId=number (query) : Filtre par l'id de la recette. (optionnel) (privé)
  - authorId=number (query) : Filtre par l'id de l'auteur. (optionnel) (privé)
  - search=string (query) : Filtre par une recherche. (optionnel)
  - ingredient=string : Filtre par un ingrédient. (optionnel)
  - maxPrepTime=number (query) : Renvoie les recettes qui ont un maxPrepTime plus petit ou égal que le nombre passé en paramètre. (optionnel)
- Réponses :
  - 200 : Succès.
    - Body : Liste de toutes les recettes, ou celles qui respectent le filtre s'il y en a un.
  - 400 : La requête a été mal écrite ou des données sont erronées.

## GET /recipes/:id

- Description : Récupère une recette, celle dont l'id correspond à l'id demandé.
- Paramètres :
  - id (path) : ID de la recette à récupérer.
- Réponses :
  - 200 : Succès.
    - Body : La recette récupérée.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 404 : La recette avec l'id spécifié n'existe pas.

## POST /recipes

- Description : Crée une recette. L'utilisateur doit être authentifié pour pouvoir créer une recette.
- Body : La nouvelle recette à créer, ainsi que l'id de l'utilisateur.
- Authentification : JWT
  - Utilisateurs et administrateurs.
- Réponses :
  - 201 : Recette créée.
    - Body : Recette créée avec son id.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 401 : L'utilisateur n'est pas authentifié.
  - 500 : Erreur serveur.

## PUT /recipes/:id

- Description : Remplace une recette existante. L'utilisateur doit être l'auteur de la recette ou l'admin pour pouvoir remplacer la recette.
- Body : La recette à remplacer.
- Authentification : JWT
  - Auteur et administrateurs.
- Paramètres :
  - id (path) : ID de la recette à remplacer.
- Réponses :
  - 204 : La recette a été remplacée avec succès.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 401 : L'utilisateur n'est pas authentifié.
  - 403 : L'utilisateur est authentifié mais n'est pas l'auteur ou l'admin.
  - 404 : La recette avec l'id spécifié n'existe pas.
  - 500 : Erreur serveur.

## DELETE /recipes/:id

- Description : Supprime une recette. L'utilisateur doit être l'auteur de la recette ou l'admin pour pouvoir supprimer la recette.
- Authentification : JWT
  - Auteur et administrateurs.
- Paramètres :
  - id (path) : ID de la recette à supprimer.
- Réponses :
  - 204 : Recette supprimée.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 401 : L'utilisateur n'est pas authentifié.
  - 403 : L'utilisateur est authentifié mais n'est pas l'auteur ou l'admin.
  - 404 : La recette avec l'id spécifié n'existe pas.
  - 500 : Erreur serveur.

## GET /categories

- Description : Récupère toutes les catégories.
- Réponses :
  - 200 : Succès.
    - Body : La liste de toutes les catégories.

## GET /categories/:id

- Description : Récupère une catégorie, celle dont l'id correspond à l'id demandé.
- Paramètres :
  - id (path) : ID de la catégorie à récupérer.
- Réponses :
  - 200 : Succès.
    - Body : La catégorie récupérée.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 404 : La catégorie avec l'id spécifié n'existe pas.

## GET /users

- Description : Récupère tous les utilisateurs. Seul l'admin peut exécuter cette requête.
- Authentification : JWT
  - Administrateurs uniquement.
- Réponses :
  - 200 : Succès.
    - Body : La liste de tous les utilisateurs.

## GET /users/me/favorites

- Description : Récupère les recettes favorites de l'utilisateur connecté.
- Authentification : JWT
  - Utilisateurs et administrateurs.
- Réponses :
  - 200 : Succès.
    - Body : La liste des recettes favorites de l'utilisateur.
  - 401 : L'utilisateur n'est pas authentifié.

## PUT /users/me/favorites/:recipeId

- Description : Ajoute une recette aux favoris de l'utilisateur connecté.
- Body : La recette à ajouter.
- Authentification : JWT
  - Utilisateurs et administrateurs.
- Paramètres :
  - recipeId (path) : ID de la recette à mettre en favoris.
- Réponses :
  - 204 : Recette ajoutée aux favoris.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 401 : L'utilisateur n'est pas authentifié.
  - 404 : La recette avec l'id spécifié n'existe pas.
  - 500 : Erreur serveur.

## DELETE /users/me/favorites/:recipeId

- Descritpion : Retire une recette des favoris de l'utilisateur connecté.
- Authentification : JWT
  - Utilisateurs et administrateurs.
- Paramètres :
  - recipeId (path) : ID de la recette à mettre en favoris.
- Réponses :
  - 204 : Recette retirée des favoris.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 401 : L'utilisateur n'est pas authentifié.
  - 500 : Erreur serveur.

## GET /users/:id

- Description : Récupère les informations d'un utilisateur. Si cet utilisateur est l'utilisateur connecté, il recevra ses informations complètes. Sinon, il ne recevra que ses informations publiques. Un administrateur peut voir les informations complètes de n'importe quel utilisateur.
- Authentification : JWT
  - Utilisateurs et administrateurs.
- Paramètres :
  - id (path) : ID de l'utilisateur.
- Réponses :
  - 200 : Les informations (complètes ou publiques) de l'utilisateur ont été récupérées avec succès.
    - Body : Les informations (complètes ou publiques) de l'utilisateur.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 401 : L'utilisateur n'est pas authentifié.
  - 404 : L'utilisateur avec l'id spécifié n'existe pas.

## DELETE /users/:id

- Description : Supprime un utilisateur. Seul l'admin peut supprimer des utilisateur. Il est impossible de se supprimer soi-même.
- Authentification : JWT
  - Administrateurs uniquement.
- Paramètres :
  - id (path) : ID de l'utilisateur.
- Réponses :
  - 204 : L'utilisateur a été supprimé avec succès.
  - 400 : La requête a été mal écrite ou des données sont erronées, ou l'utilisateur a essayé de se supprimer soi-même.
  - 401 : L'utilisateur n'est pas authentifié.
  - 404 : L'utilisateur avec l'id spécifié n'existe pas.
  - 500 : Erreur serveur.

## POST /auth/register

- Description : Crée un compte et renvoie un token. L'utilisateur est ensuite directement connecté.
- Body : Nouvel utilisateur à créer.
- Réponses :
  - 201 : Compte créé.
    - Body : Le token du compte créé.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 409 : L'email est déjà utilisé.
  - 500 : Erreur serveur.

## POST /auth/login

- Description : Vérifie les identifiants et renvoie un token.
- Body : Les identifiants.
- Réponses :
  - 200 : Compte connecté.
    - Body : Le token du compte connecté.
  - 400 : La requête a été mal écrite ou des données sont erronées.
  - 401 : Les identifiants sont incorrects.

## GET /auth/me

- Description : Renvoie l'utilisateur correspondant au token.
- Authentification : JWT
  - Utilisateurs et administrateurs.
- Réponses :
  - 200 : Succès.
    - Body : L'utilisateur correspondant au token.
  - 401 : L'utilisateur n'est pas authentifié.
