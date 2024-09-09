const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder tempat menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  }
});

const upload = multer({ storage: storage });

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
app.post('/api/register', upload.single('gambar'), (req, res) => {
  // Ambil data dari body dan file
  const { nik, email, nama, kelamin, hp, password } = req.body;
  const gambarPath = req.file ? req.file.filename : null; // Nama file gambar

  // Query SQL untuk menyimpan data ke database
  const sql = 'INSERT INTO data_karyawan (nik, email, nama, kelamin, gambar, hp, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nik, email, nama, kelamin, gambarPath, hp, password], (err, result) => {
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
      const { nama, nik } = results[0]; // Ambil nama dan nik dari hasil query
      res.json({ success: true, message: 'Login berhasil', nama, nik }); // Kirim nama dan nik ke frontend
    } else {
      res.json({ success: false, message: 'Email atau password salah' });
    }
  });
});

//baca detail
app.get('/api/readKaryawan/:id', (req, res) => {
  const { id } = req.params;
  const sql1 = 'SELECT * FROM data_karyawan WHERE id = ?';
  db.query(sql1, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data from tanggal_admin:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json(results);
  });
});

// update
app.put('/api/update/:id', upload.single('gambar'), (req, res) => {
  const { id } = req.params;
  const { nik, email, nama, kelamin, hp, password } = req.body;
  const gambarPath = req.file ? req.file.filename : null; // Nama file gambar jika ada

  // Query SQL untuk update data di database
  const sql = `
    UPDATE data_karyawan
    SET nik = ?, email = ?, nama = ?, kelamin = ?, gambar = ?, hp = ?, password = ?
    WHERE id = ?
  `;
  db.query(sql, [nik, email, nama, kelamin, gambarPath, hp, password, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Data successfully updated' });
  });
});

//delete
app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM data_karyawan WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).send('Delete failed');
    }
    res.json({ success: true });
  });
});

//tambah hadir
app.post('/api/karyawan_hadir', (req, res) => {
  const { nama, nik } = req.body; // Hanya menerima nama

  // Menggunakan DATE(NOW()) dan TIME(NOW()) untuk mendapatkan tanggal dan jam saat ini
  const sql = 'INSERT INTO karyawan_hadir (nama, nik, tanggal, jam) VALUES (?, ?, DATE(NOW()), TIME(NOW()))';
  db.query(sql, [nama, nik], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Data successfully inserted' });
  });
});



// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
