import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading, success, error

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
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h2>Verification Failed</h2>
      <p>The link is invalid or has expired. Please register again.</p>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default VerifyEmail;
