// src/components/Home.js
import React from 'react';
import Hero from "../Components/Hero.js";
import './Home.css';

// Import images
import webDevelopmentImage from "../assets/home-page-image-1.png";
import legalWorkImage from "../assets/home-page-image-2.jpg";
import healthWellnessImage from "../assets/home-page-image-3.jpg";

function Home() {
  return (
    <div className="home">
      <div className="content-container">
        <Hero />
        <div className="image-gallery">
            <img src={webDevelopmentImage} alt="Web Development" className="home-image" />
            <img src={legalWorkImage} alt="Legal Work" className="home-image small-image" />
            <img src={healthWellnessImage} alt="Health & Wellness" className="home-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
