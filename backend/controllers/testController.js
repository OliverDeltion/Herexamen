const { pool } = require("../server/db");
var XLSX = require("xlsx");
async function getUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fout bij ophalen van users" });
  }
}
async function test(req, res) {
  res.status(200).json({ error: "Fout bij ophalen van users" });

}
async function handleUpload(req, res) {
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'Geen bestand geüpload.' });

  try {
    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);


    let inserts = 0;
    let updates = 0;

    for (const row of rows) {
      const { studentnummer, aanwezigheid, rooster, week, jaar } = row;

      if (!studentnummer || aanwezigheid == null || !rooster || !week || !jaar) continue;
      let [results] = await pool.query('SELECT * FROM attendance WHERE week = ? AND jaar = ? AND studentnummer = ?', [week, jaar, studentnummer]);
      console.log(results);
      if (!results) {
        await pool.query(
          'INSERT INTO attendance (studentnummer, aanwezigheid, roosterminuten, week, jaar) VALUES (?, ?, ?, ?, ?)',
          [studentnummer, aanwezigheid, rooster, week, jaar]
        );
      }
      else {
        await pool.query(
          `UPDATE attendance
   SET aanwezigheid = ?, roosterminuten = ?
   WHERE studentnummer = ? AND week = ? AND jaar = ?`,
          [aanwezigheid, rooster, studentnummer, week, jaar]
        );

      }
    }



    res.json({ message: 'Upload verwerkt', inserts, updates });
  } catch (err) { console.log("error" + err) }

}

async function getAttendance(req, res) {
  try {
    const rows = await pool.query("SELECT * FROM attendance");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fout bij ophalen van subjects" });
  }
}

module.exports = { getUsers, getAttendance, handleUpload, test };
