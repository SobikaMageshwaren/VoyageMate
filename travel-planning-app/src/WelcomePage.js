import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Ensure the CSS file is correctly linked

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="home-page">
      <div className="box">
        
        {/* Image container */}
        <div className="image-container">
          {/* Image is set via CSS background-image */}
        </div>

        {/* Content section */}
        <div className="content">
          <h1 className="app-name">Voyage AI</h1>
          <p className="quote">"Explore the world with intelligence and passion"</p>
          
          {/* Buttons */}
          <div className="buttons">
            <button className="page-button" onClick={() => handleNavigation('/home')}>Home</button>
            <button className="page-button" onClick={() => handleNavigation('/login')}>Login</button>
            <button className="page-button" onClick={() => handleNavigation('/itinerary-planner')}>Itinerary Planner</button>
            <button className="page-button" onClick={() => handleNavigation('/destination-finder')}>Destination Finder</button>
            <button className="page-button" onClick={() => handleNavigation('/trip-cost-calculator')}>Trip Cost Calculator</button>
            <button className="page-button" onClick={() => handleNavigation('/travel-blogs')}>Travel Blogs</button>
            <button className="page-button" onClick={() => handleNavigation('/payment-details')}>Payment Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
