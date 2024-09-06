import React, { useState } from "react";
import "./AreaUserRegistrasi.scss"; // Custom styles for the registration page

const AreaUserRegistrasi = () => {
  const [nomorInduk, setNomorInduk] = useState("");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [gambar, setGambar] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegistrasi = (e) => {
    e.preventDefault();

    // Validasi sederhana dan simpan data (ganti dengan logic registrasi sesungguhnya)
    if (nomorInduk && email && nama && jenisKelamin && noTelepon && password) {
      console.log("Registrasi berhasil");
      // Reset form
      setNomorInduk("");
      setEmail("");
      setNama("");
      setJenisKelamin("");
      setNoTelepon("");
      setGambar(null);
      setPassword("");
      setError(null);
    } else {
      setError("Harap lengkapi semua field.");
    }
  };

  return (
    <div className="user-registrasi-container">
      <div className="registrasi-box">
        <h2>Registrasi User</h2>
        <form onSubmit={handleRegistrasi}>
          <div className="input-group">
            <label htmlFor="nomorInduk">Nomor Induk Karyawan</label>
            <input
              type="text"
              id="nomorInduk"
              value={nomorInduk}
              onChange={(e) => setNomorInduk(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="jenisKelamin">Jenis Kelamin</label>
            <select
              id="jenisKelamin"
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
              required
            >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="noTelepon">No. Telepon</label>
            <input
              type="text"
              id="noTelepon"
              value={noTelepon}
              onChange={(e) => setNoTelepon(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="gambar">Upload Gambar</label>
            <input
              type="file"
              id="gambar"
              onChange={(e) => setGambar(e.target.files[0])}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="registrasi-button">
            Registrasi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AreaUserRegistrasi;
