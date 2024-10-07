# Attendance Genius
Aplikasi website absensi berbasis lokasi yang menggunakan teknologi AI untuk verifikasi wajah. Aplikasi ini memungkinkan pengguna untuk melakukan absensi secara otomatis dengan menggunakan fitur verifikasi wajah dan geolokasi. Absensi berhasil dilakukan jika wajah pengguna sesuai dengan akun login dan berada di lokasi yang ditentukan.

## Daftar Isi
- [Fitur](#fitur)
  - [Fitur untuk Karyawan](#userkaryawan)
  - [Fitur untuk Admin](#admin)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Instalasi](#instalasi)
- [Tim Projek](#tim-projek)

## Fitur
### User/Karyawan
- [x] Verifikasi wajah menggunakan AI
- [x] Absensi berbasis lokasi (geolocation)
- [x] Login dengan akun pengguna
- [x] Absensi otomatis jika wajah terverifikasi dan berada di lokasi yang diizinkan
- [x] Manajemen karyawan (CRUD)
- [x] Upload surat sakit
- [x] Check-in dan check-out absensi

### Admin
Admin memiliki akses penuh untuk mengelola absensi, data karyawan, dan izin/sakit yang diunggah oleh karyawan. Fitur utama untuk Admin meliputi:
- **Tab Kehadiran**: 
  - Admin dapat melihat daftar karyawan yang telah melakukan check-in dan check-out beserta tanggal dan jam.
- **Tab Izin/Sakit**:
  - Admin dapat melihat alasan izin atau sakit dari karyawan.
  - Admin dapat melihat dan mengunduh surat sakit yang diunggah oleh karyawan.
- **Tab Karyawan**:
  - Admin dapat melihat daftar karyawan yang telah registrasi di aplikasi.
  - Admin memiliki kemampuan untuk mengedit informasi karyawan (misalnya, NIK, email, nama, dll.).

## Teknologi yang Digunakan
### Frontend
- [React.js](https://react.dev/) dengan [Vite.js](https://vitejs.dev/) - Build tool untuk membangun aplikasi web yang cepat dan efisien.
- [JavaScript](https://www.javascript.com/) - Bahasa pemrograman untuk interaksi di sisi pengguna.
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) - Struktur dasar aplikasi web.
- [CSS dengan SCSS](https://sass-lang.com/ ) - Preprocessor CSS untuk Styling tampilan antarmuka.

### Backend
- [Node.js](https://nodejs.org/) dengan [Express.js](https://expressjs.com/) - Backend server-side JavaScript untuk mengelola API absensi.
- [MySQL](https://www.mysql.com/) - Sistem manajemen basis data relasional untuk menyimpan data pengguna dan absensi.
- [Multer](https://github.com/expressjs/multer) - Middleware Node.js untuk mengelola upload file (gambar profil dan surat sakit).
- [Flask](https://flask.palletsprojects.com/) dengan [DeepFace](https://github.com/serengil/deepface) - API Python untuk verifikasi wajah berbasis AI.

## Instalasi
Pastikan sudah menginstal:
- [Node.js](https://nodejs.org/)
- [Python 3](https://www.python.org/)
- [MySQL](https://www.mysql.com/)

### Clone Repository
```bash
git clone https://github.com/dewakhresna/MyAppAbsensi.git
```

### Setup Website:
- Buka terminal, jalankan perintah berikut untuk menginstal dependensi:
  ```
  npm i
  ```
- Setelah dependensi terinstal, jalankan aplikasi:
  ```
  npm run dev
  ```
### Setup Backend Node.js (Database)
- Arahkan ke direktori backend:
  ```bash
  cd backend
  ```
- Install dependensi backend
  ```bash
  npm i
  ```
- Setup database, nyalakan Apache dan MySql kemudian import file lomba_usb.sql

- Setelah selesai jalankan backend:
  ```
  node ServerKaryawan.js
  ```

### Setup Face Verification API
- Arahkan ke direktori face-verification-api
  ```bash
  cd face-verification-api
  ```
- Install requirements library
  ```bash
  pip install -r requirements.txt
  ```
- Setup environtment file (.env)
  Example:
  ```bash
  DB=database_name
  HOST=host
  PASSWORD=password
  PORT=port
  USER=user
  ```
- Jalankan Flask API
  ```bash
  python app.py
  ```

## Tim Projek
- I Dewa Gede Khresna Bayu (Front-End)
- Nugroho Adi Wirapratama (AI & API Model)
- Lutfi Robbani (Back-End)
