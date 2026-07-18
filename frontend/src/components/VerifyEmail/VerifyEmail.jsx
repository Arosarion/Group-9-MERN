import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p>Verifying your email...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>Email Verified!</h2>
        <p>Your account is now active. You can log in.</p>
        <Link to="/">Go to Login</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem" }}>
      <h2>Verification Failed</h2>
      <p>The link is invalid or has expired.</p>
      <div style={{ marginTop: "24px" }}>
        <p style={{ marginBottom: "8px", fontSize: "13px" }}>
          Enter your email to get a new verification link:
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleResend}
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        >
          Resend Verification Email
        </button>
        {resendStatus && (
          <p
            style={{
              fontSize: "13px",
              color: resendStatus.includes("sent") ? "green" : "red",
            }}
          >
            {resendStatus}
          </p>
        )}
      </div>
      <Link to="/register" style={{ fontSize: "13px" }}>
        Register instead →
      </Link>
    </div>
  );
}

export default VerifyEmail;
