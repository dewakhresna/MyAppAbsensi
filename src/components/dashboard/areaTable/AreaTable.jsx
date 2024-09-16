import React, { useState, useEffect } from "react";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "No",
  "No Induk",
  "Nama",
  "Tanggal Absensi",
  "CheckIn",
  "CheckOut",
  "Keterangan",
];

const AreaTable = ({ startDate, endDate }) => {
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
    if (startDate && endDate) {
      const filtered = absensidata.filter((absendata) => {
        const absensiDate = new Date(absendata.tanggal);
        return absensiDate >= startDate && absensiDate <= endDate;
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, absensidata]);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Kehadiran Karyawan</h4>
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