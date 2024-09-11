import { Link } from "react-router-dom"; // Impor Link dari react-router-dom
import {
  MdOutlinePermIdentity,
  MdCoPresent,
  MdDeviceThermostat,
  MdEmail,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdForwardToInbox,
  MdOutlineLogout,
} from "react-icons/md";
import "./AreaUserHome.scss";

const AreaUserHome = () => {
  const handleLogout = () => {
    localStorage.removeItem("sukses");
    localStorage.removeItem("nama");
    localStorage.removeItem("nik");
  };

  return (
    <div className="area-user-home">
      <div className="user-home-container">
        <div className="user-home-header">
          <h1>Nama Karyawan</h1>
          <Link to="/home/edit" className="menu-link-edit">
            <span className="menu-link-icon-edit">
              <MdOutlinePermIdentity size={18} />
            </span>
          </Link>
        </div>

        <div className="user-status">
          <div className="status-card">
            <span className="menu-link-icon">
              <MdCoPresent size={18} />
            </span>
            <span className="status-card-text">10 Hadir</span>
          </div>
          <div className="status-card">
            <span className="menu-link-icon">
              <MdDeviceThermostat size={18} />
            </span>
            <span className="status-card-text">1 Sakit</span>
          </div>
          <div className="status-card">
            <span className="menu-link-icon">
              <MdEmail size={18} />
            </span>
            <span className="status-card-text">0 Izin</span>
          </div>
        </div>

        <div className="menu-absensi">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/home/absen" className="menu-link">
                <span className="menu-link-icon">
                  <MdKeyboardDoubleArrowRight size={18} />
                </span>
                <span className="menu-link-text">Presensi Masuk</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/home/absen" className="menu-link">
                <span className="menu-link-icon">
                  <MdKeyboardDoubleArrowLeft size={18} />
                </span>
                <span className="menu-link-text">Presensi Keluar</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/home/izin" className="menu-link">
                <span className="menu-link-icon">
                  <MdForwardToInbox size={20} />
                </span>
                <span className="menu-link-text">Pengajuan Izin</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-logout">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/login" className="menu-link" onClick={handleLogout}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* <Link to="/login" className="menu-link" onClick={handleLogout}>
        <span className="menu-link-text">Logout</span>
      </Link> */}
      </div>
    </div>
  );
};

export default AreaUserHome;
