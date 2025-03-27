import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FhbGFrYXJpa2FsYW4iLCJhIjoiY20yYjl2dzdqMHAydjJ3c2ZjYng1d2Q3YyJ9._iDR65eR_qkzbtrrcRjqag';

const DestinationFinder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { destination } = location.state || {};

    const [map, setMap] = useState(null);
    const [poiType, setPoiType] = useState('');
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (destination) {
            initializeMap();
        }
    }, [destination]);

    useEffect(() => {
        if (map && poiType) {
            loadPointsOfInterest(map.getCenter().toArray(), poiType);
        }
    }, [poiType]);

    const initializeMap = async () => {
        const destinationCoords = await geocodeLocation(destination);

        const mapboxMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: destinationCoords,
            zoom: 12,
        });

        setMap(mapboxMap);
    };

    const geocodeLocation = async (location) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.features[0].center;
    };

    const loadPointsOfInterest = async (coords, type) => {
        if (!map || !type) return;

        // Use 'gas station' for petrol bunks
        const mappedType = type === 'petrol station' ? 'gas station' : type;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(mappedType)}.json?proximity=${coords[0]},${coords[1]}&limit=10&access_token=${mapboxgl.accessToken}`;

        const response = await fetch(url);
        const data = await response.json();
        const points = data.features;

        markers.forEach(marker => marker.remove());
        setMarkers([]);

        const newMarkers = points.map((point) => {
            const marker = new mapboxgl.Marker({ className: 'marker' })
                .setLngLat(point.geometry.coordinates)
                .setPopup(new mapboxgl.Popup().setText(point.place_name))
                .addTo(map);
            return marker;
        });

        setMarkers(newMarkers);
    };

    const handleOptionClick = (type) => {
        const mappedType = type === 'atm' ? 'bank' : type;
        setPoiType(mappedType);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Explore Amenities Near {destination}</h2>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => handleOptionClick('hotel')} style={buttonStyle}>Hotels</button>
                <button onClick={() => handleOptionClick('atm')} style={buttonStyle}>ATMs</button>
                <button onClick={() => handleOptionClick('petrol station')} style={buttonStyle}>Petrol Bunks</button>
            </div>
            <div id="map" style={{ height: '500px', width: '100%' }}></div>
            <button onClick={() => navigate('/travel-blog')} style={buttonStyle}>Go to Travel Blog</button>
            <button onClick={() => navigate('/')} style={backButtonStyle}>Back to Itinerary</button>
        </div>
    );
};

const buttonStyle = {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
};

const backButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
};

export default DestinationFinder;
