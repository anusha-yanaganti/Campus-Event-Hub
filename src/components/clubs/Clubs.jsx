import React from "react";
import "./Clubs.css";
//import Image from '../../assets/inn-clb.png';

function Clubs() {
  return (
    <section className="clubs" >
      <h1 className="heading">Our Clubs</h1>

      <div className="box-container">
        <div className="box">
          <div className="image">
            <img src="" alt="Coding Club" />
          </div>
          <div className="content">
            <h3>Innovation Club</h3>
            <p>
              Join the Coding Club to enhance your programming skills through regular coding sessions, hackathons, and collaboration on real-world projects.
            </p>
            <a href="#contact" className="btn">Explore More</a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src="images/img-2.jpg" alt="Robotics Club" />
          </div>
          <div className="content">
            <h3>Literary Club</h3>
            <p>
              Explore the world of robotics! Build, program, and compete with your robots. Perfect for those who love engineering and technology.
            </p>
            <a href="#contact" className="btn">Explore More</a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src="images/img-3.jpg" alt="Music Club" />
          </div>
          <div className="content">
            <h3>Arts Club</h3>
            <p>
              Whether you're into singing, playing instruments, or just enjoy music, our Music Club is the perfect place to share your passion.
            </p>
            <a href="#contact" className="btn">Explore More</a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src="images/img-4.jpg" alt="Photography Club" />
          </div>
          <div className="content">
            <h3>Photography Club</h3>
            <p>
              Capture the world through your lens! Join the Photography Club to improve your photography skills and participate in photo walks.
            </p>
            <a href="#contact" className="btn">Explore More</a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src="images/img-5.jpg" alt="Drama Club" />
          </div>
          <div className="content">
            <h3>Drama Club</h3>
            <p>
              Express yourself on stage! The Drama Club welcomes all aspiring actors, playwrights, and anyone interested in the performing arts.
            </p>
            <a href="#contact" className="btn">Explore More</a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src="images/img-6.jpg" alt="Literature Club" />
          </div>
          <div className="content">
            <h3>Literature Club</h3>
            <p>
              Dive into the world of books and literature. Discuss your favorite novels, share your writings, and participate in literary events.
            </p>
            <a href="#contact" className="btn">Explore More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clubs;
