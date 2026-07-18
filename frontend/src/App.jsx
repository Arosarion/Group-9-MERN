import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/Login/Login.css";
import "./components/informationpages/InfoPages.css";

import Login from "./components/Login/Login";
import RegistrationPage from "./components/register/RegistrationPage";
import ForgotPass from "./components/ForgotPassword/ForgotPass"; // TODO change if ForgotPass is diff name
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import FirstAid from "./components/informationpages/FirstAid";
import Home from "./components/HomePage/HomePage";
import Anatomy from "./components/informationpages/Anatomy";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/verify/:token" element={<VerifyEmail />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/firstaid"
        element={
          <ProtectedRoute>
            <FirstAid />
          </ProtectedRoute>
        }
      />
      <Route
        path="/anatomy"
        element={
          <ProtectedRoute>
            <Anatomy />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <h2>404 - Page Not Found</h2>
            <Link to="/">Go Home</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
