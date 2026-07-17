import { useState } from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import  './components/Login/Login.css'
import './components/informationpages/InfoPages.css'

import Login from "./components/Login/Login";
import RegistrationPage from "./components/register/RegistrationPage";
import ForgotPass from "./components/ForgotPassword/ForgotPass";// TODO change if ForgotPass is diff name
import FirstAid from './components/informationpages/FirstAid';
import Home from './components/HomePage/HomePage';
import Anatomy from './components/informationpages/Anatomy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<ForgotPass />} /> 
      <Route path="/home" element={<Home />} />
      <Route path="/firstaid" element={<FirstAid />} />
      <Route path="/anatomy" element={<Anatomy />} />
      <Route path="*" element={<div style={{textAlign:'center', padding:'4rem'}}><h2>404 - Page Not Found</h2><Link to="/">Go Home</Link></div>} />
    </Routes>
  );
}

export default App;