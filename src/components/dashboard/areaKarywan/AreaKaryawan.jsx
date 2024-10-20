import React, { useEffect, useState } from "react";
import AreaKaryawanAction from "./AreaKaryawanAction";
import "./AreaKaryawan.scss";
import * as XLSX from "xlsx";

const TABLE_HEADS = [
  "No",
  "No Induk",
  "Nama",
  "Email",
  "Jenis Kelamin",
  "No Telepon",
  "Action",
];

const AreaKaryawan = ({ searchQuery }) => { 
  const [karyawanData, setKaryawanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <h4 className="data-table-title">Data Karyawan</h4>
        <button onClick={exportToExcel} className="export-btn">
          Export to Excel
        </button>
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
                  <td>{dataKaryawan.kelamin}</td>
                  <td>{dataKaryawan.hp}</td>
                  <td className="dt-cell-action">
                    <AreaKaryawanAction id={dataKaryawan.id} />
                  </td>
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
