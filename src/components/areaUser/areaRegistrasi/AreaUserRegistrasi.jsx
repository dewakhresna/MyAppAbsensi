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
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleRegistrasi = async (e) => {
    e.preventDefault();
  
    // Validasi nomor telepon dan NIK
    const isNumeric = (str) => /^\d+$/.test(str); // Fungsi untuk mengecek apakah input hanya angka
  
    if (!isNumeric(nomorInduk)) {
      setError("Nomor Induk Karyawan harus berupa angka.");
      return;
    }
  
    if (!isNumeric(noTelepon)) {
      setError("Nomor Telepon harus berupa angka.");
      return;
    }
  
    if (password !== confirmpassword) {
      setError("Konfirmasi password tidak sesuai.");
      return;
    }
  
    const userData = {
      nik: nomorInduk,
      email: email,
      nama: nama,
      kelamin: jenisKelamin,
      hp: noTelepon,
      password: password,
    };
  
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log("Registrasi berhasil");
        // Reset form
        setNomorInduk("");
        setEmail("");
        setNama("");
        setJenisKelamin("");
        setNoTelepon("");
        setPassword("");
        setConfirmPassword("");
        setError(null);
        alert("Registrasi user berhasil.");
        window.location.href = "/login";
      } else {
        setError("Gagal melakukan registrasi.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan. Coba lagi.");
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
          {/* <div className="input-group">
            <label htmlFor="gambar">Upload Gambar</label>
            <input
              type="file"
              id="gambar"
              onChange={(e) => setGambar(e.target.files[0])}
              required
            />
          </div> */}
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

          <div className="input-group">
            <label htmlFor="confirmpassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
