const [resendStatus, setResendStatus] = useState("");
const [email, setEmail] = useState("");

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
