# API MiamMiam

## POST /auth/register
- Description : Inscrit l'utilisateur
- Body : Nouvel user à créer
- Réponses :
    - 201 : User créé
        - Body : User créé avec son ID
    - 409 : Un user avec le même email existe déjà
    - 400 : Le body de l'user est invalide

## POST /auth/login
- Description : Se connecte
- Body : email et password de l'user
- Réponses :
    - 200 : Succès
    - 401 : Mauvais mot de passe

## GET /auth/me
- Description : Qui suis-je?
- Body : Authorisation
- Réponses :
    - 200 : Succès
    - 401 : Pas de token

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
    - search=titre/description : recherche dans le titre/ la description
    - ingredient=ingredient : filtre par si la recette contient cette ingrédient
    - maxPrepTime=time : filtre par les recettes prêtes en "time" min max
- Réponses :
    - 200 : Succès
        - Body : Liste de toutes les recettes

## GET /recipes/:id
- Description : Récupère une recette
- Paramètres : id(path) : ID de la recette à récupérer
- Réponses :
    - 200 : Succès
        - Body : Recette avec l'id
    - 404 : Recette inexistante

## POST /recipes
- Description : Crée une recette
- Body : Nouvelles recette à créer
- Réponses : 
    - 201 : Recette créée
        - Body : Recette créée avec son ID
    - 401 : Recette créée sans token
    - 400 : Recette créée invalide

## PUT /recipes/:id
- Description : Modifie une recette
- Body : Recette à mettre à jour
- Paramètres : id(path) : ID de la recette à modifier
- Réponses :
    - 204 : Recette mise à jour
    - 403 : Recette mise à jour depuis le mauvais compte

## DELETE /recipes/:id
- Description : Supprime une recette
- Authentification : JWD
- Paramètres : id(path) : ID de la recette à supprimer
- Réponses :
    - 204 : Recette supprimée
    - 403 : Accès depuis le mauvais compte
    - 404 : Recette inexistante

------------------------------------------------------------------

## GET /users
- Description : Récupère tous les utilisateurs
- Authentification : JWD
    - Utilisateurs administrateurs
- Réponses :
    - 200 : Succès
        - Body : Liste des utilisateurs
    - 403 : Accès non-autorisé (user)

## GET /users/:id
- Description : Consulte le profil d'un utilisateur
- Authentification : JWD
- Paramètres : id(path) : ID de l'utilisateur à consulter
- Réponses :
    - 200 : Succès
        - Body : Profil de l'utilisateur avec cet id
    - 404 : Utilisateur inexistant

## GET /users/me/favorites
- Description : récupère toutes mes recettes favorites
- Authentification : JWD
- Réponses :
    - 200 : Succès
        - Body : Liste des recettes favorites

## PUT /users/me/favorites/:id
- Description : ajouter une recette à mes favoris
- Authentification : JWD
- Paramètres : id(path) : Id de la recette à ajouter aux favoris
- Réponses :
    - 204 : Succès
    - 404 : Recette inexistante

## DELETE /users/me/favorites/:id
- Description : retirer une recette de mes favoris
- Authentification : JWD
- Paramètres : id(path) : Id de la recette à retirer des favoris
- Réponses :
    - 204 : Succès

## DELETE /users/3
- Description : Supprimer un utlisateur
- Authentification : JWD
    - Utilisateurs administrateurs
- Paramètres : id(path) : Id de l'utilisateur à supprimer
- Réponses :
    - 204 : Succès
    - 403 : Accès non autorisé (user)