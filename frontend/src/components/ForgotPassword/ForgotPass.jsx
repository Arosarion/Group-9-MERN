import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPass.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="forgot-container">
        <div className="forgot-card">
          <div className="forgot-logo">
            <span className="forgot-logo-triangle">▲</span>
            <span className="forgot-logo-text">MEDSPACE</span>
          </div>
          <h2 className="forgot-heading">
            CHECK YOUR
            <br />
            EMAIL
          </h2>
          <p className="forgot-success-text">
            If that email exists, a reset link has been sent.
            <br />
            Check your inbox and click the link to reset your password.
          </p>
          <Link to="/" className="forgot-link">
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-logo">
          <span className="forgot-logo-triangle">▲</span>
          <span className="forgot-logo-text">MEDSPACE</span>
        </div>
        <h2 className="forgot-heading">
          FORGOT
          <br />
          PASSWORD
        </h2>
        <p className="forgot-sub">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-btn">
            SEND RESET LINK →
          </button>
          {error && <p className="forgot-error">{error}</p>}
        </form>
        <Link to="/" className="forgot-link">
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
