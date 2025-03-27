import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FhbGFrYXJpa2FsYW4iLCJhIjoiY20yYjl2dzdqMHAydjJ3c2ZjYng1d2Q3YyJ9._iDR65eR_qkzbtrrcRjqag';

const MapComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const itineraryData = location.state;
    const { source: initialSource, destination: initialDestination } = itineraryData || {};

    const [map, setMap] = useState(null);
    const [route, setRoute] = useState([]);
    const [source, setSource] = useState(initialSource || '');
    const [destination, setDestination] = useState(initialDestination || '');
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const initializeMap = () => {
            const mapboxMap = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 2,
            });

            setMap(mapboxMap);
        };

        initializeMap();
    }, []);

    useEffect(() => {
        if (map) {
            map.on('load', () => {
                // Additional map layers can be added here
            });
        }
    }, [map]);

    useEffect(() => {
        if (source && destination) {
            getRoute(source, destination);
        }
    }, [source, destination]);

    const getRoute = async (src, dest) => {
        const geoSrc = await geocodeLocation(src);
        const geoDest = await geocodeLocation(dest);

        if (geoSrc && geoDest) {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${geoSrc[0]},${geoSrc[1]};${geoDest[0]},${geoDest[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.routes.length > 0) {
                        const routeData = data.routes[0].geometry.coordinates;
                        setRoute(routeData);
                        drawRoute(routeData);
                        map.fitBounds([geoSrc, geoDest], { padding: 20 });

                        const distanceInMeters = data.routes[0].distance;
                        const distanceInKm = (distanceInMeters / 1000).toFixed(2);
                        setDistance(distanceInKm);
                    } else {
                        console.error('No route found.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching route:', error);
                });
        }
    };

    const drawRoute = (routeData) => {
        const routeLine = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: routeData,
            },
        };

        if (map) {
            if (map.getSource('route')) {
                map.removeLayer('route');
                map.removeSource('route');
            }

            map.addSource('route', {
                type: 'geojson',
                data: routeLine,
            });

            map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 6,
                },
            });
        }
    };

    const geocodeLocation = async (location) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.features && Array.isArray(data.features) && data.features.length > 0) {
                return data.features[0].center; // [longitude, latitude]
            } else {
                console.error('No features found for the location:', location);
                return null;
            }
        } catch (error) {
            console.error('Error during geocoding:', error);
            return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (source && destination) {
            getRoute(source, destination);
        }
    };

    const handleNext = () => {
        navigate('/destination-finder', { state: { source, destination } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
                <h1 style={{ margin: 0 }}>Route from {source} to {destination}</h1>
                {distance && <h2 style={{ margin: '10px 0' }}>Distance: {distance} km</h2>}
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                        style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="Destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                        style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>Get Route</button>
                </form>
            </div>
            <div id="map" style={{ flex: 1, height: '100%', backgroundImage: 'none' }}></div>
            <button 
                onClick={handleNext} 
                style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '8px 16px', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', border: 'none' }}
            >
                Next
            </button>
        </div>
    );
};

export default MapComponent;
