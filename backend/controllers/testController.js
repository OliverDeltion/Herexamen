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
          week,
          jaar,
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
    const { week, jaar, totaal_aanwezig, totaal_rooster } = rows;

    const percentage = Math.round((totaal_aanwezig / totaal_rooster) * 1000) / 10;
    const categorie = bepaalCategorie(percentage);

    res.json({ week, jaar, studentnummer, percentage, categorie, totaal_aanwezig,totaal_rooster });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interne fout bij ophalen student stats" });
  }
}

async function updateAndPublishAttendance(req, res) {
  const { studentnummer, week, jaar, aanwezigheid, rooster } = req.body;

  if (!studentnummer || !week || !jaar || aanwezigheid == null || rooster == null) {
    return res.status(400).json({ error: "Ontbrekende gegevens" });
  }

  try {
    const [result] = await pool.query(`
      UPDATE attendance
      SET aanwezigheid = ?, 
          roosterminuten = ?, 
          published_at = NOW()
      WHERE studentnummer = ? AND week = ? AND jaar = ?
    `, [aanwezigheid, rooster, studentnummer, week, jaar]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Geen bijbehorend record gevonden" });
    }

    res.json({ message: "Geüpdatet én gepubliceerd", studentnummer, week, jaar });
  } catch (err) {
    console.error("Fout bij update/publish:", err);
    res.status(500).json({ error: "Interne fout bij update/publish" });
  }
}

async function getAllStudentPercentages(req, res) {
  try {
    const rows = await pool.query(`
  SELECT 
    studentnummer,
    week,
    jaar,
    SUM(aanwezigheid) AS totaal_aanwezigheid,
    SUM(roosterminuten) AS totaal_roosterminuten
  FROM 
    attendance
  GROUP BY 
    studentnummer, week, jaar
`);

    let data = [];

    for (let row of rows) {
      const aanwezig = Number(row.totaal_aanwezigheid);
      const rooster = Number(row.totaal_roosterminuten);

      const percentage = Math.round((aanwezig / rooster) * 1000) / 10;

      data.push({
        week: row.week,
        jaar: row.jaar,
        studentnummer: row.studentnummer,
        percentage,
        aanwezigheid: aanwezig,
        roosterminuten: rooster,
      });
    }

    // Sorteer op studentnummer en week
    data.sort((a, b) => {
      if (a.studentnummer === b.studentnummer) {
        return a.week - b.week;
      }
      return a.studentnummer.localeCompare(b.studentnummer);
    });

    res.json(data);
  } catch (err) {
    console.error("Fout bij ophalen:", err);
    res.status(500).json({ error: "Fout bij ophalen van studentpercentages per week" });
  }
}


module.exports = { getUsers, getAttendance, handleUpload, test, getStudentStats, getAllStudentPercentages };
