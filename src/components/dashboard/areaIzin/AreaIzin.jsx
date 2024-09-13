import AreaIzinAction from "./AreaIzinAction";
import "./AreaIzin.scss";

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
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Aug 29,2024",
    keterangan: "Sakit",
    alasan: "-",
    surat: "Gambar surat dokter",
  },
  {
    id: 102,
    no: 2,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Aug 29,2024",
    keterangan: "Izin",
    alasan: "Acara Keluarga",
    surat: "-",
  },
  {
    id: 103,
    no: 3,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Aug 29,2024",
    keterangan: "Izin",
    alasan: "Acara Keluarga",
    surat: "-",
  },
];

const AreaIzin = () => {
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
                  <td className="dt-cell-action">
                    <AreaIzinAction />
                  </td>
                  <td>{dataIzin.surat}</td>
                  {/* <td>${dataIzin.amount.toFixed(2)}</td> */}
                  {/* <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataIzin.keterangan}`}
                      ></span>
                      <span className="dt-status-text">
                        {dataIzin.keterangan}
                      </span>
                    </div>
                  </td> */}
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