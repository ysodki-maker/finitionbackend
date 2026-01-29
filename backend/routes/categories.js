const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * ✅ GET toutes les catégories
 * URL: GET /categories
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM categories ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/**
 * ✅ POST plusieurs catégories en une seule requête
 * URL: POST /categories/bulk
 * Body:
 * {
 *   "categories": ["Nature", "Sport", "Animaux"]
 * }
 */
router.post("/bulk", (req, res) => {
  const { categories } = req.body;

  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ error: "Tableau de catégories requis" });
  }

  const values = categories.map(name => [name]);

  db.query(
    "INSERT INTO categories (name) VALUES ?",
    [values],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        message: `${result.affectedRows} catégories créées`
      });
    }
  );
});

module.exports = router;
