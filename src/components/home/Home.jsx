import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
function Home(){
  return (
    <div className="home">

      <h1>Campus Event Hub</h1>
      <p className='diff'> Discover . Register . Participate </p>
      <div>
      <p>"Empowering Connections, Unleashing Potential:    
        <p></p>Your Gateway to Campus Events and Beyond."</p>

      
      </div>
      
      <div classname="btn">
        < Link to="/events/StudentDashboard" class="btn">Get Started</Link>
        </div>
    </div>
  );
};

export default Home;
