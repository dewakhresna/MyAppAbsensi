import React, { useState, useEffect } from "react";
import "./AreaUserEdit.scss"; // Custom styles for the registration page
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

const AreaUserEdit = ({ isEditMode = false }) => {
  const [nomorInduk, setNomorInduk] = useState("");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [gambar, setGambar] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [currentGambar, setCurrentGambar] = useState("")

  const { id } = useParams();

  useEffect(() => {
    if (isEditMode && id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/readKaryawan/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const employee = data[0];
          setNomorInduk(employee.nik);
          setEmail(employee.email);
          setNama(employee.nama);
          setJenisKelamin(employee.kelamin);
          setNoTelepon(employee.hp);
          setPassword(employee.password);
          setConfirmPassword(employee.password);
          setCurrentGambar(employee.gambar); // Menyimpan nama gambar yang ada di server
        } catch (error) {
          setError('Failed to fetch data.');
        }
      };
      fetchData();
    }
  }, [isEditMode, id]);

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const handleRegistrasi = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append('nik', nomorInduk);
    formData.append('email', email);
    formData.append('nama', nama);
    formData.append('kelamin', jenisKelamin);
    formData.append('hp', noTelepon);
    formData.append('password', password);

    if (gambar) {
      formData.append('gambar', gambar);
    } else if (isEditMode && currentGambar) {
      // Tambahkan nama gambar yang sudah ada di server jika tidak memilih gambar baru
      formData.append('existingGambar', currentGambar);
    }
  
    // Validasi data
    const isNumeric = (str) => /^\d+$/.test(str);
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
  
    try {
      const response = await fetch(
        isEditMode ? `http://localhost:3001/api/update/${id}` : "http://localhost:3001/api/register",
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response body:', data);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      if (data.success) {
        Swal.fire({
          title: isEditMode ? "Berhasil Mengubah Data" : "Registrasi user berhasil.",
          text: isEditMode ? "Data Anda telah diubah." : "Data Anda telah terdaftar.",
          icon: "success",
          confirmButtonText: "Oke",
        }).then(() => {
          window.location.href = isEditMode ? "/home" : "/login";
        });
      } else {
        Swal.fire({
          title: isEditMode ? "Gagal melakukan update." : "Gagal melakukan registrasi.",
          text: `Terjadi kesalahan: ${error.message}`,
          icon: "error",
          confirmButtonText: "Kembali", 
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        confirmButtonText: "Kembali",
      });
    }
  };
  
  

  return (
    <div className="user-registrasi-container">
      <div className="registrasi-box">
        <h2>{isEditMode ? "Edit User" : "Registrasi User"}</h2>
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
          {isEditMode && (
            <>
              <div className="input-group">
                <label htmlFor="gambarRegis">Foto Registrasi</label>
                  <input
                    type="file"
                    id="gambarRegis"
                    onChange={handleFileChange}
                  />
               {currentGambar && (
                <div>
                  <img
                    src={`../../../../backend/uploads/${currentGambar}`} // Sesuaikan URL sesuai path server Anda
                    alt="Gambar yang diunggah"
                    style={{ width: '100px', height: '100px' }} // Anda bisa mengatur ukuran gambar
                  />
                </div>
                
              )}
              </div>
            </>
            )}
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
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
          {!isEditMode && (
            <>
          <div className="input-group">
            <label htmlFor="gambarRegis">Foto Registrasi</label>
              <input
                type="file"
                id="gambarRegis"
                onChange={handleFileChange}
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
            </>
          )}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="registrasi-button">
            {isEditMode ? "Update" : "Registrasi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AreaUserEdit;