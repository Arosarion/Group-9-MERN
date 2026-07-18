import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      setError("Passwords do not match");
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
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>Password Reset!</h2>
        <p>Your password has been updated. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem" }}>
      <h2>Reset Password</h2>
      <p>Enter your new password below.</p>
      {error && (
        <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />
        <button type="submit" style={{ width: "100%", padding: "8px" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
