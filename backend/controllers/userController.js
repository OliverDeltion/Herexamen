const db = require('../util/db'); // db IS al een promise-based pool

async function get(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM users"); // GEEN .promise()
    return res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Fout bij query:", error);
    return res.status(500).json({ error: "Databasefout" });
  }
}

module.exports = { get };
