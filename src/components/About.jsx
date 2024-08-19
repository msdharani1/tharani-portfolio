import React, { forwardRef } from 'react';
import { FaHtml5, FaCss3, FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiBootstrap, SiFirebase } from 'react-icons/si';

const About = forwardRef(({ scrollPosition }, ref) => {
  const opacity = Math.max(0, Math.min((scrollPosition - window.innerHeight / 2) / 300, 1));
  const translateY = Math.max(0, 100 - scrollPosition / 5);

  return (
    <div 
      className="about" 
      style={{ 
        opacity,
        transform: `translateY(${translateY}px)`
      }}
      ref={ref} // Assign the ref here
    >
      <h2>About Me</h2>
      <p>I am a front-end developer and musician with a diverse portfolio, including corporate websites, mobile apps, and music showcases. I specialize in creating user-friendly, responsive designs that blend technical skill with creativity.</p>
      
      <h3>Skills</h3>
      <div className="skills">
        <div className="skill"><FaHtml5 /> HTML</div>
        <div className="skill"><FaCss3 /> CSS</div>
        <div className="skill"><SiTailwindcss /> Tailwind CSS</div>
        <div className="skill"><SiBootstrap /> Bootstrap 5</div>
        <div className="skill"><FaReact /> React</div>
        <div className="skill"><FaReact /> React Native</div>
        <div className="skill"><SiFirebase /> Firebase</div>
      </div>

      <h3>Education</h3>
      <p>BCA, Graduated in 2024, <a href="https://kaliswaricollege.edu.in/" target="_blank" rel="noopener noreferrer">SKC</a></p>
      <p>MCA, Currently Enrolled, <a href="https://rathinamtechnicalcampus.com/" target="_blank" rel="noopener noreferrer">Rathinam College</a></p>
    </div>
  );
});

export default About;