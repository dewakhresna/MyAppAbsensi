const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});

const storageSakit = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "DataSakit/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({ storage: storage });
const uploadsakit = multer({ storage: storageSakit });

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // ganti dengan user MySQL-mu
  password: "", // ganti dengan password MySQL-mu
  database: "lomba_usb", // ganti dengan nama database-mu
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});


//insert izin approve
app.post('/api/approve2', (req, res) => {
  console.log("Request body:", req.body); // Log the incoming request body
  const { nik, nama, tanggal, tanggal_pengajuan, alasan } = req.body;

  const sql = "INSERT INTO approve2 (nik, nama, tanggal, tanggal_pengajuan, alasan) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nik, nama, tanggal, tanggal_pengajuan, alasan], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Data successfully inserted' });
  });
});

app.post('/api/acceptapprove', (req, res) => {
  console.log("Request body:", req.body); // Log the incoming request body
  const { nik, nama, tanggal, alasan } = req.body;

  const sql = `INSERT INTO dashbord_sakit (nik, nama, tanggal, keterangan, alasan) VALUES (?, ?, ?, "Izin", ?)`;
  db.query(sql, [nik, nama, tanggal, alasan], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Data successfully inserted' });
  });
});

//read izin approve
app.get('/api/readapprove', (req, res) => {
  const sql = 'SELECT * FROM approve2';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


//delete approve
app.delete('/api/approve/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM approve2 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Data successfully deleted' });
  });
});



app.post('/api/approve', (req, res) => {
  const { izin, tanggal } = req.body;
  
  console.log(`Menerima izin: ${izin}, tanggal: ${tanggal}`); // Menampilkan tanggal yang diterima

  const sql = 'INSERT INTO coba (izin, tanggal) VALUES (?, ?)';
  db.query(sql, [izin, tanggal], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true, message: 'Data successfully inserted' });
  });
});

//insert
app.post("/api/register", upload.single("gambar"), (req, res) => {
  // Ambil data dari body dan file
  const { nik, email, nama, kelamin, hp, password } = req.body;
  const gambarPath = req.file ? req.file.filename : null; // Nama file gambar

  // Query SQL untuk menyimpan data ke database
  const sql =
    "INSERT INTO data_karyawan (nik, email, nama, kelamin, gambar, hp, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nik, email, nama, kelamin, gambarPath, hp, password],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send(err);
      }
      res.json({ success: true, message: "Data successfully inserted" });
    }
  );
});

//read
app.get("/api/readKaryawan", (req, res) => {
  const sql = "SELECT * FROM data_karyawan";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

//login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM data_karyawan WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Error checking login credentials:", err);
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      const { id, nama, nik } = results[0]; // Ambil nama dan nik dari hasil query
      res.json({ success: true, message: "Login berhasil", nama, nik, id }); // Kirim nama dan nik ke frontend
    } else {
      res.json({ success: false, message: "Email atau password salah" });
    }
  });
});

//baca detail
app.get("/api/readKaryawan/:id", (req, res) => {
  const { id } = req.params;
  const sql1 = "SELECT * FROM data_karyawan WHERE id = ?";
  db.query(sql1, [id], (err, results) => {
    if (err) {
      console.error("Error fetching data from tanggal_admin:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.json(results);
  });
});

// update
app.put("/api/update/:id", upload.single("gambar"), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  const { id } = req.params;
  const { nik, email, nama, kelamin, hp, password } = req.body;
  const gambarPath = req.file ? req.file.filename : null;
  const gambarUpdate = gambarPath || req.body.existingGambar;

  const sql = `
    UPDATE data_karyawan
    SET nik = ?, email = ?, nama = ?, kelamin = ?, gambar = ?, hp = ?, password = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [nik, email, nama, kelamin, gambarUpdate, hp, password, id],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).send(err);
      }
      res.json({ success: true, message: "Data successfully updated" });
    }
  );
});

//delete
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM data_karyawan WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).send("Delete failed");
    }
    res.json({ success: true });
  });
});

//tambah hadir
app.post("/api/karyawan_hadir", (req, res) => {
  const { nama, nik } = req.body;

  const query = `
    INSERT INTO absensi (nama, nik, check_in, tanggal, keterangan)
    VALUES (?, ?, CURTIME(), CURDATE(),
    CASE
        WHEN CURTIME() <= '08:00:00' THEN 'Tepat Waktu'
        ELSE 'Terlambat'
    END
);`;
  db.query(query, [nama, nik], (error) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Gagal melakukan check-in" });
    }
    res.json({ success: true, message: "Check-in berhasil" });
  });
});

app.put("/api/karyawan_keluar/:nik", (req, res) => {
  const { nik } = req.body;

  const query = `
    UPDATE absensi
    SET check_out = CURTIME()
    WHERE nik = ? AND check_out IS NULL;
  `;

  db.query(query, [nik], (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Gagal melakukan check-out" });
    }

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Check-out berhasil" });
    } else {
      res.json({
        success: false,
        message: "Gagal melakukan check-out atau sudah check-out sebelumnya.",
      });
    }
  });
});

//read absen
app.get("/api/readAbsensi", (req, res) => {
  const sql = "SELECT * FROM absensi";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

//insert sakit
app.post("/api/sakit", uploadsakit.single("surat"), (req, res) => {
  const { nik, nama, keterangan, alasan } = req.body;
  const gambarPath = req.file ? req.file.filename : "-"; // Nama file gambar

  const sql =
    "INSERT INTO dashbord_sakit (nik, nama, tanggal, keterangan, alasan, surat) VALUES (?, ?, CURDATE(), ?, ?, ?)";
  db.query(sql, [nik, nama, keterangan, alasan, gambarPath], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({
        success: false,
        message: "Database insertion failed",
        error: err,
      });
    }
    res.json({ success: true, message: "Data successfully inserted" });
  });
});

app.get("/api/readsakit", (req, res) => {
  const sql = "SELECT * FROM dashbord_sakit";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});




// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
