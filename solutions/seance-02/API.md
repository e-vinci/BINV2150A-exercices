# API MiamMiam

## Auth

### POST /auth/register

- Description : Crée un compte et renvoie un token (l'utilisateur est directement connecté)
- Body (NewUserDTO) : Un nouveau user
- Réponses :
  - 400 : Mauvaise requête
  - 409 : email déjà utilisé
  - 500 : serveur erreur
  - 201 : user créé
  - body : Token d'authentification

### POST /auth/login

- Description : Vérifie les identifiants et renvoie un token
- Body : Les crédentials
- Réponses :
  - 401 : mauvais crédentials
  - 200 : authentifié
  - body : Token d'authentification

### GET /auth/me

- Description : Renvoie l'utilisateur correspondant au token
- Réponses :
  - 401 : Pas authentifié
  - 200 : requête réussie
  - body : User correspondant
