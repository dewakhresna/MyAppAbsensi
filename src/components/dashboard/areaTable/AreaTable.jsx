import React, { useState, useEffect } from "react";
import "./AreaTable.scss";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const TABLE_HEADS = [
  "No",
  "No Induk",
  "Nama",
  "Tanggal Absensi",
  "CheckIn",
  "CheckOut",
  "Keterangan",
];

const AreaTable = ({ startDate, endDate, searchQuery }) => {
  const [absensidata, setabsensidata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/readAbsensi");
        if (!response.ok) throw new Error("Gagal mengambil data dari server");

        const data = await response.json();
        setabsensidata(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = absensidata;

    if (startDate && endDate) {
      filtered = filtered.filter((absendata) => {
        const absensiDate = new Date(absendata.tanggal);
        return absensiDate >= startDate && absensiDate <= endDate;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((absendata) =>
        absendata.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [startDate, endDate, searchQuery, absensidata]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kehadiran");
    XLSX.writeFile(workbook, "data_kehadiran.xlsx");
  };

  const handleLocation = async() => {
    const { value: location } = await Swal.fire({
      title: "Atur Jarak Absensi",
      input: "text",
      inputPlaceholder: "Masukkan jarak absensi (meter)",
      confirmButtonText: "Oke",
    });
    if (location) {
      Swal.fire(`Entered email: ${location}`);
    }
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Kehadiran Karyawan</h4>
        <button onClick={handleLocation} className="btn-tambahkaryawan">
          Atur Jarak Absensi
        </button>
        <button onClick={exportToExcel} className="export-btn">
          Export to Excel
        </button>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((absendata, index) => (
              <tr key={absendata.id}>
                <td>{index + 1}</td>
                <td>{absendata.nik}</td>
                <td>{absendata.nama}</td>
                <td>{new Date(absendata.tanggal).toLocaleDateString("en-GB")}</td>
                <td>{absendata.check_in}</td>
                <td>{absendata.check_out}</td>
                <td>
                  <div className="dt-status">
                    <span
                      className={`dt-status-dot ${
                        absendata.Keterangan === "Terlambat"
                          ? "dot-terlambat"
                          : "dot-tepatwaktu"
                      }`}
                    ></span>
                    <span className="dt-status-text">{absendata.Keterangan}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;