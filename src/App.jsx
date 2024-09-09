import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./screens/adminlogin/ProtectedRoute";
import ProtectKaryawan from "./components/areaUser/areaUserLogin/ProtectKaryawan";
import { Dashboard, PageNotFound, Karyawan, AdminLogin, UserHome, UserLoading, UserAbsen, UserRegistrasi, UserLogin } from "./screens/";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
          <Route
            path="/admin"
              element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
            <Route path="/admin/karyawan" element={<Karyawan />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/loginadmin" element={<AdminLogin />} />
          </Route>
            <Route path="/home/absen" element={<UserAbsen />} />
            <Route path="/home/loading" element={<UserLoading />} />
            <Route path="/registrasi" element={<UserRegistrasi />} />
            <Route path="/login" element={<UserLogin />} />
            {/* <Route path="/home" element={<UserHome />} /> */}
            <Route
            path="/home"
              element={
              <ProtectKaryawan>
                <UserHome />
              </ProtectKaryawan>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
