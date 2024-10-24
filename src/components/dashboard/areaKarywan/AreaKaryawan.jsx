import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AreaKaryawanAction from "./AreaKaryawanAction";
import "./AreaKaryawan.scss";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const AreaKaryawan = ({ searchQuery, isLemburMode = false }) => {
  const [karyawanData, setKaryawanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tanggal, setTanggal] = useState({}); // Objek untuk menyimpan tanggal berdasarkan nik

  const handleDateChange = (nik, e) => {
    const newDate = e.target.value;
    console.log("Input Date Changed for NIK:", nik, "Value:", newDate);
    setTanggal((prev) => ({ ...prev, [nik]: newDate })); // Update tanggal untuk karyawan tertentu
  };

  const handleUpdate = async (nik) => {
    console.log("Updating Date for NIK:", nik, "Tanggal:", tanggal[nik]); // Log tanggal yang akan diupdate
  
    try {
      const response = await fetch(`http://localhost:3001/api/settanggal/${nik}`, { // Menggunakan API baru
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tanggal: tanggal[nik] }), // Kirim tanggal untuk nik tertentu
      });
  
      if (response.ok) {
        const data = await response.json();
        // Swal.fire("Sukses",data.message, "success");
        Swal.fire({
          title: "Pemberian Lembur Berhasil",
          icon: "success",
          confirmButtonText: "Oke",
        });
      } else {
        Swal.fire({
          title: "Gagal Memberikan Lembur",
          icon: "error",
          confirmButtonText: "Kembali",
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  const fetchTanggal = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/settanggal");
      const data = await response.json();

      console.log("Raw API Response:", data); // Log data mentah dari API
      if (data.length > 0) {
        data.forEach(item => {
          console.log("Fetched Date for NIK:", item.nik, "Date:", item.tanggal); // Log tanggal yang diambil
          if (item.tanggal) {
            const formattedDate = formatToInputDate(item.tanggal); // Fungsi yang perlu Anda definisikan untuk format tanggal
            setTanggal(prev => ({ ...prev, [item.nik]: formattedDate })); // Simpan tanggal ke state berdasarkan NIK
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTanggal(); // Ambil tanggal saat komponen pertama kali dimuat
  }, []);

  const TABLE_HEADS = isLemburMode
    ? ["No", "No Induk", "Nama", "Email", "Tanggal Pemberian Lembur", "Action"]
    : [
        "No",
        "No Induk",
        "Nama",
        "Email",
        "Jenis Kelamin",
        "No Telepon",
        "Action",
      ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/readKaryawan");
        if (!response.ok) throw new Error("Gagal mengambil data dari server");

        const data = await response.json();
        setKaryawanData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = karyawanData;

    if (searchQuery) {
      filtered = filtered.filter((karyawan) =>
        karyawan.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, karyawanData]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kehadiran");
    XLSX.writeFile(workbook, "data_karyawan.xlsx");
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">{isLemburMode ? "Pemberian Lembur" : "Data Karyawan"}</h4>
        {!isLemburMode && (
          <button className="btn-tambahkaryawan">
            <Link to="/tambahkaryawan">Tambah Karyawan</Link>
          </button>
        )}
        {!isLemburMode && (
          <button onClick={exportToExcel} className="export-btn">
            Export to Excel
          </button>
        )}
      </div>
      <div className="data-table-diagram">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                {TABLE_HEADS.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dataKaryawan, index) => (
                <tr key={dataKaryawan.id}>
                  <td>{index + 1}</td>
                  <td>{dataKaryawan.nik}</td>
                  <td>{dataKaryawan.nama}</td>
                  <td>{dataKaryawan.email}</td>
                  {!isLemburMode && (
                    <>
                      <td>{dataKaryawan.kelamin}</td>
                      <td>{dataKaryawan.hp}</td>
                      <td className="dt-cell-action">
                        <AreaKaryawanAction id={dataKaryawan.id} />
                      </td>
                    </>
                  )}
                  {isLemburMode && (
                    <>
                      <td>
                        <input
                          type="date"
                          value={tanggal[dataKaryawan.nik] || ""} // Menggunakan tanggal yang disimpan untuk NIK karyawan
                          onChange={(e) => handleDateChange(dataKaryawan.nik, e)} // Menyediakan NIK karyawan saat menangani perubahan
                        />
                      </td>
                      <td>
                        <button className="btn-lembur" onClick={() => handleUpdate(dataKaryawan.nik)}>Berikan Lembur</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AreaKaryawan;

// Fungsi untuk memformat tanggal ke format input yang sesuai
const formatToInputDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(date).toLocaleDateString('en-CA', options); // Format ke YYYY-MM-DD
  return formattedDate;
};
