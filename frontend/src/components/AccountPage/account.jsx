import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Account.css";
import SideBar from "../Sidebar";

export default function AccountSettings() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    score: null,
  });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem("token");

        // TODO: replace with your actual backend endpoint for fetching
        // the logged-in user's account info (username, email, score).
        const response = await fetch("/api/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setUserData({
            username: data.username || localStorage.getItem("username") || "",
            email: data.email || "",
            score: data.score ?? 0,
          });
        } else {
          setErrorMsg(data.error || "Could not load account info.");
        }
      } catch (err) {
        // Fallback: at least show what we already have in localStorage
        setUserData((prev) => ({
          ...prev,
          username: localStorage.getItem("username") || "",
        }));
        setErrorMsg("Could not reach the server. Showing limited info.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
        <SideBar />

            <div className="login-container login-container-solo">
      {/* Account settings panel */}
      <div className="login-right login-right-solo">
        <div className="login-form-wrap">
          <h2 className="login-heading">ACCOUNT SETTINGS</h2>

          {loading ? (
            <p>Loading account info...</p>
          ) : (
            <>
              <div className="input-group">
                <label>USERNAME</label>
                <input type="text" value={userData.username} readOnly />
              </div>

              <div className="input-group">
                <label>EMAIL ADDRESS</label>
                <input type="email" value={userData.email} readOnly />
              </div>

              <div className="input-group">
                <label>SCORE</label>
                <input type="text" value={userData.score} readOnly />
              </div>

              {errorMsg && <p className="login-error-msg">{errorMsg}</p>}

              <button type="button" onClick={() => navigate("/forgot-password")}>
                RESET PASSWORD →
              </button>

              <button type="button" onClick={handleLogout}>
                LOG OUT
              </button>
            </>
          )}

          <div className="login-footer">
            <Link to="/home">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    

  );
}