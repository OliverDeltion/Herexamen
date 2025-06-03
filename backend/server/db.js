const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
  user: "root",
  password: "", // pas aan indien nodig
  database: "aardata", // pas aan indien nodig
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = {pool};
