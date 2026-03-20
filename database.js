const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db');

console.log("🔄 Initialisation de la base de données...");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    category TEXT,
    tags TEXT
  )`);
  console.log("✅ Table 'articles' créée ou déjà existante");
});

console.log("🎉 Fichier blog.db créé avec succès !");

module.exports = db;
