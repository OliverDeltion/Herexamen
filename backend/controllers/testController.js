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
function bepaalCategorie(percentage) {
  if (percentage >= 100) return "Perfect";
  if (percentage >= 95) return "Excellent";
  if (percentage >= 80) return "Goed";
  if (percentage >= 65) return "Voldoende";
  if (percentage >= 50) return "Onvoldoende";
  if (percentage > 0) return "Kritiek";
  return "Geen aanwezigheid";
}

async function getStudentStats(req, res) {
  const { studentnummer } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT
         studentnummer,
         SUM(aanwezigheid) AS totaal_aanwezig,
         SUM(roosterminuten) AS totaal_rooster
       FROM attendance
       WHERE studentnummer = ?
       GROUP BY studentnummer`,
      [studentnummer]
    );

    //  Check eerst of er een resultaat is
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Student niet gevonden." });
    }
    //  Pas daarna destructure je het resultaat
    const { totaal_aanwezig, totaal_rooster } = rows;

    const percentage = Math.round((totaal_aanwezig / totaal_rooster) * 1000) / 10;
    const categorie = bepaalCategorie(percentage);

    res.json({ studentnummer, percentage, categorie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interne fout bij ophalen student stats" });
  }
}


async function getAllStudentPercentages(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT
        studentnummer,
        SUM(aanwezigheid) AS totaal_aanwezig,
        SUM(roosterminuten) AS totaal_rooster
      FROM attendance
      GROUP BY studentnummer
    `);

    const result = rows.map((row) => {
      const percentage = Math.round((row.totaal_aanwezig / row.totaal_rooster) * 1000) / 10;
      return {
        studentnummer: row.studentnummer,
        percentage,
        categorie: bepaalCategorie(percentage)
      };
    });

    // Sorteer op hoogste percentage
    result.sort((a, b) => b.percentage - a.percentage);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fout bij ophalen van studentpercentages" });
  }
}



module.exports = { getUsers, getAttendance, handleUpload, test, getStudentStats, getAllStudentPercentages };
