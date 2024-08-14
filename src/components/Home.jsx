// Home.jsx
import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import pic from '../assets/pic.webp';
import { FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

function Home({ scrollPosition }) {
  const circleSize = Math.min(300 + scrollPosition / 0.9, window.innerHeight * 2);

  return (
    <div className="home">
      <div className="left-content">
        <h1>I'm  
          <TypeAnimation
            sequence={[
              'THARANI M',
              1000,
              'a Web Developer',
              1000,
              'a Youtuber',
              1000,
              'a Music Creator',
              1000
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display: 'inline-block', marginLeft: '10px', color: '#3498db' }}
          />
        </h1>
        <p>Passionate about creating responsive and user-friendly web experiences.</p>
      </div>
      <div 
        className="circle" 
        style={{ 
          width: `${circleSize}px`, 
          height: `${circleSize}px` 
        }}
      ></div>
      <div>
      <img src={pic} alt="Your profile" className='middle' />
      </div>
      <div className="right-content">
        <h2 className='prof-text flex'>Other Profiles</h2>
      <div className="links flex">
          <div className='flex'>
            <FaYoutube color='red' />
            <a href="https://youtube.com/c/@MSDharaniOfficial" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div className='flex'>
            <TbWorld color='lightblue' />
            <a href="https://www.artistmsdharani.com" target="_blank" rel="noopener noreferrer">Music</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;