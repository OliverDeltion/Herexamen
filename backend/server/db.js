const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
  user: "root",
  password: "", 
  database: "aardata", 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = {pool};
