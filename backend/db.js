const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "u180391690_crm_core",
  password: "VOgqp;b9",
  database: "u180391690_crm_core"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL connecté");
});

module.exports = db;

