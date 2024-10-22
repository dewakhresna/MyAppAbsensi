import { useEffect, useState } from "react";
import "./AreaIzin.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const AreaIzin = ({ startDate, endDate, searchQuery, isPengajuanMode = false }) => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const TABLE_HEADS = isPengajuanMode
    ? ["No", "No Induk", "Nama", "Tanggal Permohonan", "Tanggal Pengajuan", "Alasan", "Action"]
    : ["No", "No Induk", "Nama", "Tanggal Izin", "Keterangan", "Alasan", "Surat"];

  // Fetch data from the appropriate endpoint based on mode
  const fetchData = async () => {
    const endpoint = isPengajuanMode
      ? "http://localhost:3001/api/readapprove"
      : "http://localhost:3001/api/readsakit";

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on mount and when the mode changes
  useEffect(() => {
    fetchData();
  }, [isPengajuanMode]);

  // Filter data only when not in Pengajuan Mode
  useEffect(() => {
    let filtered = tableData;

    if (!isPengajuanMode) {
      if (startDate && endDate) {
        filtered = filtered.filter((dataIzin) => {
          const absensiDate = new Date(dataIzin.tanggal);
          return absensiDate >= startDate && absensiDate <= endDate;
        });
      }

      if (searchQuery) {
        filtered = filtered.filter((dataIzin) =>
          dataIzin.nama.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    setFilteredData(filtered);
  }, [startDate, endDate, searchQuery, tableData, isPengajuanMode]);

  // Handle rejection and trigger re-fetch after deletion
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/api/approve/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          fetchData(); // Re-fetch data after deletion
        } else {
          Swal.fire("Gagal", "Terjadi kesalahan saat menghapus data.", "error");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire("Gagal", "Tidak bisa terhubung ke server.", "error");
      }
    }
  };


  const handleAccept = async (dataIzin) => {
    const nik = dataIzin.nik
    const nama = dataIzin.nama
    const tanggal = dataIzin.tanggal_pengajuan
    const alasan = dataIzin.alasan

    console.log("Data yang akan dikirim:", nik, nama, tanggal, alasan);

    const result = await Swal.fire({
      title: "Apakah kamu yakin?",
      text: "MengApprove Izin ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Accept",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed){
      try {
        const response = await fetch("http://localhost:3001/api/acceptapprove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nik: nik, nama:nama, tanggal : tanggal, alasan:alasan}),
        });
        const result = await response.json();
        if (result.success) {
          await fetch(`http://localhost:3001/api/approve/${dataIzin.id}`, {
          method: "DELETE",
        }); // Hapus dari tabel approve setelah berhasil dimasukkan ke tabel izin
          fetchData(); // Refresh data izin setelah menerima izin
        }
      } catch (error) {
        console.error("Error inserting data into izin:", error);
      }
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kehadiran");
    XLSX.writeFile(workbook, "data_izin_sakit.xlsx");
  };

  const handleSurat = (dataIzin) => {
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
        {!isPengajuanMode && (
          <button onClick={exportToExcel} className="export-btn">
            Export to Excel
          </button>
        )}
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
            {filteredData.map((dataIzin, index) => (
              <tr key={dataIzin.id}>
                <td>{index + 1}</td>
                <td>{dataIzin.nik}</td>
                <td>{dataIzin.nama}</td>
                <td>{new Date(dataIzin.tanggal).toLocaleDateString()}</td>
                {isPengajuanMode && (
                  <td>{new Date(dataIzin.tanggal_pengajuan).toLocaleDateString()}</td>
                )}
                {!isPengajuanMode && <td>{dataIzin.keterangan}</td>}
                <td>{dataIzin.alasan}</td>
                {!isPengajuanMode && (
                  <td>
                    {dataIzin.keterangan === "Izin" ? (
                      "-"
                    ) : (
                      <Link
                        onClick={() => handleSurat(dataIzin)}
                        className="dropdown-menu-link"
                      >
                        Lihat
                      </Link>
                    )}
                  </td>
                )}
                {isPengajuanMode && (
                  <td className="action-buttons">
                    <button className="btn-approve" onClick={() => handleAccept(dataIzin)}>Izinkan</button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(dataIzin.id)}
                    >
                      Tolak
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaIzin;
