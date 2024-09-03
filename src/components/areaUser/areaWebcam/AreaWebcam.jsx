import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import "./areaWebcam.scss";

const AreaWebcam = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false)

  // Fungsi untuk menangkap gambar dari webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log("Gambar yang Ditangkap:", imageSrc);
    if (imageSrc) {
      console.log("Sending image to API");
      setLoading(true) // Set loading to true sebelum memulai fetch
      sendImageToAPI(imageSrc);
    }
  };

  // Fungsi untuk mengirim gambar ke API Flask
  const sendImageToAPI = async (imageSrc) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageSrc,
          no_induk: "11111" // ganti dengan ID yang sesuai
        }),
      });

      const data = await response.json();
      console.log("Respons API:", data);

      // Menampilkan SweetAlert2 berdasarkan response API
      if (data.status === "success"){
        if (data.response.verified){
          Swal.fire({
            title: "Success!",
            text: "Wajah Terverifikasi.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
        else {
          Swal.fire({
            title: "Verification Failed!",
            text: "Wajah Anda Tidak Sesuai. Mohon Ulangi Lagi.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
      else if (data.status === "error"){
        Swal.fire({
          title: "Error!",
          text: data.response || "Terjadi kesalahan saat memproses gambar.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error mengirim gambar ke API:", error);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mengirim gambar.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false) // Set loading ke false setelah selesai
    }
  };

  const videoOptions = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  return (
    <div className="area-webcam-container">
      <h2>Absensi Kehadiran</h2>
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoOptions}
        ref={webcamRef}
      />
      <button onClick={capture}>Ambil Gambar</button>

      {/* Popup Loading */}
      {loading && (
        <div className="loading-popup">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default AreaWebcam;
