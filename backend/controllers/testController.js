const { pool } = require("../server/db");

async function getUsers(req, res) {
  res.json(await pool.query("SELECT * FROM users"));
}

async function getSubjects(req, res) {
  res.json(await pool.query("SELECT * FROM subjects"));
}

module.exports = { getUsers, getSubjects };
