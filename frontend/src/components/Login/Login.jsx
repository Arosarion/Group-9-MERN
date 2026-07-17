import { useState } from "react";
import "./Login.css";
import { Link } from 'react-router-dom'
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await loginUser(formData.email, formData.password);
  
    if (data.success) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('username', data.username);
      window.location.href = '/home'; // redirect to home
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Please sign in to continue.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>

          </p>
        </div>
      </div>
    </div>
  );
}