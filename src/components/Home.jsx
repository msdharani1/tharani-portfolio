import React, { forwardRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaYoutube, FaFileDownload } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { ref as dbRef, onValue } from 'firebase/database';
import { database } from '../firebase';
import pic from '../assets/pic.webp';
import pdf from "../assets/THARANI-M-cv.pdf";

const Home = forwardRef(({ scrollPosition }, ref) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [cvLink, setCvLink] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const circleSize = Math.min(300 + scrollPosition / 0.9, window.innerHeight * 2);

  // Fetch CV link from Firebase
  useEffect(() => {
    const cvLinkRef = dbRef(database, 'settings/cvLink');
    const unsubscribe = onValue(cvLinkRef, (snapshot) => {
      const data = snapshot.val();
      setCvLink(data || '');
    });

    return () => unsubscribe();
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      // Use Firebase CV link if available, otherwise use local PDF
      const downloadUrl = cvLink || pdf;
      
      // Check if it's a local file or external URL
      if (downloadUrl === pdf) {
        // Handle local PDF file
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "THARANI-M-cv.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Handle external PDF URL
        try {
          // Try to fetch and download as blob first (for CORS-enabled URLs)
          const response = await fetch(downloadUrl, { mode: 'cors' });
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "THARANI-M-cv.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } else {
            throw new Error('Fetch failed');
          }
        } catch (fetchError) {
          // If fetch fails (CORS issues), open in new tab
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.target = '_blank';
          link.download = "THARANI-M-cv.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: try to open the URL in a new tab
      try {
        const fallbackUrl = cvLink || pdf;
        window.open(fallbackUrl, '_blank');
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 3000);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        alert('Download failed. Please try again later.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const ThankYouMessage = () => (
    <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center gap-2 animate-fade-in-down z-50">
      <span>Thanks for downloading! </span>
      <span className="animate-bounce text-2xl">🎉</span>
    </div>
  );

  return (
    <section 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex justify-around items-center overflow-hidden px-4 md:px-8 sticky top-0"
    >
      {showThankYou && <ThankYouMessage />}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Mobile Content */}
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
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Downloading...
              </>
            ) : (
              <>
                <FaFileDownload className="w-5 h-5" />
                Download CV
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animated Circle */}
      <div
        className="absolute rounded-full transition-all duration-500 ease-out bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-3xl pointer-events-none"
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          boxShadow: '0 0 50px rgba(52, 152, 219, 0.3)'
        }}
      />

      {/* Desktop Content Container */}
      <div className="relative w-full h-full flex justify-between items-center z-20 mx-20">
        {/* Left Content */}
        <div className="w-full md:w-1/3 px-4 md:px-0 hidden md:block relative">
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
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="relative cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Downloading...
              </>
            ) : (
              <>
                <FaFileDownload className="w-5 h-5" />
                Download CV
              </>
            )}
          </button>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/3 px-4 md:px-0 hidden md:block relative">
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
      </div>

      {/* Profile Image */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full z-10 pointer-events-none">
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