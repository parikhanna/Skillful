import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-slogan">Request. <br /> Share. <br /> Grow.</h1>
      <div className="hero-button">
        <button className="request-skill-button">Request a Skill</button>
      </div>
    </section>
  );
}

export default Hero;
