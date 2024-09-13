import { useState } from "react";
import "./AreaUserIzin.scss";
const AreaUserIzin = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="user-izin-container">
      <div className="izin-box">
        <h2>Pengajuan Izin</h2>
        <form action="">
          <div className="input-group">
            <label htmlFor="keterangan">Keterangan</label>
            <select
              id="keterangan"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Pilih</option>
              <option value="Sakit">Sakit</option>
              <option value="Izin">Izin</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="tanggal">Tanggal Izin</label>
            <input type="date" id="tanggal" />
          </div>

          {selectedOption === "Sakit" && (
            <div className="input-group">
              <label htmlFor="surat">Surat Dokter</label>
              <input type="file" id="surat" />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="alasan">Alasan</label>
            <textarea
              id="alasan"
              placeholder="Masukkan Alasan Izin atau Sakit"
            ></textarea>
          </div>

          {selectedOption !== "" &&  (
            <button type="submit" className="izin-button">
              Kirim Izin
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AreaUserIzin;
