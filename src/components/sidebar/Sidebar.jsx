import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const location = useLocation();
  
  // State to track the currently active menu item
  const [activeItem, setActiveItem] = useState(location.pathname);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Update active item on route change
    setActiveItem(location.pathname);
  }, [location.pathname]);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">Absensi</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/admin"
                className={`menu-link ${activeItem === "/admin" ? "active" : ""}`}
                onClick={() => setActiveItem("/admin")}
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/"
                className={`menu-link ${activeItem === "/chartabsensi" ? "active" : ""}`}
                onClick={() => setActiveItem("/chartabsensi")}
              >
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Chart Absensi</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/karyawan"
                className={`menu-link ${activeItem === "/admin/karyawan" ? "active" : ""}`}
                onClick={() => setActiveItem("/admin/karyawan")}
              >
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Karyawan</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
            <Link
              to="/loginadmin"
              className={"menu-link"}
              onClick={handleLogout} // Menambahkan fungsi handleLogout di sini
            >
              <span className="menu-link-icon">
                <MdOutlineLogout size={20} />
              </span>
              <span className="menu-link-text">Logout</span>
            </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;