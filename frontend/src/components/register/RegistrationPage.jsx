import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/auth";
import "./RegistrationPage.css";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pulse, setPulse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPulse("error");
      setErrorMsg("Passwords do not match.");
      setTimeout(() => setPulse(""), 800);
      return;
    }

    if (formData.password.length < 8) {
      setPulse("error");
      setErrorMsg("Password must be at least 8 characters.");
      setTimeout(() => setPulse(""), 800);
      return;
    }

    const data = await registerUser(
      formData.username,
      formData.email,
      formData.password,
    );

    if (data.success) {
      setPulse("success");
      setTimeout(() => setSuccess(true), 800);
    } else {
      setPulse("error");
      setErrorMsg(data.error || "Registration failed. Please try again.");
      setTimeout(() => setPulse(""), 800);
    }
  };

  if (success) {
    return (
      <div className="reg-container">
        <div className="reg-left">
          <div className="reg-logo">
            <span className="reg-logo-triangle">▲</span>
            <span className="reg-logo-text">MEDSPACE</span>
          </div>
          <div className="reg-brand">
            <h1 className="reg-title">
              MED
              <br />
              <span>SPACE</span>
            </h1>
            <div className="reg-tagline-row">
              <div className="reg-accent-line"></div>
              <p className="reg-tagline">
                Medical education.
                <br />
                Learn. Quiz. Track.
              </p>
            </div>
            <div className="reg-meta">MEDSPACE.DEV — 2026</div>
          </div>
        </div>
        <div className="reg-right">
          <div className="reg-form-wrap" style={{ textAlign: "center" }}>
            <h2 className="reg-heading">CHECK YOUR EMAIL</h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "sans-serif",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              We sent a verification link to
              <br />
              <strong style={{ color: "#fff" }}>{formData.email}</strong>.<br />
              Click it to activate your account before logging in.
            </p>
            <Link to="/" className="reg-back-link">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-container">
      <div className="reg-left">
        <div className="reg-logo">
          <span className="reg-logo-triangle">▲</span>
          <span className="reg-logo-text">MEDSPACE</span>
        </div>
        <div className="reg-brand">
          <h1 className="reg-title">
            MED
            <br />
            <span>SPACE</span>
          </h1>
          <div className="reg-tagline-row">
            <div className="reg-accent-line"></div>
            <p className="reg-tagline">
              Medical education.
              <br />
              Learn. Quiz. Track.
            </p>
          </div>
          <div className="reg-meta">MEDSPACE.DEV — 2026</div>
        </div>
      </div>

      <div className="reg-right">
        <div className="reg-form-wrap">
          <h2 className="reg-heading">CREATE ACCOUNT</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>USERNAME</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
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
                placeholder="Min 8 characters"
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
            <div className="input-group">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                value={formData.confirmPassword}
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
            <div className="reg-terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
            <button type="submit">CREATE ACCOUNT →</button>
            {errorMsg && <p className="reg-error-msg">{errorMsg}</p>}
          </form>
          <div className="reg-footer">
            <p>
              Already have an account? <Link to="/">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
