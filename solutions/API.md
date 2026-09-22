# API MiamMiam

## POST /auth/register
- Description : Inscrit l'utilisateur
- Body : Nouvel user à créer
- Réponses :
    - 201 : User créé
        - Body : Token de l'user créé
    - 409 : Un user avec le même email existe déjà
    - 400 : Le body de l'user est invalide

## POST /auth/login
- Description : Se connecte
- Body : email et password de l'user
- Réponses :
    - 200 : Succès
        - Body : Token de l'user
    - 401 : Email inconnu ou mauvais mot de passe
    - 400 : Le body est invalide

## GET /auth/me
- Description : Qui suis-je?
- Authentification : JWT
- Réponses :
    - 200 : Succès
        - Body : User correspondant au token
    - 401 : Pas de token, ou token invalide/expiré

----------------------------------------------------------------

## GET /categories
- Description : Récupère toutes les catégories
- Réponses :
    - 200 : Succès
        - Body : Liste de toutes les catégories

## GET /categories/:id
- Description : Récupère une catégorie
- Paramètres : id(path) : ID de la catégorie à récupérer
- Réponses :
    - 200 : Succès
        - Body : Catégorie avec l'id
    - 404 : Catégorie inexistante
    - 400 : Id invalide

----------------------------------------------------------------

## GET /recipes
- Description : Récupère toutes les recettes
- Paramètres :
    - categoryId (query) : filtre par catégorie
    - authorId (query) : filtre par auteur
    - search=titre/description : recherche dans le titre/ la description
    - ingredient=ingredient : filtre par si la recette contient cet ingrédient
    - maxPrepTime=time : filtre par les recettes prêtes en "time" min max
- Réponses :
    - 200 : Succès
        - Body : Liste de toutes les recettes
    - 400 : Paramètre invalide

## GET /recipes/:id
- Description : Récupère une recette
- Paramètres : id(path) : ID de la recette à récupérer
- Réponses :
    - 200 : Succès
        - Body : Recette avec l'id
    - 404 : Recette inexistante
    - 400 : Id invalide

## POST /recipes
- Description : Crée une recette
- Authentification : JWT
- Body : Nouvelle recette à créer
- Réponses : 
    - 201 : Recette créée
        - Body : Recette créée avec son ID
    - 401 : Pas de token
    - 400 : Recette invalide ou catégorie inexistante

## PUT /recipes/:id
- Description : Modifie une recette (auteur ou admin uniquement)
- Authentification : JWT
- Body : Recette complète à mettre à jour
- Paramètres : id(path) : ID de la recette à modifier
- Réponses :
    - 204 : Recette mise à jour
    - 403 : Recette mise à jour depuis le mauvais compte
    - 404 : Recette inexistante
    - 401 : Pas de token
    - 400 : Id invalide, recette invalide ou catégorie inexistante

## PATCH /recipes/:id
- Description : Met à jour partiellement une recette (auteur ou admin uniquement)
- Authentification : JWT
- Body : Champs de la recette à modifier, tous optionnels
- Paramètres : id(path) : ID de la recette à modifier
- Réponses :
    - 200 : Recette mise à jour
        - Body : Recette complète après modification
    - 403 : Modification depuis le mauvais compte
    - 404 : Recette inexistante
    - 401 : Pas de token
    - 400 : Id invalide, données invalides ou catégorie inexistante

## DELETE /recipes/:id
- Description : Supprime une recette
- Authentification : JWT
- Paramètres : id(path) : ID de la recette à supprimer
- Réponses :
    - 204 : Recette supprimée
    - 403 : Accès depuis le mauvais compte
    - 404 : Recette inexistante
    - 401 : Pas de token
    - 400 : Id invalide

------------------------------------------------------------------

## GET /users
- Description : Récupère tous les utilisateurs
- Authentification : JWT
    - Utilisateurs administrateurs
- Réponses :
    - 200 : Succès
        - Body : Liste des utilisateurs
    - 403 : Accès non-autorisé (user)
    - 401 : Pas de token

## GET /users/:id
- Description : Consulte le profil d'un utilisateur. Profil complet pour soi-même ou un admin, profil public (id, prénom, nom) sinon
- Authentification : JWT
- Paramètres : id(path) : ID de l'utilisateur à consulter
- Réponses :
    - 200 : Succès
        - Body : Profil de l'utilisateur avec cet id
    - 404 : Utilisateur inexistant
    - 401 : Pas de token
    - 400 : Id invalide

## GET /users/me/favorites
- Description : récupère toutes mes recettes favorites
- Authentification : JWT
- Réponses :
    - 200 : Succès
        - Body : Liste des recettes favorites
    - 401 : Pas de token

## PUT /users/me/favorites/:recipeId
- Description : ajouter une recette à mes favoris
- Authentification : JWT
- Paramètres : recipeId(path) : Id de la recette à ajouter aux favoris
- Réponses :
    - 204 : Succès
    - 404 : Recette inexistante
    - 401 : Pas de token
    - 400 : Id invalide

## DELETE /users/me/favorites/:recipeId
- Description : retirer une recette de mes favoris
- Authentification : JWT
- Paramètres : recipeId(path) : Id de la recette à retirer des favoris
- Réponses :
    - 204 : Succès
    - 401 : Pas de token
    - 400 : Id invalide

## DELETE /users/:id
- Description : Supprimer un utilisateur
- Authentification : JWT
    - Utilisateurs administrateurs
- Paramètres : id(path) : Id de l'utilisateur à supprimer
- Réponses :
    - 204 : Succès
    - 403 : Accès non autorisé (user)
    - 404 : Utilisateur inexistant
    - 401 : Pas de token
    - 400 : Id invalide, ou suppression de soi-même