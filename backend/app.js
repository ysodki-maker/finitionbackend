const express = require("express");
const cors = require("cors");

const app = express();
const path = require("path");

// ✅ ACTIVER CORS
app.use(cors({
  origin: "http://localhost:5173" // frontend Vite
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/categories", require("./routes/categories"));
app.use("/images", require("./routes/images"));

app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
