import fs from "fs";

const DATA_FILES = ["data/users.json", "data/categories.json", "data/recipes.json"];

export function clear(): void {
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }
  for (const file of DATA_FILES) {
    fs.writeFileSync(file, "[]", "utf-8");
    console.log(`Cleared: ${file}`);
  }
}

// Exécuté seulement si le fichier est lancé directement (pas quand il est importé)
if (require.main === module) {
  clear();
}
