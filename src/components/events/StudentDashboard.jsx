import React, { useState, useEffect } from 'react';
import './StudentDashboard.css'; // Import CSS for styling
//import { fetchAllEvents, fetchEnrolledEvents } from './api'; // Assume these are backend API calls

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);       // Store all events
  const [filteredEvents, setFilteredEvents] = useState([]); // Store filtered events
  const [viewEnrolled, setViewEnrolled] = useState(false);  // Track tab selection
  
  // Fetch all events when component loads
  useEffect(() => {
    async function fetchData() {
      const result = await fetchAllEvents(); // Fetch all events from backend
      setEvents(result);
      setFilteredEvents(result);  // Initially, all events are displayed
    }
    fetchData();
  }, []);

  // Handle the 'All' tab click
  const handleAllClick = () => {
    setViewEnrolled(false);
    setFilteredEvents(events);
  };

  // Handle the 'Enrolled' tab click (filter enrolled events)
  const handleEnrolledClick = async () => {
    setViewEnrolled(true);
    const enrolledEvents = await fetchEnrolledEvents(); // Fetch enrolled events from backend
    setFilteredEvents(enrolledEvents);
  };

  return (
    <div className="events-container">
      <div className="banner">
        <h1>Our Events...!!</h1>
      </div>
      <div className="tabs">
        <button 
          className={viewEnrolled ? '' : 'active'} 
          onClick={handleAllClick}>
          All
        </button>
        <button 
          className={viewEnrolled ? 'active' : ''} 
          onClick={handleEnrolledClick}>
          Enrolled
        </button>
      </div>

      <div className="event-list">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <button className="view-details-btn" onClick={() => window.location.href = `/events/${event.id}`}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
