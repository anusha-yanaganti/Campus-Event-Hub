    
    import "./Header.css";
    //import { Link } from "react-router-dom";
    import { HiOutlineHome } from "react-icons/hi";
    import { FiLogIn } from 'react-icons/fi';
    import { FaUsers } from 'react-icons/fa';  // Font Awesome
    //import { SiGnuprivacyguard } from "react-icons/si";
    //import { FaSignInAlt } from "react-icons/fa";
    import { IoMdInformationCircle } from "react-icons/io";
    import { MdEvent } from 'react-icons/md';
    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    //import { userLoginContext } from "../../contexts/userLoginContext";
    //import { useContext } from "react";
    import logo from '../../assets/logo.png';
    function Header() {
    //let { logoutUser, userLoginStatus } = useContext(userLoginContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className="d-flex flex-wrap justify-content-around header">
            {" "}
            <div className="logo-container">
        <img src={logo} alt="EventVerse Logo" className="logo" />
        
        </div>


            <nav className="nav-item">
                <ul>
                    <li>
                        <Link to="" className="nav-link ">
                        <HiOutlineHome className="fs-3 text-warning " /> <div className='white'> Home</div>
                        </Link>
                    </li>
                </ul>
        </nav>

            <nav className="nav-item">
                <ul>
                    <li>
                        <Link to="/events" className="nav-link ">
                        <MdEvent className=" fs-3 text-warning " /> <div className='white'> Events  </div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <nav className="nav-item">
                <ul>
                    <li>
                        <Link to="/clubs" className="nav-link ">
                        <FaUsers className=" fs-3 text-warning " /> <div className='white'> Clubs  </div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <nav className="nav-item">
                <ul>
                    <li>
                        <Link to="/about" className="nav-link ">
                        <IoMdInformationCircle className="fs-3 text-warning me-2 "/> <div className='white'>  About Us  </div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <nav className="nav-item">
                <ul>
                 <li className="nav-item">
                    < div className="nav-link"> 
                        <FiLogIn className="fs-3 text-danger" /> <div className='white'  onClick={toggleDropdown}>Login
                        {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/login?role=student">Student Login</Link></li>
                <li><Link to="/login?role=admin">Admin Login</Link></li>
              </ul>
            )}
                        </div>
                    </div>
                 </li>
                </ul>
            </nav>
        </div>
    );
    }

    export default Header;