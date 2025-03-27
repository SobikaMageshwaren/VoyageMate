import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ItineraryPage.css';

const ItineraryPage = () => {
  const navigate = useNavigate();
  const [itineraryData, setItineraryData] = useState({
    source: '',
    destination: '',
    passengers: '',
    transportation: '',
    phoneNumber: '',
  });

  const [bubbleCount, setBubbleCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItineraryData({ ...itineraryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/itineraries', itineraryData);
      alert(response.data.message);
      console.log(itineraryData);
      navigate('/map', { state: itineraryData });
    } catch (error) {
      console.error('Error submitting itinerary:', error);
      alert('Failed to submit itinerary. Please try again.');
    }
  };

  const createBubble = () => {
    if (bubbleCount < 10) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';

      const size = Math.random() * 50 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}vw`;

      document.body.appendChild(bubble);
      setBubbleCount((prevCount) => prevCount + 1);

      bubble.addEventListener('animationend', () => {
        bubble.remove();
        setBubbleCount((prevCount) => prevCount - 1);
      });
    }
  };

  useEffect(() => {
    document.body.classList.add('itinerary-page');
    const interval = setInterval(createBubble, 1000);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('itinerary-page');
    };
  }, [bubbleCount]);

  return (
    <div className="main-container">
      <div className="itinerary-container">
        <h2>Plan Your Itinerary</h2>
        <form onSubmit={handleSubmit} className="itinerary-form">
          <div className="form-group">
            <label htmlFor="source">Source:</label>
            <input
              type="text"
              id="source"
              name="source"
              value={itineraryData.source}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={itineraryData.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passengers">Number of Passengers:</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={itineraryData.passengers}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="transportation">Preferred Transportation:</label>
            <select
              id="transportation"
              name="transportation"
              value={itineraryData.transportation}
              onChange={handleChange}
              required
            >
              <option value="">Select a mode of transport</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={itineraryData.phoneNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              placeholder="Enter a 10-digit number"
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ItineraryPage;
