import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../constants/themeConstants";
import MoonIcon from "../assets/icons/moon.svg";
import SunIcon from "../assets/icons/sun.svg";

const BaseLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);
  
  const location = useLocation();
  
  // Check if the current route is '/loginadmin'
  const isAdminLogin = location.pathname === '/loginadmin';

  return (
    <main className="page-wrapper">
      {/* left of page */}
      {!isAdminLogin && <Sidebar />}
      {/* right side/content of the page */}
      <div className="content-wrapper">
        {!isAdminLogin && (
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
          >
            <img
              className="theme-icon"
              src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            />
          </button>
        )}
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
