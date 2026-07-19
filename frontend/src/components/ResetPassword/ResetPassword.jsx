import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 3000);
      } else {
        setError(data.error || "Reset failed. Link may have expired.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="reset-container">
        <div className="reset-card">
          <div className="reset-logo">
            <span className="reset-logo-triangle">▲</span>
            <span className="reset-logo-text">MEDSPACE</span>
          </div>
          <h2 className="reset-heading">
            PASSWORD
            <br />
            RESET
          </h2>
          <p className="reset-success-text">
            Your password has been updated successfully.
            <br />
            Redirecting to login...
          </p>
          <Link to="/" className="reset-link">
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-container">
      <div className="reset-card">
        <div className="reset-logo">
          <span className="reset-logo-triangle">▲</span>
          <span className="reset-logo-text">MEDSPACE</span>
        </div>
        <h2 className="reset-heading">
          RESET
          <br />
          PASSWORD
        </h2>
        <p className="reset-sub">Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>NEW PASSWORD</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="input-group">
            <label>CONFIRM PASSWORD</label>
            <input
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-btn">
            RESET PASSWORD →
          </button>
          {error && <p className="reset-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
