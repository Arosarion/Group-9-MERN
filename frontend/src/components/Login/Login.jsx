import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [pulse, setPulse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(formData.email, formData.password);
    if (data.success) {
      setErrorMsg("");
      setPulse("success");
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("username", data.username);
      setTimeout(() => {
        window.location.href = "/home";
      }, 800);
    } else {
      setPulse("error");
      setErrorMsg(data.error || "Invalid email or password");
      setTimeout(() => setPulse(""), 800);
    }
  };

  return (
    <div className="login-container">
      {/* Left panel — branding */}
      <div className="login-left">
        <div className="login-logo">
          <span className="login-logo-triangle">▲</span>
          <span className="login-logo-text">MEDSPACE</span>
        </div>
        <div className="login-brand">
          <h1 className="login-title">
            MED
            <br />
            <span>SPACE</span>
          </h1>
          <div className="login-tagline-row">
            <div className="login-accent-line"></div>
            <p className="login-tagline">
              Medical education.
              <br />
              Learn. Quiz. Track.
            </p>
          </div>
          <div className="login-meta">MEDSPACE.DEV — 2026</div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right">
        <div className="login-form-wrap">
          <h2 className="login-heading">SIGN IN</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={
                  pulse === "error"
                    ? "pulse-error"
                    : pulse === "success"
                      ? "pulse-success"
                      : ""
                }
                required
              />
            </div>
            <div className="input-group">
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={
                  pulse === "error"
                    ? "pulse-error"
                    : pulse === "success"
                      ? "pulse-success"
                      : ""
                }
                required
              />
            </div>
            <button type="submit">SIGN IN →</button>
            {errorMsg && <p className="login-error-msg">{errorMsg}</p>}
          </form>
          <div className="login-footer">
            <Link to="/forgot-password">Forgot password?</Link>
            <p>
              No account? <Link to="/register">Register →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
