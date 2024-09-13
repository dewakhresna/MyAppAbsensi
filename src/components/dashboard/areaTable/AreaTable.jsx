import AreaTableAction from "./AreaTableAction";
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

const TABLE_DATA = [
  {
    id: 101,
    no: 1,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Aug 29,2024",
    cekin: "09.00",
    cekout: "17.00",
    keterangan: "Tepat Waktu",
  },
  {
    id: 101,
    no: 2,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Aug 29,2024",
    cekin: "11.00",
    cekout: "17.00",
    keterangan: "Terlambat",
  },
  {
    id: 101,
    no: 3,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    tanggal: "Aug 29,2024",
    cekin: "08.45",
    cekout: "17.00",
    keterangan: "Tepat Waktu",
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Kehadiran Karyawan</h4>
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
            {TABLE_DATA?.map((dataAbsensi) => {
              return (
                <tr key={dataAbsensi.id}>
                  <td>{dataAbsensi.no}</td>
                  <td>{dataAbsensi.no_induk}</td>
                  <td>{dataAbsensi.nama}</td>
                  <td>{dataAbsensi.tanggal}</td>
                  <td>{dataAbsensi.cekin}</td>
                  <td>{dataAbsensi.cekout}</td>
                  {/* <td>${dataAbsensi.amount.toFixed(2)}</td> */}
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataAbsensi.keterangan}`}
                      ></span>
                      <span className="dt-status-text">
                        {dataAbsensi.keterangan}
                      </span>
                    </div>
                  </td>
                  {/* <td className="dt-cell-action">
                    <AreaTableAction />
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

export default AreaTable;
