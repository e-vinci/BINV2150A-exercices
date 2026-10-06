// Remet db.json dans son état initial : npm run reset
const fs = require("fs");
fs.copyFileSync("db.initial.json", "db.json");
console.log("db.json réinitialisé");
