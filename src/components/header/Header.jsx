import "./Header.css";
import { HiOutlineHome } from "react-icons/hi";
import { FaUsers, FaUserCircle } from 'react-icons/fa'; // Profile Icon
import { IoMdInformationCircle } from "react-icons/io";
import { MdEvent } from 'react-icons/md';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FiLogIn } from 'react-icons/fi'; // Login icon
import Account from "../account/Account";


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   // Toggle dropdown visibility
   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      setIsDropdownOpen(false); // Close the dropdown when sidebar opens
  };

  // Check if user is logged in (if JWT token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logout
  };

 
  // Close the dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="d-flex flex-wrap justify-content-around header">
      <div className="logo-container">
        <img src={logo} alt="EventVerse Logo" className="logo" />
      </div>

      <nav className="nav-item">
        <ul>
          <li>
            <Link to="/" className="nav-link ">
              <HiOutlineHome className="fs-3 text-warning " />{" "}
              <div className="white"> Home</div>
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="nav-item">
        <ul>
          <li>
            <Link to="/events" className="nav-link ">
              <MdEvent className="fs-3 text-warning " />{" "}
              <div className="white"> Events </div>
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="nav-item">
        <ul>
          <li>
            <Link to="/clubs" className="nav-link ">
              <FaUsers className="fs-3 text-warning " />{" "}
              <div className="white"> Clubs </div>
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="nav-item">
        <ul>
          <li>
            <Link to="/about" className="nav-link ">
              <IoMdInformationCircle className="fs-3 text-warning me-2 " />{" "}
              <div className="white"> About Us </div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Conditional rendering for Login/Profile */}
      <nav className="nav-item">
        <ul>
          {!isLoggedIn ? (
            <li className="nav-item">
              <div className="nav-link">
                <FiLogIn className="fs-3 text-danger" />
                <div className="white" onClick={toggleDropdown}>
                  Login
                  {isDropdownOpen && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/login?role=student">Student Login</Link>
                      </li>
                      <li>
                        <Link to="/login?role=admin">Admin Login</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <div className="nav-link" onClick={toggleDropdown} ref={dropdownRef}>
                <FaUserCircle className="fs-3 text-warning" />
                <div className="white">Profile</div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                   { /*<li >
                      <Link to="/account">Account</Link>
                    </li>*/}
                    <li onClick={toggleSidebar}> Account</li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                )}
              </div>
            </li>
          )}
        </ul>
          {/* Sidebar Component for Profile */}
            <Account isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </nav>
    </div>
  );
}
export default Header;
