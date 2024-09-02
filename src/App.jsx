import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import AdminLayout from "./layout/AdminLayout";
import { Dashboard, PageNotFound, Karyawan, AdminLogin, User } from "./screens/";

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
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/logout" element={<AdminLogin />} />
          </Route>
            <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
