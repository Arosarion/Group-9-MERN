const API_URL = import.meta.env.VITE_API_URL || "https://medspace.dev";

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const registerUser = async (username, email, password) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`${API_URL}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
