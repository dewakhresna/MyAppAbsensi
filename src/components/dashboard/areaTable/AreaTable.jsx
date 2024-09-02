import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "No Induk",
  "Nama",
  "Waktu Absensi",
  "Jam",
  "Absensi",
  "Keterangan",
  "Action",
];

const TABLE_DATA = [
  {
    id: 101,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Aug 29,2024",
    jam: "09.00",
    absensi: "Hadir",
    keterangan: "-",
  },
  {
    id: 101,
    no_induk: "11578",
    nama: "Luthfi",
    tanggal: "Aug 25,2024",
    jam: "09.00",
    absensi: "Izin",
    keterangan: "Acara Keluarga",
  },
  {
    id: 101,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Jun 29,2022",
    jam: "09.00",
    absensi: "Sakit",
    keterangan: "Demam",
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Absensi Karyawan</h4>
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
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.no_induk}</td>
                  <td>{dataItem.nama}</td>
                  <td>{dataItem.tanggal}</td>
                  <td>{dataItem.jam}</td>
                  <td>{dataItem.absensi}</td>
                  <td>{dataItem.keterangan}</td>
                  {/* <td>${dataItem.amount.toFixed(2)}</td> */}
                  {/* <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td> */}
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
