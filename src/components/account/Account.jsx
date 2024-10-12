// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Default profile icon
import './Account.css'; // Import sidebar styling

const Account = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState(null); // State to hold the fetched user data
  const [error, setError] = useState(null); // State for error handling

  // Fetch user details when the sidebar is opened
  useEffect(() => {
    if (isOpen) {
      const fetchUserDetails = async () => {
        try {
          const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
          console.log('Token from localStorage:', token);  // Log the token

    if (!token) {
      throw new Error('No token found. Please log in again.');
    }
    const response = await fetch('http://localhost:4000/api/users/user-details', {
        method: 'GET', // Use GET method to fetch user data
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token from localStorage
        },
      });

          // Parse response
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user details');
          }

          const data = await response.json();
          setUserData(data); // Set the fetched user data
        } catch (error) {
          setError(error.message); // Set error message for rendering
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [isOpen]); // Fetch data when the sidebar is opened

  return (
    <div className={`profile-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="profile-header">
        <button className="close-button" onClick={onClose}>X</button>
      </div>

      <div className="profile-content">
        {/* Default profile icon */}
        <div className="profile-icon-large">
          <FaUserCircle className="fs-5 text-warning" />
        </div>

        {/* Display error if any */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Display user details if available */}
        {userData ? (
          <div className="user-details">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile Number:</strong> {userData.mobileNumber}</p>
          </div>
        ) : (
          !error && <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default Account;
