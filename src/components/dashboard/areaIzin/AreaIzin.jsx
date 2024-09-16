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

const TABLE_DATA = [
  {
    id: 101,
    no: 1,
    no_induk: "11232",
    nama: "I Dewa Gede",
    tanggal: "Aug 29,2024",
    keterangan: "Sakit",
    alasan: "-",
    surat: "Gambar surat dokter",
  },
  {
    id: 102,
    no: 2,
    no_induk: "11232",
    nama: "Khresna Bayu",
    tanggal: "Aug 29,2024",
    keterangan: "Izin",
    alasan: "Acara Keluarga",
    surat: "-",
  },
  {
    id: 103,
    no: 3,
    no_induk: "11232",
    nama: "Bayu Dermawan",
    tanggal: "Aug 29,2024",
    keterangan: "Izin",
    alasan: "Acara Keluarga",
    surat: "-",
  },
];

const AreaIzin = () => {
  const handleAlasan = async (dataIzin) => {
    Swal.fire({
      title: "Alasan Izin / Sakit",
      text: dataIzin.alasan,
    });
  }
  const handleSurat = async (dataIzin) => {
    Swal.fire({
      title: "Surat Dokter",
      imageUrl: dataIzin.surat, //ganti dengan url surat dokter 
      imageHeight: 300,
      imageWidth: 300,
      imageAlt: "Tidak Ada Surat Dokter",
    });
  }
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
            {TABLE_DATA?.map((dataIzin) => {
              return (
                <tr key={dataIzin.id}>
                  <td>{dataIzin.no}</td>
                  <td>{dataIzin.no_induk}</td>
                  <td>{dataIzin.nama}</td>
                  <td>{dataIzin.tanggal}</td>
                  <td>{dataIzin.keterangan}</td>
                  <td><Link onClick={() => handleAlasan(dataIzin)} className="dropdown-menu-link">Lihat</Link></td>
                  <td>{dataIzin.keterangan === "Izin" ? ("-") : (<Link onClick={() => handleSurat(dataIzin)} className="dropdown-menu-link">Lihat</Link>)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaIzin;