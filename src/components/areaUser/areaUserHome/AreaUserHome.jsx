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

        // const localStorageDate = localStorage.getItem('tanggal');
        const localStorageNik = localStorage.getItem('nik');
        // const formattedLocalStorageDate = extractDate(localStorageDate);

        // const formatted = absensiResults.map(item => ({
        //   ...item,
        //   formattedDate: extractDate(item.tanggal)
        // }));
        if (localStorageNik) {
          // Filter data berdasarkan NIK yang ada di localStorage
          const filteredData = absensiResults.filter(data => data.nik === localStorageNik);
    
          // Set count berdasarkan jumlah data yang cocok dengan NIK
          setCount(filteredData.length);
        }

        const sakitResponse = await fetch('http://localhost:3001/api/readsakit');
        const sakitResults = await sakitResponse.json();
        setSakitData(sakitResults);

        // const keterangan = sakitResults.map(item => ({
        //   DataKeteranganFilter: item.keterangan,
        //   formattedDateizin: extractDate(item.tanggal)
        // }));
        
        // setCountSakit(keterangan.filter(data => data.formattedDateizin === formattedLocalStorageDate && data.DataKeteranganFilter == "Sakit").length);
        // setCountIzin(keterangan.filter(data => data.formattedDateizin === formattedLocalStorageDate && data.DataKeteranganFilter == "Izin").length);

        if (localStorageNik) {
          // Filter data sakit berdasarkan NIK dan keterangan "Sakit"
          const filteredSakitData = sakitResults.filter(data =>
            data.nik === localStorageNik &&
            data.keterangan === "Sakit"
          );
          
          // Filter data izin berdasarkan NIK dan keterangan "Izin"
          const filteredIzinData = sakitResults.filter(data =>
            data.nik === localStorageNik &&
            data.keterangan === "Izin"
          );
    
          // Set jumlah data yang sesuai dengan "Sakit" dan "Izin"
          setCountSakit(filteredSakitData.length);
          setCountIzin(filteredIzinData.length);
        }

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
          <h1>Hallo {localStorage.getItem("nama")}</h1>
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
            <span className="status-card-text">{`${jumlahhadir} Hadir`}</span>
          </div>
          <div className="status-card">
            <span className="menu-link-icon">
              <MdDeviceThermostat size={18} />
            </span>
            <span className="status-card-text">{`${jumlahsakit} Sakit`}</span>
          </div>
          <div className="status-card">
            <span className="menu-link-icon">
              <MdEmail size={18} />
            </span>
            <span className="status-card-text">{`${jumlahizin} Izin`}</span>
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
