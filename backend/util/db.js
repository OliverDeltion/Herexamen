const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'examen', // vervang dit door jouw echte database naam
});

module.exports = pool.promise(); // let op: .promise() is belangrijk!
