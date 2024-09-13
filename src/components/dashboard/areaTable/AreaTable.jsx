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

const AreaTable = () => {
  const [absensidata, setabsensidata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/readAbsensi");
        if (!response.ok) throw new Error("Gagal mengambil data dari server");

        const data = await response.json();
        setabsensidata(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

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
          {absensidata.map((absendata, index) => (
                <tr key={absendata.id}>
                  <td>{index + 1}</td>
                  <td>{absendata.nik}</td>
                  <td>{absendata.nama}</td>
                  <td>{new Date(absendata.tanggal).toLocaleDateString("en-GB")}</td>
                  <td>{absendata.check_in}</td>
                  <td>{absendata.check_out}</td>
                  {/* <td>${dataAbsensi.amount.toFixed(2)}</td> */}
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${absendata.Keterangan}`}
                      ></span>
                      <span className="dt-status-text">
                        {absendata.Keterangan}
                      </span>
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
