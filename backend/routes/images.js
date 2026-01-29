const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");

const router = express.Router();

// --------------------
// Config Multer
// --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category_id } = req.body;

    if (!category_id) {
      return cb(new Error("category_id requis"));
    }

    const dir = `uploads/${category_id}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non autorisé"));
    }
  }
});

// --------------------
// Upload d'une ou plusieurs images
// --------------------
router.post("/", upload.array("images", 10), (req, res) => {
  const { category_id } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Aucune image uploadée" });
  }

  // Vérifier que la catégorie existe
  db.query(
    "SELECT * FROM categories WHERE id = ?",
    [category_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(400).json({ error: "Category_id invalide" });
      }

      // Préparer les valeurs pour MySQL
      const values = req.files.map(file => [file.filename, category_id]);

      db.query(
        "INSERT INTO images (filename, category_id) VALUES ?",
        [values],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: `${req.files.length} images uploadées` });
        }
      );
    }
  );
});

// --------------------
// Récupérer les images (optionnel : filtrer par catégorie)
// --------------------
router.get("/", (req, res) => {
  const { category } = req.query;
  const sql = category
    ? "SELECT * FROM images WHERE category_id = ?"
    : "SELECT * FROM images";

  db.query(sql, category ? [category] : [], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
