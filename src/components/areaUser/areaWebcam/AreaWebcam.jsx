import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Swal from "sweetalert2";
import "./areaWebcam.scss";

const AreaWebcam = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false); // State untuk deteksi wajah

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const handleVideoPlay = () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    // Set canvas size to match video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 128,
      scoreThreshold: 0.6
    });

    // Start detecting faces
    const detectFace = async () => {
      if (modelsLoaded) {
        const detections = await faceapi.detectAllFaces(video, options)
          .withFaceLandmarks();

        // Clear canvas and draw the detections
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        faceapi.draw.drawDetections(canvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        if (resizedDetections.length == 1) {
          setIsFaceDetected(true);
        } else{
          setIsFaceDetected(false);
        }
      }
      requestAnimationFrame(detectFace);
    };

    detectFace();
  };

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
        onPlay={handleVideoPlay}
      />
      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
      <button
        onClick={capture}
        className={isFaceDetected ? 'enabled' : 'disabled'}
        disabled={!isFaceDetected}
      >
        Ambil Gambar
      </button>

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
