import fs from "fs";
import bcrypt from 'bcrypt';
/**
 * Données de démonstration, au format DBO (celui des fichiers JSON).
 * Lancer avec : npm run demo:seed
 */

const NOW = "2026-09-01T08:00:00.000Z";

// --- Users (UserDBO)//générations de mdp hashés
const SALTING_ROUNDS = 10;
//hashSync ok ? on ne fait cette opération qu'a des moments définis
const HASHED_PWD_ADMIN = bcrypt.hashSync("admin", SALTING_ROUNDS);
const HASHED_PWD_ALICE = bcrypt.hashSync("alice", SALTING_ROUNDS);
const HASHED_PWD_BOB = bcrypt.hashSync("bob", SALTING_ROUNDS);
const users = [
  {
    id: 1,
    email: "admin@miammiam.be",
    hashed_password: HASHED_PWD_ADMIN, //clear : admin
    first_name: "Admin",
    last_name: "MiamMiam",
    role: "admin",
    favorites: [1, 4],
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 2,
    email: "alice@vinci.be",
    hashed_password: HASHED_PWD_ALICE, //clear : alice
    first_name: "Alice",
    last_name: "Dupont",
    role: "user",
    favorites: [3],
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 3,
    email: "bob@vinci.be",
    hashed_password: HASHED_PWD_BOB, //clear : bob
    first_name: "Bob",
    last_name: "Martin",
    role: "user",
    favorites: [],
    created_at: NOW,
    updated_at: NOW,
  },
];

// --- Categories (CategoryDBO) ---
const categories = [
  { id: 1, name: "Entrée", description: "Pour ouvrir l'appétit", created_at: NOW, updated_at: NOW },
  { id: 2, name: "Plat", description: "Le cœur du repas", created_at: NOW, updated_at: NOW },
  { id: 3, name: "Dessert", description: "La touche sucrée", created_at: NOW, updated_at: NOW },
  { id: 4, name: "Boisson", description: "Cocktails, smoothies et autres", created_at: NOW, updated_at: NOW },
  { id: 5, name: "Apéro", description: "À grignoter entre amis", created_at: NOW, updated_at: NOW },
];

