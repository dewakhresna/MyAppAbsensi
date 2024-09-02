import Webcam from "react-webcam";
import "./areaWebcam.scss";
import { useEffect, useState } from "react";

const AreaWebcam = () => {
  // const [model, setMOdel] = useState();

  // async function loadMOdel() {
  //   try{
  //     // const dataset = await model yang mau diload.load();
  //     // setMOdel(dataset);
  //     console.log("data ready");
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   // tf.ready().then(() => {
  //   // loadMOdel()
  //   // }) (jika pake tensor flow js)
  // }, [])
  
  // async function predict() {
  //   const detection = await model.detect()
  //   console.log(detection)
  // }
  
  const videoOptions = {
    width: 720,
    height: 480,
    facingMode: "user",
  };
  return (
    <div className="area-webcam-container">
      <h2>Absensi Kehadiran</h2>
      <Webcam
        id="fotoSource"
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoOptions}
      />
      <button onClick={() => predict()}>Ambil Gambar</button>
    </div>
  );
};

export default AreaWebcam;