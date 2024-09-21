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
import React, { useState, useEffect } from 'react';

const AreaUserHome = () => {
  const [absensiData, setAbsensiData] = useState([]);
  const [sakitData, setSakitData] = useState([]);
  const [jumlahhadir, setCount] = useState(0);
  const [jumlahsakit, setCountSakit] = useState(0);
  const [jumlahizin, setCountIzin] = useState(0);

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    // Mengambil data dari API
    const fetchData = async () => {
      try {
        const absensiResponse = await fetch('http://localhost:3001/api/readAbsensi');
        const absensiResults = await absensiResponse.json();
        setAbsensiData(absensiResults);

        const localStorageDate = localStorage.getItem('tanggal');
        const formattedLocalStorageDate = extractDate(localStorageDate);

        const formatted = absensiResults.map(item => ({
          ...item,
          formattedDate: extractDate(item.tanggal)
        }));
        setCount(formatted.filter(data => data.formattedDate === formattedLocalStorageDate).length);

        const sakitResponse = await fetch('http://localhost:3001/api/readsakit');
        const sakitResults = await sakitResponse.json();
        setSakitData(sakitResults);

        const keterangan = sakitResults.map(item => ({
          DataKeteranganFilter: item.keterangan,
          formattedDateizin: extractDate(item.tanggal)
        }));
        
        setCountSakit(keterangan.filter(data => data.formattedDateizin === formattedLocalStorageDate && data.DataKeteranganFilter == "Sakit").length);
        setCountIzin(keterangan.filter(data => data.formattedDateizin === formattedLocalStorageDate && data.DataKeteranganFilter == "Izin").length);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(absensiData);
  console.log(sakitData);
  console.log('Count:', jumlahhadir);
  const handleLogout = () => {
    localStorage.removeItem("sukses");
    localStorage.removeItem("nama");
    localStorage.removeItem("nik");
    localStorage.removeItem("id");
    localStorage.removeItem("tanggal");
  };

  const id = localStorage.getItem("id");
  return (
    <div className="area-user-home">
      <div className="user-home-container">
        <div className="user-home-header">
          <h1>Nama Karyawan</h1> {/* ganti pake nama user nya h1 */}
          <Link to={`/home/edit/${id}`} className="menu-link-edit">
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
            <span className="status-card-text">{`${jumlahhadir} Hadir`}</span> {/* ganti sesuai user nya */}
          </div>
          <div className="status-card">
            <span className="menu-link-icon">
              <MdDeviceThermostat size={18} />
            </span>
            <span className="status-card-text">{`${jumlahsakit} Sakit`}</span> {/* ganti sesuai user nya */}
          </div>
          <div className="status-card">
            <span className="menu-link-icon">
              <MdEmail size={18} />
            </span>
            <span className="status-card-text">{`${jumlahizin} Izin`}</span> {/* ganti sesuai user nya */}
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
              <Link to="/home/keluar" className="menu-link">
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
