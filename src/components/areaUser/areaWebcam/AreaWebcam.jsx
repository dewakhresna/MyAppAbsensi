import React, { useRef } from "react";
import Webcam from "react-webcam";
import "./areaWebcam.scss";

const AreaWebcam = () => {
  const webcamRef = useRef(null);

  // Fungsi untuk menangkap gambar dari webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log("Gambar yang Ditangkap:", imageSrc);
    if (imageSrc) {
      console.log("Sending image to API");
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
          no_induk: "22222" // ganti dengan ID yang sesuai
        }),
      });

      const data = await response.json();
      console.log("Respons API:", data);
    } catch (error) {
      console.error("Error mengirim gambar ke API:", error);
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
    </div>
  );
};

export default AreaWebcam;
