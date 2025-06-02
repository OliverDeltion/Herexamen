const express = require('express');
const app = express();
const router = express.Router();
const db = require('./util/db');
const { get } = require('./controllers/userController');

app.use(express.json());

// ✅ Koppel de router aan de app
router.get('/get', get);
app.use('/api', router); // hierdoor is je endpoint: /api/get

// ✅ Start de server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
