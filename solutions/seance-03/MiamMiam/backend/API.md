# API MiamMiam

Les routes protégées demandent le header `Authorization` avec le token obtenu à la connexion.

## Sommaire

- Auth : `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- Catégories : `GET /categories`, `GET /categories/:id`
- Recettes : `GET /recipes`, `GET /recipes/:id`, `POST /recipes`, `PUT /recipes/:id`, `PATCH /recipes/:id`, `DELETE /recipes/:id`
- Utilisateurs : `GET /users`, `GET /users/me/favorites`, `PUT /users/me/favorites/:recipeId`, `DELETE /users/me/favorites/:recipeId`, `GET /users/:id`, `DELETE /users/:id`

---

## POST /auth/register
- Description : Crée un compte et renvoie un token (l'utilisateur est directement connecté)
- Body : email, password, firstName, lastName
- Réponses :
  - 201 : Compte créé
    - Body : token
  - 400 : Données invalides
  - 409 : Email déjà utilisé
  - 500 : Erreur serveur

## POST /auth/login
- Description : Vérifie les identifiants et renvoie un token
- Body : email, password
- Réponses :
  - 200 : Succès
    - Body : token
  - 400 : Données invalides
  - 401 : Email ou mot de passe incorrect

## GET /auth/me
- Description : Renvoie l'utilisateur connecté
- Authentification : token
- Réponses :
  - 200 : Succès
    - Body : utilisateur
  - 401 : Non authentifié

## GET /categories
- Description : Récupère toutes les catégories
- Réponses :
  - 200 : Succès
    - Body : liste des catégories

## GET /categories/:id
- Description : Récupère une catégorie
- Paramètres :
  - id (path) : ID de la catégorie
- Réponses :
  - 200 : Succès
    - Body : catégorie
  - 400 : ID invalide
  - 404 : Catégorie non trouvée

## GET /recipes
- Description : Récupère toutes les recettes, éventuellement filtrées
- Paramètres (optionnels, cumulables) :
  - categoryId (query) : recettes de cette catégorie
  - authorId (query) : recettes de cet auteur
  - search (query) : texte dans le titre ou la description
  - ingredient (query) : texte dans le nom d'un ingrédient
  - maxPrepTime (query) : temps total maximum en minutes
- Réponses :
  - 200 : Succès
    - Body : liste des recettes
  - 400 : Paramètre invalide

## GET /recipes/:id
- Description : Récupère une recette
- Paramètres :
  - id (path) : ID de la recette
- Réponses :
  - 200 : Succès
    - Body : recette
  - 400 : ID invalide
  - 404 : Recette non trouvée

## POST /recipes
- Description : Crée une recette (l'utilisateur connecté en est l'auteur)
- Authentification : token
- Body : recette à créer
- Réponses :
  - 201 : Recette créée
    - Body : recette créée avec son ID
  - 400 : Données invalides ou catégorie inconnue
  - 401 : Non authentifié
  - 500 : Erreur serveur

## PUT /recipes/:id
- Description : Remplace une recette
- Authentification : token
  - Auteur de la recette ou administrateur
- Paramètres :
  - id (path) : ID de la recette
- Body : recette complète
- Réponses :
  - 204 : Recette remplacée
  - 400 : ID ou données invalides, ou catégorie inconnue
  - 401 : Non authentifié
  - 403 : Non autorisé
  - 404 : Recette non trouvée
  - 500 : Erreur serveur

## PATCH /recipes/:id
- Description : Modifie partiellement une recette (seules les propriétés envoyées sont modifiées)
- Authentification : token
  - Auteur de la recette ou administrateur
- Paramètres :
  - id (path) : ID de la recette
- Body : propriétés de la recette à modifier
- Réponses :
  - 200 : Recette modifiée
    - Body : recette modifiée
  - 400 : ID ou données invalides, ou catégorie inconnue
  - 401 : Non authentifié
  - 403 : Non autorisé
  - 404 : Recette non trouvée
  - 500 : Erreur serveur

## DELETE /recipes/:id
- Description : Supprime une recette (et la retire des favoris)
- Authentification : token
  - Auteur de la recette ou administrateur
- Paramètres :
  - id (path) : ID de la recette
- Réponses :
  - 204 : Recette supprimée
  - 400 : ID invalide
  - 401 : Non authentifié
  - 403 : Non autorisé
  - 404 : Recette non trouvée
  - 500 : Erreur serveur

## GET /users
- Description : Récupère tous les utilisateurs
- Authentification : token
  - Administrateurs uniquement
- Réponses :
  - 200 : Succès
    - Body : liste des utilisateurs
  - 401 : Non authentifié
  - 403 : Non autorisé

## GET /users/me/favorites
- Description : Récupère les recettes favorites de l'utilisateur connecté
- Authentification : token
- Réponses :
  - 200 : Succès
    - Body : liste des recettes
  - 401 : Non authentifié

## PUT /users/me/favorites/:recipeId
- Description : Ajoute une recette aux favoris de l'utilisateur connecté
- Authentification : token
- Paramètres :
  - recipeId (path) : ID de la recette
- Réponses :
  - 204 : Recette ajoutée
  - 400 : ID invalide
  - 401 : Non authentifié
  - 404 : Recette non trouvée
  - 500 : Erreur serveur

## DELETE /users/me/favorites/:recipeId
- Description : Retire une recette des favoris de l'utilisateur connecté
- Authentification : token
- Paramètres :
  - recipeId (path) : ID de la recette
- Réponses :
  - 204 : Recette retirée
  - 400 : ID invalide
  - 401 : Non authentifié
  - 500 : Erreur serveur

## GET /users/:id
- Description : Récupère un utilisateur (infos complètes pour soi-même ou un admin, infos publiques sinon)
- Authentification : token
- Paramètres :
  - id (path) : ID de l'utilisateur
- Réponses :
  - 200 : Succès
    - Body : utilisateur
  - 400 : ID invalide
  - 401 : Non authentifié
  - 404 : Utilisateur non trouvé

## DELETE /users/:id
- Description : Supprime un utilisateur (impossible de se supprimer soi-même)
- Authentification : token
  - Administrateurs uniquement
- Paramètres :
  - id (path) : ID de l'utilisateur
- Réponses :
  - 204 : Utilisateur supprimé
  - 400 : ID invalide ou suppression de son propre compte
  - 401 : Non authentifié
  - 403 : Non autorisé
  - 404 : Utilisateur non trouvé
  - 500 : Erreur serveur