# miammiam-api

API REST de démonstration pour la séance 21 (fetch), générée par [JSON Server](https://github.com/typicode/json-server) à partir du fichier `db.json`.

Les recettes et catégories ont **le même format** que les réponses du backend MiamMiam : le code écrit pour cette API fonctionnera avec le backend à partir de la séance 22.

## Lancement

```bash
npm install
npm start
```

L'API est disponible sur http://localhost:3001 (le port 3000 reste libre pour le backend MiamMiam).

## Routes

| Méthode | Route | Description |
|---|---|---|
| GET | `/recipes` | Toutes les recettes |
| GET | `/recipes/:id` | Une recette (404 si elle n'existe pas) |
| GET | `/recipes?categoryId=2` | Recettes d'une catégorie |
| POST | `/recipes` | Crée une recette (l'id est attribué automatiquement) |
| PUT | `/recipes/:id` | Remplace une recette |
| DELETE | `/recipes/:id` | Supprime une recette |
| GET | `/categories` | Toutes les catégories |

Aucune authentification n'est demandée. Les modifications sont enregistrées dans `db.json` ; `npm run reset` restaure les données initiales.