// --- Recipes (RecipeDBO) ---
const recipes = [
  {
    id: 1,
    title: "Pancakes moelleux",
    description: "Des pancakes épais et aérés pour un brunch réussi.",
    image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    prep_time: 10,
    cook_time: 15,
    servings: 4,
    difficulty: 1,
    category_id: 3,
    tags: ["brunch", "sucré", "rapide"],
    ingredients: [
      { name: "farine", quantity: 250, unit: "g" },
      { name: "lait", quantity: 300, unit: "ml" },
      { name: "oeuf", quantity: 2, unit: "pièce" },
      { name: "sucre", quantity: 30, unit: "g" },
      { name: "levure chimique", quantity: 1, unit: "sachet" },
      { name: "beurre", quantity: 30, unit: "g" },
    ],
    steps: [
      "Mélanger la farine, le sucre et la levure.",
      "Ajouter les oeufs et le lait, fouetter jusqu'à obtenir une pâte lisse.",
      "Incorporer le beurre fondu.",
      "Cuire des louches de pâte dans une poêle chaude, 2 minutes par face.",
    ],
    author_id: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 2,
    title: "Spaghetti carbonara",
    description: "La vraie carbonara : guanciale, pecorino, oeufs et poivre. Pas de crème !",
    image_url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    prep_time: 10,
    cook_time: 15,
    servings: 2,
    difficulty: 2,
    category_id: 2,
    tags: ["italien", "pâtes"],
    ingredients: [
      { name: "spaghetti", quantity: 200, unit: "g" },
      { name: "guanciale", quantity: 100, unit: "g" },
      { name: "oeuf", quantity: 2, unit: "pièce" },
      { name: "pecorino", quantity: 50, unit: "g" },
      { name: "poivre", quantity: 1, unit: "pincée" },
    ],
    steps: [
      "Cuire les spaghetti dans une grande quantité d'eau salée.",
      "Faire dorer le guanciale coupé en lardons à sec.",
      "Battre les oeufs avec le pecorino râpé et le poivre.",
      "Égoutter les pâtes, les mélanger hors du feu au guanciale puis aux oeufs, en ajoutant un peu d'eau de cuisson.",
    ],
    author_id: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 3,
    title: "Soupe de potiron",
    description: "Un velouté d'automne tout doux, parfait avec des croûtons.",
    image_url: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800",
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: 1,
    category_id: 1,
    tags: ["végétarien", "automne", "soupe"],
    ingredients: [
      { name: "potiron", quantity: 1, unit: "kg" },
      { name: "oignon", quantity: 1, unit: "pièce" },
      { name: "pomme de terre", quantity: 1, unit: "pièce" },
      { name: "bouillon de légumes", quantity: 1, unit: "l" },
      { name: "crème fraîche", quantity: 100, unit: "ml" },
    ],
    steps: [
      "Éplucher et couper le potiron, l'oignon et la pomme de terre.",
      "Faire revenir l'oignon, ajouter les légumes et le bouillon.",
      "Cuire 25 minutes puis mixer.",
      "Ajouter la crème, saler, poivrer.",
    ],
    author_id: 3,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 4,
    title: "Mousse au chocolat",
    description: "Trois ingrédients, un résultat bluffant. À préparer la veille.",
    image_url: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800",
    prep_time: 20,
    cook_time: 0,
    servings: 6,
    difficulty: 3,
    category_id: 3,
    tags: ["chocolat", "sans cuisson"],
    ingredients: [
      { name: "chocolat noir", quantity: 200, unit: "g" },
      { name: "oeuf", quantity: 6, unit: "pièce" },
      { name: "sucre", quantity: 30, unit: "g" },
    ],
    steps: [
      "Faire fondre le chocolat au bain-marie.",
      "Séparer les blancs des jaunes ; mélanger les jaunes au chocolat tiède.",
      "Monter les blancs en neige avec le sucre.",
      "Incorporer délicatement les blancs au chocolat et réfrigérer 6 heures.",
    ],
    author_id: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 5,
    title: "Poulet au curry et lait de coco",
    description: "Un curry doux et parfumé, prêt en moins de 40 minutes.",
    image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800",
    prep_time: 15,
    cook_time: 25,
    servings: 4,
    difficulty: 2,
    category_id: 2,
    tags: ["asiatique", "épicé", "poulet"],
    ingredients: [
      { name: "blanc de poulet", quantity: 600, unit: "g" },
      { name: "lait de coco", quantity: 400, unit: "ml" },
      { name: "pâte de curry", quantity: 2, unit: "c. à soupe" },
      { name: "oignon", quantity: 1, unit: "pièce" },
      { name: "riz basmati", quantity: 300, unit: "g" },
    ],
    steps: [
      "Faire revenir l'oignon émincé puis le poulet coupé en dés.",
      "Ajouter la pâte de curry et remuer 1 minute.",
      "Verser le lait de coco et laisser mijoter 20 minutes.",
      "Servir avec le riz.",
    ],
    author_id: 3,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 6,
    title: "Guacamole",
    description: "Frais, crémeux, à tartiner ou à tremper.",
    image_url: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800",
    prep_time: 10,
    cook_time: 0,
    servings: 4,
    difficulty: 1,
    category_id: 5,
    tags: ["mexicain", "végétarien", "sans cuisson", "rapide"],
    ingredients: [
      { name: "avocat", quantity: 3, unit: "pièce" },
      { name: "citron vert", quantity: 1, unit: "pièce" },
      { name: "oignon rouge", quantity: 0.5, unit: "pièce" },
      { name: "coriandre", quantity: 1, unit: "bouquet" },
      { name: "sel", quantity: 1, unit: "pincée" },
    ],
    steps: [
      "Écraser les avocats à la fourchette.",
      "Ajouter le jus de citron vert, l'oignon haché et la coriandre ciselée.",
      "Saler et servir immédiatement.",
    ],
    author_id: 2,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 7,
    title: "Smoothie banane-fraise",
    description: "Le petit-déjeuner à emporter.",
    image_url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800",
    prep_time: 5,
    cook_time: 0,
    servings: 2,
    difficulty: 1,
    category_id: 4,
    tags: ["fruits", "rapide", "sans cuisson"],
    ingredients: [
      { name: "banane", quantity: 2, unit: "pièce" },
      { name: "fraise", quantity: 200, unit: "g" },
      { name: "yaourt nature", quantity: 150, unit: "g" },
      { name: "lait", quantity: 150, unit: "ml" },
    ],
    steps: ["Tout mixer.", "Servir bien frais."],
    author_id: 3,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: 8,
    title: "Boeuf bourguignon",
    description: "Le classique du dimanche, qui mijote longtemps.",
    image_url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800",
    prep_time: 30,
    cook_time: 180,
    servings: 6,
    difficulty: 4,
    category_id: 2,
    tags: ["français", "mijoté", "boeuf"],
    ingredients: [
      { name: "boeuf à braiser", quantity: 1.2, unit: "kg" },
      { name: "vin rouge", quantity: 750, unit: "ml" },
      { name: "carotte", quantity: 3, unit: "pièce" },
      { name: "oignon", quantity: 2, unit: "pièce" },
      { name: "lardons", quantity: 150, unit: "g" },
      { name: "champignons de Paris", quantity: 250, unit: "g" },
    ],
    steps: [
      "Faire dorer la viande coupée en cubes, réserver.",
      "Faire revenir les lardons, oignons et carottes.",
      "Remettre la viande, singer avec de la farine, mouiller avec le vin.",
      "Laisser mijoter 3 heures à couvert, ajouter les champignons 30 minutes avant la fin.",
    ],
    author_id: 1,
    created_at: NOW,
    updated_at: NOW,
  },
];

export function seed(): void {
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 2), "utf-8");
  console.log(`Seeded: data/users.json (${users.length} users)`);

  fs.writeFileSync("data/categories.json", JSON.stringify(categories, null, 2), "utf-8");
  console.log(`Seeded: data/categories.json (${categories.length} categories)`);

  fs.writeFileSync("data/recipes.json", JSON.stringify(recipes, null, 2), "utf-8");
  console.log(`Seeded: data/recipes.json (${recipes.length} recipes)`);

  console.log("");
  console.log("Comptes de démonstration :");
  console.log("  admin@miammiam.be / admin  (role: admin)");
  console.log("  alice@vinci.be    / alice  (role: user)");
  console.log("  bob@vinci.be      / bob    (role: user)");
}

// Exécuté seulement si le fichier est lancé directement (pas quand il est importé)
if (require.main === module) {
  seed();
}
