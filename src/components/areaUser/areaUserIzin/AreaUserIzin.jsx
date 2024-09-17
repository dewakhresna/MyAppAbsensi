import { useState } from "react";
import "./AreaUserIzin.scss";

const AreaUserIzin = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [alasan, setAlasan] = useState("");
  const [file, setFile] = useState(null);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("nik", localStorage.getItem("nik")); 
    formData.append("nama", localStorage.getItem("nama"));
    formData.append("alasan", alasan);
    formData.append("keterangan", selectedOption);
    if (file) {
      formData.append("surat", file);
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/sakit", {
        method: "POST",
        body: formData,
      });
  
      // Check if response is okay
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const result = await response.json();
      if (result.success) {
        alert("Data successfully inserted");
      } else {
        alert("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error submitting data: ${error.message}`);
    }
  };
  

  return (
    <div className="user-izin-container">
      <div className="izin-box">
        <h2>Pengajuan Izin</h2>
        <form onSubmit={handleFormSubmit}>
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
          {selectedOption === "Sakit" && (
            <div className="input-group">
              <label htmlFor="surat">Surat Dokter</label>
              <input
                type="file"
                id="surat"
                onChange={handleFileChange}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="alasan">Alasan</label>
            <textarea
              id="alasan"
              placeholder="Masukkan Alasan Izin atau Sakit"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
            ></textarea>
          </div>

          {selectedOption !== "" && (
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
