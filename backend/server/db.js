const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "AARdata",
  connectionLimit: 10,
});

module.exports = { pool };
