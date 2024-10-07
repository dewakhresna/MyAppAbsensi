import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Swal from "sweetalert2";
import "./areaWebcam.scss";
import AreaLoading from "../../areaLoading/AreaLoading";

const OFFICE_LATITUDE = -6.18223503101325;
const OFFICE_LONGITUDE = 107.03520440413142;

const MAX_DISTANCE_METERS = 100000000;

const handleCheck = async (masuk = false) => {
  const nama = localStorage.getItem("nama");
  const nik = localStorage.getItem("nik");
  const id = localStorage.getItem("id"); // Asumsi ID disimpan di localStorage

  const url = masuk
    ? "http://localhost:3001/api/karyawan_hadir"
    : `http://localhost:3001/api/karyawan_keluar/${nik}`;

  const method = masuk ? "POST" : "PUT";
  const body = masuk ? JSON.stringify({ nama, nik }) : JSON.stringify({ nik });
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      Swal.fire({
        title: masuk ? "Check-in berhasil!" : "Check-out berhasil!",
        icon: "success",
        confirmButtonText: "Oke",
      }).then(function () {
        window.location.href = "http://localhost:5173/home";
      });
    } else {
      Swal.fire({
        title: masuk ? "Gagal check-in." : "Gagal check-out.",
        icon: "error",
        confirmButtonText: "Kembali",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error!",
      text: `Gagal mengirim data: ${error}`,
      icon: "error",
      confirmButtonText: "Kembali",
    });
  }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Radius bumi dalam meter
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Jarak dalam meter
  return distance;
};

const AreaWebcam = ({ masuk = false }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null); // State untuk jarak

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      setModelsLoaded(true);
    };
    loadModels();

    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          const calculatedDistance = calculateDistance(
            latitude,
            longitude,
            OFFICE_LATITUDE,
            OFFICE_LONGITUDE
          );
          setDistance(calculatedDistance); // Simpan jarak yang dihitung
          // console.log(`${latitude}, ${longitude}`);
          // console.log(`Distance: ${calculatedDistance}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleVideoPlay = () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    // Set canvas size to match video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 128,
      scoreThreshold: 0.6,
    });

    // Start detecting faces
    const detectFace = async () => {
      if (modelsLoaded) {
        const detections = await faceapi
          .detectAllFaces(video, options)
          .withFaceLandmarks();

        // Clear canvas and draw the detections
        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Custom drawing function to remove score display
        resizedDetections.forEach((detection) => {
          const box = detection.detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: "Person",
            boxColor: "red",
            lineWidth: 3,
          });
          drawBox.draw(canvas);
        });

        if (resizedDetections.length === 1) {
          setIsFaceDetected(true);
        } else {
          setIsFaceDetected(false);
        }
      }
      requestAnimationFrame(detectFace);
    };

    detectFace();
  };

  // Fungsi untuk menangkap gambar dari webcam
  const capture = async () => {
    if (userLocation && distance !== null) {
      // Mengecek jarak yang telah disimpan
      if (distance >= MAX_DISTANCE_METERS) {
        Swal.fire({
          title: "Error!",
          text: "Anda berada terlalu jauh dari lokasi yang ditentukan",
          icon: "error",
          confirmButtonText: "Oke",
        });
        return; // Hentikan eksekusi jika jarak melebihi batas
      }

      // Jika jarak OK, tampilkan loading
      setLoading(true);
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        console.log("Sending image to API");
        await sendImageToAPI(imageSrc);
      }
    } else {
      console.error("User location or distance not available.");
      Swal.fire({
        title: "Error!",
        text: "Tidak bisa mendapatkan lokasi. Pastikan izin lokasi diaktifkan.",
        icon: "error",
        confirmButtonText: "Kembali",
      });
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
          no_induk: localStorage.getItem("nik"),
        }),
      });

      const data = await response.json();
      console.log("Respons API:", data);

      // Menampilkan SweetAlert2 berdasarkan response API
      if (data.statusCode === 200) {
        if (data.response.verified) {
          Swal.fire({
            title: "Success!",
            text: "Wajah Terverifikasi.",
            icon: "success",
            confirmButtonText: masuk ? "Check-in" : "Check-out",
            preConfirm: async () => {
              await handleCheck(masuk); // Call HandlePost
            },
          });
        } else {
          Swal.fire({
            title: "Verification Failed!",
            text: "Wajah Anda Tidak Sesuai. Mohon Ulangi Lagi.",
            icon: "error",
            confirmButtonText: "Kembali",
          });
        }
      } else if (data.statusCode === 404) {
        Swal.fire({
          title: "Error!",
          text: data.response,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (data.status === "error") {
        Swal.fire({
          title: "Error!",
          text:
            data.response ||
            "Terjadi kesalahan saat memproses gambar. Mohon Ulangi Lagi.",
          icon: "error",
          confirmButtonText: "Kembali",
        });
      }
    } catch (error) {
      console.error("Error mengirim gambar ke API:", error);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mengirim gambar. Mohon Ulangi Lagi",
        icon: "error",
        confirmButtonText: "Kembali",
      });
    } finally {
      setLoading(false); // Set loading ke false setelah selesai
    }
  };

  const videoOptions = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  return (
    <div className="area-webcam-container">
      <h2>{masuk ? "Absensi Kehadiran" : "Absensi Keluar"}</h2>
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoOptions}
        ref={webcamRef}
        onPlay={handleVideoPlay}
      />
      <canvas ref={canvasRef} style={{ position: "absolute" }} />
      <button
        onClick={capture}
        className={isFaceDetected ? "enabled" : "disabled"}
        disabled={!isFaceDetected}
      >
        Ambil Gambar
      </button>

      {/* Popup Loading */}
      {loading && (
        <div className="loading-popup">
          <AreaLoading />
        </div>
      )}
    </div>
  );
};

export default AreaWebcam;
