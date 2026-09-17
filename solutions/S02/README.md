# MiamMiam — backend

API REST de l'application de recettes de cuisine **MiamMiam**, projet fil rouge du cours BINV2150-A (Javascript avancé).
Construite avec Express et TypeScript, dans la même architecture que le projet de Web 1.

## Installation et lancement

```bash
npm install
npm run demo:reset   # remet les données de démonstration en place
npm run dev          # démarre le serveur avec rechargement automatique sur http://localhost:3000
```

Le port est lu dans `env/dev.env` (3000 par défaut).

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Démarre le serveur en mode développement (`tsx --watch`) |
| `npm run typecheck` | Vérifie les types sans compiler (`tsc --noEmit`) |
| `npm run build` | Compile dans `dist/` |
| `npm start` | Lance la version compilée |
| `npm run demo:seed` | Écrit les données de démonstration dans `data/*.json` |
| `npm run demo:clear` | Vide les fichiers de données (`[]`) |
| `npm run demo:reset` | `clear` puis `seed` : retour à un état propre et connu |

### Comptes de démonstration

| Email | Mot de passe | Rôle |
|---|---|---|
| `admin@miammiam.be` | `admin` | admin |
| `alice@vinci.be` | `alice` | user |
| `bob@vinci.be` | `bob` | user |

## Structure du projet

```
src/
  main.ts          # point d'entrée : démarre le serveur
  app.ts           # configuration Express et enregistrement des contrôleurs
  models/          # interfaces : XxxDBO (fichier), Xxx (métier), XxxDTO (API)
  services/        # logique métier — méthodes statiques uniquement
  mappers/         # conversions DBO <-> métier <-> DTO
  controllers/     # routeurs Express — un fichier par ressource
  utils/
    guards.ts      # type guards isXxx() : validation des données reçues
    auth.ts        # génération / validation du token
data/              # "base de données" : un fichier JSON par ressource
scripts/           # données de démonstration
http/              # requêtes de test pour l'extension VSCode REST Client
```

### Flux d'une requête

```
Requête → Controller → Service → FilesService → data/*.json
              ↕
           Mapper (DTO ↔ métier ↔ DBO)
```

Le contrôleur valide les données reçues avec les type guards, appelle le service, et convertit le résultat en DTO.
Le service ne connaît ni Express ni les DTO : il travaille avec les objets métier.

## Ressources

- `/auth` : inscription, connexion, utilisateur courant
- `/categories` : catégories de recettes (lecture seule)
- `/recipes` : recettes (lecture publique ; création, modification et suppression réservées à l'auteur ou à un admin)
- `/users` : utilisateurs et favoris de l'utilisateur connecté

Les routes qui nécessitent d'être connecté attendent le token renvoyé par `/auth/login` dans le header `Authorization`.
Les fichiers du dossier `http/` montrent un exemple de chaque requête.
