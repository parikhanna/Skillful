import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from "./Components/Header.js";
import Home from "./Pages/Home.js";
import SkillRequestForm from "./Components/SkillRequestForm.js";
import AddResume from './Pages/AddResume.js';
import Profile from './Pages/Profile.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request-skill" element={<SkillRequestForm />} />
          <Route path="/uploadResume" element={<AddResume />}/>
        </Routes>
      </div>
    </Router>
  );
} 

export default App;
