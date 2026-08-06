const express = require('express');
const cors = require('cors');
const { db, initDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

initDb();

app.get('/api/courses', (req, res) => {
  db.all("SELECT * FROM courses", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ courses: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
