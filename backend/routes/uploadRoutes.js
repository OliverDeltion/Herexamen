const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const pool = require('../server/db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
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

      const [existing] = await pool.query(
        `SELECT * FROM attendance WHERE studentnummer = ? AND week = ? AND jaar = ?`,
        [studentnummer, week, jaar]
      );

      if (existing.length > 0) {
        if (aanwezigheid > existing[0].aanwezigheid) {
          await pool.query(
            `UPDATE attendance SET aanwezigheid = ?, roosterminuten = ?, upload_bestand = ? WHERE id = ?`,
            [aanwezigheid, rooster, file.originalname, existing[0].id]
          );
          updates++;
        }
      } else {
        await pool.query(
          `INSERT INTO attendance (studentnummer, aanwezigheid, roosterminuten, week, jaar, upload_bestand)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [studentnummer, aanwezigheid, rooster, week, jaar, file.originalname]
        );
        inserts++;
      }
    }

    res.json({ message: 'Upload verwerkt', inserts, updates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fout bij uploadverwerking' });
  }
});

module.exports = router;
