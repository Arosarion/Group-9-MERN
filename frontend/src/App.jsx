import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import  './components/Login/Login.css'

import Login from "./components/Login/Login";
import RegistrationPage from "./components/register/RegistrationPage";
import FirstAid from './components/informationpages/FirstAid';
import Home from './components/HomePage/HomePage';
import Anatomy from './components/informationpages/Anatomy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/firstaid" element={<FirstAid />} />
      <Route path="/anatomy" element={<Anatomy />} />
    </Routes>
  );
}

export default App;