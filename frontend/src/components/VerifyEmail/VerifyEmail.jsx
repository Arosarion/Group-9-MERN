import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./VerifyEmail.css";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [resendStatus, setResendStatus] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/verify/${token}`,
        );
        const data = await res.json();
        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  const handleResend = async () => {
    if (!email) {
      setResendStatus("Please enter your email address.");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setResendStatus("Verification email sent! Check your inbox.");
      } else {
        setResendStatus(data.error || "Something went wrong.");
      }
    } catch {
      setResendStatus("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="verify-container">
        <div className="verify-card">
          <div className="verify-logo">
            <span className="verify-logo-triangle">▲</span>
            <span className="verify-logo-text">MEDSPACE</span>
          </div>
          <h2 className="verify-heading">VERIFYING...</h2>
          <p className="verify-text">Please wait while we verify your email.</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="verify-container">
        <div className="verify-card">
          <div className="verify-logo">
            <span className="verify-logo-triangle">▲</span>
            <span className="verify-logo-text">MEDSPACE</span>
          </div>
          <h2 className="verify-heading">
            EMAIL
            <br />
            VERIFIED
          </h2>
          <p className="verify-text">
            Your account is now active.
            <br />
            You can now sign in.
          </p>
          <Link to="/" className="verify-link">
            ← Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-container">
      <div className="verify-card">
        <div className="verify-logo">
          <span className="verify-logo-triangle">▲</span>
          <span className="verify-logo-text">MEDSPACE</span>
        </div>
        <h2 className="verify-heading">
          VERIFICATION
          <br />
          FAILED
        </h2>
        <p className="verify-text">
          The link is invalid or has expired.
          <br />
          Enter your email to get a new verification link.
        </p>
        <div className="verify-input-group">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="verify-btn" onClick={handleResend}>
          RESEND VERIFICATION →
        </button>
        {resendStatus && (
          <p
            className={`verify-status ${resendStatus.includes("sent") ? "success" : "error"}`}
          >
            {resendStatus}
          </p>
        )}
        <Link to="/register" className="verify-link">
          Register instead →
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
