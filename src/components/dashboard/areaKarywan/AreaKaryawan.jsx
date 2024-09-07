import React, { useEffect, useState } from "react";
import AreaKaryawanAction from "./AreaKaryawanAction";
import "./AreaKaryawan.scss";

const TABLE_HEADS = [
  "No",
  "No Induk",
  "Nama",
  "Email",
  "Jenis Kelamin",
  "No Telepon",
  "Action",
];

const AreaKaryawan = () => {
  const [karyawanData, setKaryawanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
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

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Data Karyawan</h4>
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
              {karyawanData.map((dataKaryawan, index) => (
                <tr key={dataKaryawan.id}>
                  <td>{index + 1}</td>
                  <td>{dataKaryawan.nik}</td>
                  <td>{dataKaryawan.nama}</td>
                  <td>{dataKaryawan.email}</td>
                  <td>{dataKaryawan.kelamin}</td>
                  <td>{dataKaryawan.hp}</td>
                  <td className="dt-cell-action">
                    <AreaKaryawanAction />
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
