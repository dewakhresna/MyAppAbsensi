import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import AdminLayout from "./layout/AdminLayout";
//protect admin
import ProtectedRoute from "./screens/adminlogin/ProtectedRoute";
import ProtectedAdminEdit from "./screens/adminlogin/ProtectedAdminEdit";
import ProtectedAdminIzin from "./screens/adminlogin/ProtectedAdminIzin";
import ProtectedAdminKaryawan from "./screens/adminlogin/ProtectedAdminKaryawan";
//protect user
import ProtectKaryawan from "./components/areaUser/areaUserLogin/ProtectKaryawan";
import ProtectIzin from "./components/areaUser/areaUserLogin/ProtectIzin";
import ProtectAbsen from "./components/areaUser/areaUserLogin/ProtectAbsen";
import ProtectLoading from "./components/areaUser/areaUserLogin/ProtectLoading";
import ProtectEdit from "./components/areaUser/areaUserLogin/ProtectEdit";
import ProtectCheckOut from "./components/areaUser/areaUserLogin/ProtectCheckOut";

import UserCheckOut from "./screens/user/UserCheckOut";
import {
  Dashboard,
  PageNotFound,
  Izin,
  Karyawan,
  KaryawanEdit,
  AdminLogin,
  UserHome,
  UserEdit,
  UserIzin,
  UserLoading,
  UserAbsen,
  UserRegistrasi,
  UserLogin,
} from "./screens/";

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

            <Route
              path="/admin/izin"
              element={
                <ProtectedAdminIzin>
                  <Izin />
                </ProtectedAdminIzin>
              }
            />

            <Route
              path="/admin/karyawan"
              element={
                <ProtectedAdminKaryawan>
                  <Karyawan />
                </ProtectedAdminKaryawan>
              }
            />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/loginadmin" element={<AdminLogin />} />
          </Route>
          <Route
              path="/admin/karyawan/edit/:id"
              element={
                <ProtectedAdminEdit>
                  <KaryawanEdit />
                </ProtectedAdminEdit>
              }
            />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/registrasi" element={<UserRegistrasi />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/" element={<UserLogin />} />
          <Route
            path="/home"
            element={
              <ProtectKaryawan>
                <UserHome />
              </ProtectKaryawan>
            }
          />
          <Route
            path="/home/edit/:id"
            element={
              <ProtectEdit>
                <UserEdit />
              </ProtectEdit>
            }
          />
          <Route
            path="/home/izin"
            element={
              <ProtectIzin>
                <UserIzin />
              </ProtectIzin>
            }
          />
          <Route
            path="/home/absen"
            element={
              <ProtectAbsen>
                <UserAbsen />
              </ProtectAbsen>
            }
          />
          <Route
            path="/home/keluar"
            element={
              <ProtectCheckOut>
                <UserCheckOut />
              </ProtectCheckOut>
            }
          />
          <Route
            path="/home/loading"
            element={
              <ProtectLoading>
                <UserLoading />
              </ProtectLoading>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
