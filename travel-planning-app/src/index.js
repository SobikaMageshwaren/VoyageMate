import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // You can add global CSS here if needed
import App from './App'; // Import the main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This hooks into the "root" div in your index.html
);
