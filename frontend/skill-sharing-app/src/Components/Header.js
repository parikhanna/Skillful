import React, { useState } from 'react';
import './Header.css';

function Header() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login/logout toggle (for demo purposes)
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <header className="header">
      {/* Logo with gold dot */}
      <h1 className="header-logo">
        Skillful<span className="logo-dot">.</span>
      </h1>

      {/* Navigation Links aligned to the left */}
      <nav>
        <ul className="header-nav">
            <li>Request A Skill</li>
            <li>My Dashboard</li>
            <li>My Profile</li>
        </ul>
      </nav>

      {/* Login/Register or Logout button based on login state */}
      <div className="header-buttons">
        {isLoggedIn ? (
          <button className="logout-btn" onClick={toggleLogin}>Sign Out</button>
        ) : (
          <>
            <button className="login-btn" onClick={toggleLogin}>Login</button>
            <button className="register-btn">Register</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
