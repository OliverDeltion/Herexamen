const { v4: uuidv4 } = require("uuid");
const { pool } = require("./server/db");
const bcrypt = require("bcrypt");

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // USERS
    await pool.query(`DROP TABLE IF EXISTS users`);
    await pool.query(`
      CREATE TABLE users (
        private_id INT AUTO_INCREMENT PRIMARY KEY,
        public_id VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    for (let i = 0; i < 50; i++) {
      let uuid = uuidv4().toString();
      let password = await bcrypt.hash(i.toString(), 12);
      await pool.query(`
        INSERT INTO users (public_id, username, email, password)
        VALUES (?, ?, ?, ?)`,
        [uuid, `user${i}`, `user${i}@user.com`, password]
      );
      console.log(`Inserted user ${i}...`);
    }
    console.log("Users table created...");

    // SUBJECTS
    await pool.query("DROP TABLE IF EXISTS subjects");
    await pool.query(`
      CREATE TABLE subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attendees JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    for (let i = 0; i < 50; i++) {
      await pool.query(
        `INSERT INTO subjects (name, attendees) VALUES (?, ?)`,
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
    console.log("Subjects table created...");

    // ATTENDANCE
    await pool.query("DROP TABLE IF EXISTS attendance");
    await pool.query(`
      CREATE TABLE attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentnummer VARCHAR(20) NOT NULL,
        aanwezigheid INT NOT NULL,
        roosterminuten INT NOT NULL,
        week INT NOT NULL,
        jaar INT NOT NULL,
        upload_bestand VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE (studentnummer, week, jaar)
      )
    `);
    console.log("Attendance table created...");

    console.log("Database setup complete");

  } catch (error) {
    console.error("Error during database setup:", error);
  }
}

setupDatabase();
