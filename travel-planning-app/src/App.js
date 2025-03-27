import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ItineraryPage from './ItineraryPage';
import MapComponent from './MapComponent';
import DestinationFinder from './DestinationFinder';
import TravelBlog from './TravelBlog'; // Import TravelBlog component
import BookingPage from './BookingPage'; // Import BookingPage component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/itinerary-planner" element={<ItineraryPage />} />
                <Route path="/map" element={<MapComponent />} />
                <Route path="/destination-finder" element={<DestinationFinder />} />
                <Route path="/travel-blog" element={<TravelBlog />} />
                <Route path="/booking" element={<BookingPage />} /> {/* Corrected to use element */}
            </Routes>
        </Router>
    );
};

export default App;
