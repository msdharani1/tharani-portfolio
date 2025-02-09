import React, { forwardRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaYoutube, FaFileDownload } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import pic from '../assets/pic.webp';

const Home = forwardRef(({ scrollPosition }, ref) => {
  const circleSize = Math.min(300 + scrollPosition / 0.9, window.innerHeight * 2);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex justify-around items-center overflow-hidden px-4 md:px-8 sticky top-0"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Mobile Content (Only visible on mobile/medium devices) */}
      <div className="absolute top-0 left-0 right-0 md:hidden z-10 pt-8">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">
            I'm{' '}
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
              className="inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            />
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto mb-6">
            Passionate about creating responsive and user-friendly web experiences.
          </p>
          <a 
            href="/path-to-your-cv.pdf" 
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <FaFileDownload className="w-5 h-5" />
            Download CV
          </a>
        </div>
      </div>

      {/* Left Content (Only visible on desktop) */}
      <div className="w-full md:w-1/3 z-10 px-4 md:px-0 hidden md:block">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          I'm{' '}
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
            className="inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          />
        </h1>
        <p className="text-lg text-gray-300 max-w-md mb-6">
          Passionate about creating responsive and user-friendly web experiences.
        </p>
        <a 
          href="/logo.png" 
          download
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        >
          <FaFileDownload className="w-5 h-5" />
          Download CV
        </a>
      </div>

      {/* Animated Circle */}
      <div
        className="absolute rounded-full transition-all duration-500 ease-out bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-3xl"
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          boxShadow: '0 0 50px rgba(52, 152, 219, 0.3)'
        }}
      />

      {/* Profile Image - Updated for tall screens */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full z-10">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[400px] mx-auto 
          [min-height:700px]:max-w-[320px] [min-height:700px]:mt-12
          [min-height:800px]:max-w-[360px] [min-height:800px]:mt-16
          [min-height:900px]:max-w-[400px] [min-height:900px]:mt-20
          sm:[min-height:700px]:max-w-[360px]
          sm:[min-height:800px]:max-w-[400px]
          sm:[min-height:900px]:max-w-[440px]
          md:[min-height:700px]:max-w-[400px]
          md:[min-height:800px]:max-w-[440px]
          md:[min-height:900px]:max-w-[480px]">
          <div className="pb-[141.46%]" />
          <img 
            src={pic} 
            alt="Tharani M | MS Dharani" 
            className="absolute top-0 left-0 w-full h-full object-cover object-center select-none"
            draggable="false"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/3 z-10 px-4 md:px-0 hidden md:block">
        <div className="flex flex-col items-end">
          <h2 className="text-2xl font-semibold text-white mb-6">Other Profiles</h2>
          <div className="space-y-4">
            <a 
              href="https://youtube.com/c/@MSDharaniOfficial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="lg:ml-5 flex items-center gap-3 text-white hover:text-red-500 transition-colors group"
            >
              <span className="text-lg group-hover:underline">YouTube</span>
              <FaYoutube className="w-6 h-6 text-red-500" />
            </a>
            <a 
              href="https://www.music.msdharani.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="lg:ml-11 flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group"
            >
              <span className="text-lg group-hover:underline">Music</span>
              <TbWorld className="w-6 h-6 text-cyan-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Social Links */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-6 md:hidden z-20">
        <a 
          href="https://youtube.com/c/@MSDharaniOfficial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <FaYoutube className="w-6 h-6 text-red-500" />
        </a>
        <a 
          href="https://www.music.msdharani.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <TbWorld className="w-6 h-6 text-cyan-400" />
        </a>
      </div>
    </section>
  );
});

export default Home;