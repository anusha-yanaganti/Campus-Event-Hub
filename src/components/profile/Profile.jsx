import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome icon for profile
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css'; // Import your CSS file

function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // For navigation
  const dropdownRef = useRef(null); // Ref to the dropdown menu

  // Function to toggle dropdown visibility on click
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsDropdownOpen(false); // Close the dropdown
    navigate("/login"); // Redirect to login page
  };

  // Close the dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="profile-icon-container">
      {/* Profile icon with click handler */}
      <FaUserCircle className="profile-icon" onClick={toggleDropdown} />

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li>
            <Link to="/account">Account</Link> {/* Link to Account editing page */}
          </li>
          <li onClick={handleLogout}>
            <span style={{ cursor: 'pointer' }}>Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Profile;
