# API MiamMiam

## POST /auth/register
- Description : Inscrit un nouvel utilisateur et le connecte
- Body : Données de l'utilisateur à inscrire (username, email, password)
- Réponses :
  - 201 : Utilisateur créé
    - Body : Jeton d'authentification JWT
  - 400 : Données invalides ou manquantes
  - 409 : Un utilisateur avec cet email existe déjà

## POST /auth/login
- Description : Connecte un utilisateur existant
- Body : Identifiants de connexion (email, password)
- Réponses :
  - 200 : Succès
    - Body : Jeton d'authentification JWT
  - 400 : Données invalides ou manquantes
  - 401 : Email ou mot de passe incorrect

## GET /auth/me
- Description : Récupère le profil de l'utilisateur connecté
- Authentification : JWT
- Réponses :
  - 200 : Succès
    - Body : Profil de l'utilisateur connecté
  - 401 : Non authentifié

## GET /categories
- Description : Récupère toutes les catégories
- Réponses :
  - 200 : Succès
    - Body : Liste de toutes les catégories

## GET /categories/:id
- Description : Récupère une catégorie spécifique
- Paramètres :
  - id (path) : ID de la catégorie à récupérer
- Réponses :
  - 200 : Succès
    - Body : Catégorie correspondante
  - 400 : ID invalide
  - 404 : Catégorie non trouvée

## GET /recipes
- Description : Récupère toutes les recettes (avec filtres optionnels)
- Paramètres :
  - categoryId (query) : Filtre par catégorie (optionnel)
  - authorId (query) : Filtre par auteur (optionnel)
  - search (query) : Recherche dans le titre ou la description (optionnel)
  - ingredient (query) : Filtre par ingrédient (optionnel)
  - maxPrepTime (query) : Temps de préparation maximal (optionnel)
- Réponses :
  - 200 : Succès
    - Body : Liste des recettes correspondantes
  - 400 : Paramètre de filtre invalide

## GET /recipes/:id
- Description : Récupère une recette spécifique
- Paramètres :
  - id (path) : ID de la recette à récupérer
- Réponses :
  - 200 : Succès
    - Body : Détails de la recette
  - 400 : ID invalide
  - 404 : Recette non trouvée

## POST /recipes
- Description : Crée une nouvelle recette
- Authentification : JWT
- Body : Nouvelle recette à créer
- Réponses :
  - 201 : Recette créée
    - Body : Recette créée avec son ID
  - 400 : Données invalides ou catégorie inexistante
  - 401 : Non authentifié

## PUT /recipes/:id
- Description : Remplace complètement une recette existante
- Authentification : JWT
  - Auteur de la recette ou administrateur
- Paramètres :
  - id (path) : ID de la recette à mettre à jour
- Body : Recette complète de remplacement
- Réponses :
  - 204 : Recette mise à jour
  - 400 : Données invalides ou catégorie inexistante
  - 401 : Non authentifié
  - 403 : Non autorisé (ni auteur ni admin)
  - 404 : Recette non trouvée

## PATCH /recipes/:id
- Description : Met à jour partiellement une recette existante
- Authentification : JWT
  - Auteur de la recette ou administrateur
- Paramètres :
  - id (path) : ID de la recette à modifier
- Body : Données de la recette à mettre à jour (champs partiels)
- Réponses :
  - 200 : Recette mise à jour
    - Body : Recette mise à jour
  - 400 : ID invalide ou données invalides
  - 401 : Non authentifié
  - 403 : Accès refusé (ni auteur ni admin)
  - 404 : Recette non trouvée

## DELETE /recipes/:id
- Description : Supprime une recette existante
- Authentification : JWT
  - Auteur de la recette ou administrateur
- Paramètres :
  - id (path) : ID de la recette à supprimer
- Réponses :
  - 204 : Recette supprimée
  - 400 : ID invalide
  - 401 : Non authentifié
  - 403 : Non autorisé (ni auteur ni admin)
  - 404 : Recette non trouvée

## GET /users
- Description : Récupère tous les utilisateurs
- Authentification : JWT
  - Utilisateurs administrateurs
- Réponses :
  - 200 : Succès
    - Body : Liste de tous les utilisateurs
  - 401 : Non authentifié
  - 403 : Non autorisé (non admin)

## GET /users/me/favorites
- Description : Récupère les recettes favorites de l'utilisateur connecté
- Authentification : JWT
- Réponses :
  - 200 : Succès
    - Body : Liste des recettes favorites
  - 401 : Non authentifié

## PUT /users/me/favorites/:recipeId
- Description : Ajoute une recette aux favoris de l'utilisateur connecté
- Authentification : JWT
- Paramètres :
  - recipeId (path) : ID de la recette à ajouter aux favoris
- Réponses :
  - 204 : Recette ajoutée aux favoris
  - 400 : ID de recette invalide
  - 401 : Non authentifié
  - 404 : Recette non trouvée

## DELETE /users/me/favorites/:recipeId
- Description : Retire une recette des favoris de l'utilisateur connecté
- Authentification : JWT
- Paramètres :
  - recipeId (path) : ID de la recette à retirer des favoris
- Réponses :
  - 204 : Recette retirée des favoris
  - 400 : ID de recette invalide
  - 401 : Non authentifié

## GET /users/:id
- Description : Récupère le profil d'un utilisateur
- Authentification : JWT
- Paramètres :
  - id (path) : ID de l'utilisateur
- Réponses :
  - 200 : Succès
    - Body : Profil complet (si soi-même ou admin) ou profil public restreint (si tiers)
  - 400 : ID invalide
  - 401 : Non authentifié
  - 404 : Utilisateur non trouvé
