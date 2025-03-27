import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (password !== confirmPassword) {
      newErrors.password = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 201) {
          alert('Registration successful');
          setIsPreviewed(true);
        }
      } catch (error) {
        alert('Registration failed. Please try a different email.');
        console.error(error);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password,
      });
      if (response.data === 'Login successful') {
        setShowSuccessPopup(true);
        setIsPreviewed(false);
        setTimeout(() => {
          navigate('/itinerary-planner'); // Navigate to Itinerary Planner after a brief delay
        }, 2000); // 2-second delay for showing the success image
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsPreviewed(false);
    setShowSuccessPopup(false);
  };

  return (
    <div className={`login-container ${isPreviewed ? 'preview-bg' : 'initial-bg'}`}>
      <div className="flex-layout">
        {isPreviewed ? (
          <div className="login-content preview-box">
            <h1 className="login-title">Preview</h1>
            <div className="user-info">
              <p><strong>Username:</strong> {formData.username}</p>
              <p><strong>Email:</strong> {formData.email}</p>
            </div>
            <button className="login-button" onClick={handleLogin}>Login</button>
            <button className="edit-button" onClick={handleEdit}>Edit</button>
          </div>
        ) : (
          <div className="login-content">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={handlePreview}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <button type="submit">Preview</button>
            </form>
          </div>
        )}
      </div>

      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowSuccessPopup(false)}>&times;</span>
            <h2>Login Successful!</h2>
            <div className="success-image">
              <p>Welcome, {formData.username}!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
