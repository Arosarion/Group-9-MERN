import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      // Always show success regardless of whether email exists (security)
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Check your email</h2>
        <p>If that email exists, a reset link has been sent.</p>
        <Link to="/">Back to Login</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
      <h2>Forgot Password</h2>
      <p>Enter your email and we'll send you a reset link.</p>
      {error && <div style={{ color: 'red', marginBottom: '12px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '12px', boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ width: '100%', padding: '8px' }}>
          Send Reset Link
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;