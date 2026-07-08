import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import  './components/Login/Login.css'

import Login from "./components/Login/Login";
import RegistrationPage from "./components/Login/register/RegistrationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;