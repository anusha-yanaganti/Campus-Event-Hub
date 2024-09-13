import React from 'react';
import './About.css';

function About()
{
  return (
    <div className="about-container">
      <div className="colored-section">
      <h1>About Us</h1>
      </div>
      <div className="white-section">
      <p>
        Campus Event Hub is your one-stop platform for discovering and participating in exciting events organized by various student clubs and communities at our college.
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas beatae laboriosam ipsa cupiditate, dolore inventore provident odio laborum unde molestiae rem sit perspiciatis. Distinctio consequuntur delectus aliquid nihil. Laborum, sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla illum impedit officiis vero id et eaque delectus! Exercitationem, inventore officia ut, rerum nulla quasi hic fuga voluptates necessitatibus id debitis.
        Our mission is to foster a vibrant campus culture where students can connect, learn, and grow through participation in a wide range of events.
        </p>
  <h2 className='mi'>Our Mission</h2>
  <p className="miss"> Our mission is to empower students by providing them with a centralized platform that showcases all the events happening on campus. We aim to bridge the gap between clubs and students, making it easier for everyone to engage in campus life and grow both personally and professionally.</p>
  <img src="https://i.pinimg.com/originals/50/78/a0/5078a05eb1b6847d93383eaa4c0ed500.gif" alt=""  className='miss-pic'/>

  <h2 className='vi'>Our Vision</h2>
  <p className="viss"> Our mission is to empower students by providing them with a centralized platform that showcases all the events happening on campus. We aim to bridge the gap between clubs and students, making it easier for everyone to engage in campus life and grow both personally and professionally.</p>
  <img src="https://i.pinimg.com/originals/50/78/a0/5078a05eb1b6847d93383eaa4c0ed500.gif" alt=""  className='viss-pic'/>
      </div>
      <div className="image-divider">
        <img src="https://c.tenor.com/ZH75llab-U0AAAAC/meeting-sticker.gif" alt="" />
      </div>

      
    </div>
  );
};

export default About;
