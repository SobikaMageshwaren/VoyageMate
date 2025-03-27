import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './HomePage.css'; // Ensure correct CSS path

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Static navigation bar */}
      <header className="navbar">
        <ul className="nav-buttons">
          <li><Link to="/">Welcome</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/itinerary-planner">Itinerary Planner</Link></li>
          <li><Link to="/destination-finder">Destination Finder</Link></li>
          <li><Link to="/trip-cost-calculator">Trip Cost Calculator</Link></li>
          <li><Link to="/travel-blog">Travel Blog</Link></li>
          <li><Link to="/payment-details">Payment Details</Link></li>
        </ul>
      </header>

      {/* Main content of the page */}
      <div className="main-content">
        {/* Left-side image box */}
        <div className="image-box">
          <div className="side-image"></div>
          <div className="app-description">
            <h2>About the Travel App</h2>
            <p>
              Our travel app helps you explore the most exciting destinations around the world.
              From breathtaking landscapes to iconic cityscapes, this app provides intelligent travel planning options
              and personalized suggestions to ensure you have an amazing trip.
            </p>
          </div>
        </div>
      </div>

      {/* Box for Most Happening Visits */}
      <div className="most-happening-visits">
        <h3>Most Happening Visits</h3>

        <div className="destination-container">
          {/* London */}
          <div className="destination">
            <div className="image-box london"></div>
            <div className="place-name">London</div>
            <div className="place-description">
              With its rich history, vibrant culture, and iconic landmarks like Big Ben and the London Eye, the city is a top choice for urban explorers.
            </div>
          </div>

          {/* Paris */}
          <div className="destination">
            <div className="image-box paris"></div>
            <div className="place-name">Paris</div>
            <div className="place-description">
              The "City of Lights" offers a romantic getaway with its world-class museums, beautiful architecture, and the famous Eiffel Tower.
            </div>
          </div>

          {/* Switzerland */}
          <div className="destination">
            <div className="image-box switzerland"></div>
            <div className="place-name">Switzerland</div>
            <div className="place-description">
              Famous for its stunning Alps, pristine lakes, and charming cities, Switzerland is a dream destination for nature lovers and adventure seekers.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
