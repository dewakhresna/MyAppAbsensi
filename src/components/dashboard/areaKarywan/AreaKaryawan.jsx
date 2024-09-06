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

const TABLE_DATA = [
  {
    id: 101,
    no: 1,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    email: "dewakhresna04@gmail.com",
    jenis_kelamin: "Laki-laki",
    no_telepon: "08987654321",
  },
  {
    id: 101,
    no: 2,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    email: "dewakhresna04@gmail.com",
    jenis_kelamin: "Laki-laki",
    no_telepon: "08987654321",
  },
  {
    id: 101,
    no: 3,
    no_induk: "11232",
    nama: "I Dewa Gede Khresna Bayu",
    email: "dewakhresna04@gmail.com",
    jenis_kelamin: "Laki-laki",
    no_telepon: "08987654321",
  },
];

const AreaKaryawan = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Data Karyawan</h4>
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
            {TABLE_DATA?.map((dataKaryawan) => {
              return (
                <tr key={dataKaryawan.id}>
                  <td>{dataKaryawan.no}</td>
                  <td>{dataKaryawan.no_induk}</td>
                  <td>{dataKaryawan.nama}</td>
                  <td>{dataKaryawan.email}</td>
                  <td>{dataKaryawan.jenis_kelamin}</td>
                  <td>{dataKaryawan.no_telepon}</td>
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
                    <AreaKaryawanAction />
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

export default AreaKaryawan;
