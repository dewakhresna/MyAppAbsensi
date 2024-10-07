import { useEffect, useState } from "react";
import "./AreaIzin.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TABLE_HEADS = [
  "No",
  "No Induk",
  "Nama",
  "Tanggal Izin",
  "Keterangan",
  "Alasan",
  "Surat",
];

const AreaIzin = ({ startDate, endDate }) => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/readsakit");
        const data = await response.json();
        setTableData(data); // Save the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = tableData.filter((dataIzin) => {
        const absensiDate = new Date(dataIzin.tanggal);
        return absensiDate >= startDate && absensiDate <= endDate;
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, tableData]);

  const handleAlasan = async (dataIzin) => {
    Swal.fire({
      title: "Alasan Izin / Sakit",
      text: dataIzin.alasan,
    });
  };

  const handleSurat = async (dataIzin) => {
    Swal.fire({
      title: "Surat Dokter",
      imageUrl: `../../../../backend/DataSakit/${dataIzin.surat}`,
      imageHeight: 300,
      imageWidth: 300,
      imageAlt: "Tidak Ada Surat Dokter",
    });
  };
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Izin / Sakit Karyawan</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((dataIzin, index) => (
              <tr key={dataIzin.id}>
                <td>{index + 1}</td> {/* Auto-increment No */}
                <td>{dataIzin.nik}</td>
                <td>{dataIzin.nama}</td>
                <td>{new Date(dataIzin.tanggal).toLocaleDateString()}</td>
                <td>{dataIzin.keterangan}</td>
                <td>
                  <Link onClick={() => handleAlasan(dataIzin)} className="dropdown-menu-link">
                    Lihat
                  </Link>
                </td>
                <td>
                  {dataIzin.keterangan === "Izin" ? (
                    "-"
                  ) : (
                    <Link onClick={() => handleSurat(dataIzin)} className="dropdown-menu-link">
                      Lihat
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaIzin;
