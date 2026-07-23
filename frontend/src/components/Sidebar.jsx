import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="lp-sidebar">
      <div className="lp-logo-triangle">▲</div>
      <div className="lp-nav-links">
        <div
          className={`lp-nav-item ${isActive("/home") ? "active" : ""}`}
          onClick={() => navigate("/home")}
        >
          <span className="lp-nav-icon">⌂</span>
          <span className="lp-nav-label">home</span>
        </div>
        <div
          className={`lp-nav-item ${isActive("/firstaid") ? "active" : ""}`}
          onClick={() => navigate("/firstaid")}
        >
          <span className="lp-nav-icon">✚</span>
          <span className="lp-nav-label">aid</span>
        </div>
        <div
          className={`lp-nav-item ${isActive("/anatomy") ? "active" : ""}`}
          onClick={() => navigate("/anatomy")}
        >
          <span className="lp-nav-icon">◎</span>
          <span className="lp-nav-label">learn</span>
        </div>
        <div
          className={`lp-nav-item ${isActive("/anatomy-explorer") ? "active" : ""}`}
          onClick={() => navigate("/anatomy-explorer")}
        >
          <span className="lp-nav-icon">🦴</span>
          <span className="lp-nav-label">3D</span>
        </div>
        <div
          className={`lp-nav-item ${isActive("/quiz") ? "active" : ""}`}
          onClick={() => navigate("/quiz")}
        >
          <span className="lp-nav-icon">?</span>
          <span className="lp-nav-label">quiz</span>
        </div>
        <div
          className={`lp-nav-item ${isActive("/profile") ? "active" : ""}`}
          onClick={() => navigate("/profile")}
        >
          <span className="lp-nav-icon">👤</span>
          <span className="lp-nav-label">account</span>
        </div>
      </div>
      <div className="lp-nav-item lp-nav-logout" onClick={handleLogout}>
        <span className="lp-nav-icon">⏻</span>
        <span className="lp-nav-label">logout</span>
      </div>
    </div>
  );
}

export default SideBar;
