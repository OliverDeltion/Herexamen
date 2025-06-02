const { v4: uuidv4 } = require("uuid");
const { pool } = require("./server/db");
const bcrypt = require("bcrypt");

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // USERS
    // drop users table if exists
    await pool.query(`
      DROP TABLE IF EXISTS users
    `);
    // create users table
    await pool.query(`
      CREATE TABLE users (
      private_id INT AUTO_INCREMENT PRIMARY KEY,
      public_id VARCHAR(255) NOT NULL UNIQUE,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    for (let i = 0; i < 50; i++) {
      let uuid = uuidv4().toString();
      let password = await bcrypt.hash(i.toString(), 12);
      await pool.query(`
      INSERT INTO users (public_id, username, email, password) VALUES (
        '${uuid}',
        'user${i}',
        'user${i}@user.com',
        '${password}'
      )`);
      console.log(`Inserted user ${i}...`);
    }
    console.log("Users table created...");
    // END USERS

    // SUBJECTS
    await pool.query("DROP TABLE IF EXISTS subjects");

    await pool.query(`
      CREATE TABLE subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attendees JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    for (let i = 0; i < 50; i++) {
      await pool.query(
        `
        INSERT INTO subjects (name, attendees)
        VALUES (?, ?)
      `,
        [
          `Subject ${i}`,
          JSON.stringify([
            { id: "1", name: "User1" },
            { id: "2", name: "User2" },
            { id: "3", name: "User3" },
          ]),
        ]
      );
      console.log(`Inserted subject ${i}...`);
    }
    console.log("Created subjects table...");
    // END SUBJECTSs

    console.log("Database setup complete");
  } catch (error) {
    console.error("Error dropping table:", error);
  }
}

setupDatabase();
