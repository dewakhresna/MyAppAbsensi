import { InfinitySpin } from "react-loader-spinner";
import "./AreaLoading.scss";

function AreaLoading() {
  return (
    <div className="sweet-loading">
      <h2>Memeriksa Lokasi & Melakukan Verifikasi Wajah</h2>
      <InfinitySpin
        visible={true}
        width="200"
        color="#3333ff"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default AreaLoading;