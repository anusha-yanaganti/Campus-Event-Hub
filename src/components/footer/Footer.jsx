import React from 'react';
import './Footer.css';  // Make sure to include your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Quick links</h3>
          <a href="#home">home</a>    
          <a href="#events">events</a>
          <a href="#query">query</a>
        </div>
       
        <div className="box">
          <h3>contact info</h3>
        <a href="tel:+916302356563"> 
            <FontAwesomeIcon icon={faPhone} /> +91 6302356563
        </a>
        
        <a href="mailto:anushayanaganti321@gmail.com"> 
            <FontAwesomeIcon icon={faEnvelope} /> anushayanaganti321@gmail.com
        </a>
        
        </div>

        <div className="box">
          <h3>follow us</h3>
          <a href="https://www.linkedin.com/in/anusha-yanaganti-168332255/"> 
            <FontAwesomeIcon icon={faLinkedin} /> linkedin 
          </a>
          <a href="https://github.com/anusha-yanaganti"> 
            <FontAwesomeIcon icon={faGithub} /> github 
          </a>
        </div>

        <div className="box map-box">
          <h3>Our Location</h3>
          <div className="map-container">
            {/* Replace the src URL with your actual Google Maps embed URL */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.7604986655674!2d80.6915578749769!3d16.487660584254158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb3d5f7810a9%3A0x4a6d6804b71db09!2sPrasad%20V.%20Potluri%20Siddhartha%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1725341720543!5m2!1sen!2sin" 
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="College Map"
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
             
          </div>
        </div>
      </div>

      <div className="credit">
            <p>&copy; {new Date().getFullYear()} <span className='yc'>Campus Event Hub</span>. All rights reserved.</p>
      </div>
    </section>
  );
}

export default Footer;
