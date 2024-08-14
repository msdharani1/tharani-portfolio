// About.jsx
import React from 'react';
import { FaHtml5, FaCss3, FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiBootstrap, SiFirebase } from 'react-icons/si';

function About({ scrollPosition }) {
  const opacity = Math.max(0, Math.min((scrollPosition - window.innerHeight / 2) / 300, 1));
  const translateY = Math.max(0, 100 - scrollPosition / 5);

  return (
    <div 
      className="about" 
      style={{ 
        opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      <h2>About Me</h2>
      <p>I'm a web developer, working on various projects including freelancing, personal app development, and more.</p>
      
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
      <p>BCA (finish 2024) at <a href="https://kaliswaricollege.edu.in/" target="_blank" rel="noopener noreferrer">SKC</a></p>
      <p>MCA (pursuing) at <a href="https://rathinamtechnicalcampus.com/" target="_blank" rel="noopener noreferrer">Rathinam College</a></p>
    </div>
  );
}

export default About;