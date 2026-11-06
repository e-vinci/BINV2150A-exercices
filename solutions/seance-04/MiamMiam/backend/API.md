# API MiamMiam

## POST /auth/register
- Description : Crée un compte et renvoie un token (l'utilisateur est directement connecté)
- Body : Nouvel utilisateur (email, password, firstName, lastName)
- Réponses :
  - 201 : Compte créé
    - Body : Token de connexion
  - 400 : Données invalides
  - 409 : Email déjà utilisé
  - 500 : Erreur serveur

## POST /auth/login
- Description : Vérifie les identifiants et renvoie un token
- Body : Identifiants (email, password)
- Réponses :
  - 200 : Succès
    - Body : Token de connexion
  - 400 : Données invalides
  - 401 : Email ou mot de passe incorrect

## GET /auth/me
- Description : Récupère l'utilisateur connecté
- Authentification : token
- Réponses :
  - 200 : Succès
    - Body : L'utilisateur connecté
  - 401 : Non authentifié

## GET /categories
- Description : Récupère toutes les catégories
- Réponses :
  - 200 : Succès
    - Body : Liste de toutes les catégories

## GET /categories/:id
- Description : Récupère une catégorie
- Paramètres :
  - id (path) : ID de la catégorie
- Réponses :
  - 200 : Succès
    - Body : La catégorie
  - 400 : ID invalide
  - 404 : Catégorie non trouvée

## GET /recipes
- Description : Récupère toutes les recettes, éventuellement filtrées
- Paramètres :
  - categoryId (query) : ID de la catégorie (optionnel)
  - authorId (query) : ID de l'auteur (optionnel)
  - search (query) : Texte à chercher dans le titre ou la description (optionnel)
  - ingredient (query) : Nom d'un ingrédient (optionnel)
  - maxPrepTime (query) : Temps total maximum en minutes, préparation + cuisson (optionnel)
- Réponses :
  - 200 : Succès
    - Body : Liste des recettes
  - 400 : Paramètre invalide

## GET /recipes/:id
- Description : Récupère une recette
- Paramètres :
  - id (path) : ID de la recette
- Réponses :
  - 200 : Succès
    - Body : La recette
  - 400 : ID invalide
  - 404 : Recette non trouvée

## POST /recipes
- Description : Crée une nouvelle recette (l'utilisateur connecté en est l'auteur)
- Authentification : token
- Body : Nouvelle recette à créer
- Réponses :
  - 201 : Recette créée
    - Body : Recette créée avec son ID
  - 400 : Données invalides ou catégorie inexistante
  - 401 : Non authentifié
  - 500 : Erreur serveur

## PUT /recipes/:id
- Description : Remplace une recette existante
- Authentification : token
  - Auteur de la recette ou administrateur
- Body : Recette complète à remplacer
- Paramètres :
  - id (path) : ID de la recette à remplacer
- Réponses :
  - 204 : Recette mise à jour
  - 400 : ID invalide, données invalides ou catégorie inexistante
  - 401 : Non authentifié
  - 403 : Non autorisé
  - 404 : Recette non trouvée
  - 500 : Erreur serveur

## PATCH /recipes/:id
- Description : Met à jour partiellement une recette existante
- Authentification : token
  - Auteur de la recette ou administrateur
- Body : Propriétés de la recette à modifier (toutes optionnelles)
- Paramètres :
  - id (path) : ID de la recette à modifier
- Réponses :
  - 200 : Recette mise à jour
    - Body : La recette mise à jour
  - 400 : ID invalide, données invalides ou catégorie inexistante
  - 401 : Non authentifié
  - 403 : Non autorisé
  - 404 : Recette non trouvée
  - 500 : Erreur serveur

## DELETE /recipes/:id
- Description : Supprime une recette existante
- Authentification : token
  - Auteur de la recette ou administrateur
- Paramètres :
  - id (path) : ID de la recette à supprimer
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
  - Utilisateurs administrateurs
- Réponses :
  - 200 : Succès
    - Body : Liste de tous les utilisateurs
  - 401 : Non authentifié
  - 403 : Non autorisé

## GET /users/me/favorites
- Description : Récupère les recettes favorites de l'utilisateur connecté
- Authentification : token
- Réponses :
  - 200 : Succès
    - Body : Liste des recettes favorites
  - 401 : Non authentifié

## PUT /users/me/favorites/:recipeId
- Description : Ajoute une recette aux favoris de l'utilisateur connecté
- Authentification : token
- Paramètres :
  - recipeId (path) : ID de la recette à ajouter
- Réponses :
  - 204 : Recette ajoutée aux favoris
  - 400 : ID invalide
  - 401 : Non authentifié
  - 404 : Recette non trouvée
  - 500 : Erreur serveur

## DELETE /users/me/favorites/:recipeId
- Description : Retire une recette des favoris de l'utilisateur connecté
- Authentification : token
- Paramètres :
  - recipeId (path) : ID de la recette à retirer
- Réponses :
  - 204 : Recette retirée des favoris
  - 400 : ID invalide
  - 401 : Non authentifié
  - 500 : Erreur serveur

## GET /users/:id
- Description : Récupère un utilisateur (informations complètes pour soi-même ou un administrateur, informations publiques sinon)
- Authentification : token
- Paramètres :
  - id (path) : ID de l'utilisateur
- Réponses :
  - 200 : Succès
    - Body : L'utilisateur
  - 400 : ID invalide
  - 401 : Non authentifié
  - 404 : Utilisateur non trouvé

## DELETE /users/:id
- Description : Supprime un utilisateur (impossible de se supprimer soi-même)
- Authentification : token
  - Utilisateurs administrateurs
- Paramètres :
  - id (path) : ID de l'utilisateur à supprimer
- Réponses :
  - 204 : Utilisateur supprimé
  - 400 : ID invalide ou tentative de se supprimer soi-même
  - 401 : Non authentifié
  - 403 : Non autorisé
  - 404 : Utilisateur non trouvé
  - 500 : Erreur serveur