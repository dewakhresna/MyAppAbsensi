const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // ganti dengan user MySQL-mu
  password: '', // ganti dengan password MySQL-mu
  database: 'lomba_usb', // ganti dengan nama database-mu
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

//insert
app.post('/api/register', (req, res) => {
  const { nik, email, nama, kelamin, hp, password } = req.body;

  const sql = 'INSERT INTO data_karyawan (nik, email, nama, kelamin, hp, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nik, email, nama, kelamin, hp, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Data successfully inserted' });
  });
});

//read
app.get('/api/readKaryawan', (req, res) => {
  const sql = 'SELECT * FROM data_karyawan';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

//login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM data_karyawan WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error checking login credentials:', err);
      return res.status(500).send(err);
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login berhasil', user: results[0] });
    } else {
      res.json({ success: false, message: 'Email atau password salah' });
    }
  });
});


// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
