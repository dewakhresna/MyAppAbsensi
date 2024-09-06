import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import AdminLayout from "./layout/AdminLayout";
import { Dashboard, PageNotFound, Karyawan, AdminLogin, UserHome, UserLoading, UserAbsen, UserRegistrasi, UserLogin } from "./screens/";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/karyawan" element={<Karyawan />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/loginadmin" element={<AdminLogin />} />
            <Route path="/logout" element={<AdminLogin />} />
          </Route>
            <Route path="/home" element={<UserHome />} />
            <Route path="/home/absen" element={<UserAbsen />} />
            <Route path="/home/loading" element={<UserLoading />} />
            <Route path="/registrasi" element={<UserRegistrasi />} />
            <Route path="/login" element={<UserLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
