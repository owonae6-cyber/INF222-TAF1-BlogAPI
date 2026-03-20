const express = require('express');
const router = express.Router();
const db = require('../database');

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, author]
 *             properties:
 *               title: { type: string, example: "Mon premier article" }
 *               content: { type: string, example: "Ceci est le contenu..." }
 *               author: { type: string, example: "Esther" }
 *               category: { type: string, example: "Tech" }
 *               tags: { type: string, example: "Node.js,API" }
 *     responses:
 *       201: { description: Article créé avec succès }
 *       400: { description: Champs obligatoires manquants }
 */
router.post('/', (req, res) => {
  const { title, content, author, category, tags } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: "Titre, contenu et auteur sont obligatoires" });
  }

  db.run(`INSERT INTO articles (title, content, author, category, tags) VALUES (?, ?, ?, ?, ?)`,
    [title, content, author, category, tags],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: "Article créé avec succès !" });
    });
});

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles (filtre par catégorie ou auteur possible)
 *     tags: [Articles]
 *     parameters:
 *       - name: category
 *         in: query
 *         schema: { type: string }
 *       - name: author
 *         in: query
 *         schema: { type: string }
 *     responses:
 *       200: { description: Liste des articles }
 */
router.get('/', (req, res) => {
  const { category, author } = req.query;
  let sql = "SELECT * FROM articles";
  let params = [];
  if (category) { sql += " WHERE category=?"; params.push(category); }
  if (author) { sql += params.length ? " AND author=?" : " WHERE author=?"; params.push(author); }

  db.all(sql, params, (err, rows) => res.json(rows));
});

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Article trouvé }
 *       404: { description: Article non trouvé }
 */
router.get('/:id', (req, res) => {
  db.get("SELECT * FROM articles WHERE id=?", [req.params.id], (err, row) => {
    row ? res.json(row) : res.status(404).json({ error: "Article non trouvé" });
  });
});

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               category: { type: string }
 *               tags: { type: string }
 *     responses:
 *       200: { description: Article modifié }
 */
router.put('/:id', (req, res) => {
  const { title, content, category, tags } = req.body;
  db.run(`UPDATE articles SET title=?, content=?, category=?, tags=? WHERE id=?`,
    [title, content, category, tags, req.params.id],
    function(err) {
      res.json({ message: err ? "Erreur" : "Article modifié avec succès" });
    });
});

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Article supprimé }
 */
router.delete('/:id', (req, res) => {
  db.run("DELETE FROM articles WHERE id=?", [req.params.id], function(err) {
    res.json({ message: err ? "Erreur" : "Article supprimé avec succès" });
  });
});

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par titre ou contenu
 *     tags: [Articles]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Résultats de la recherche }
 */
router.get('/search', (req, res) => {
  const search = `%${req.query.query}%`;
  db.all("SELECT * FROM articles WHERE title LIKE ? OR content LIKE ?", [search, search],
    (err, rows) => res.json(rows));
});

module.exports = router;