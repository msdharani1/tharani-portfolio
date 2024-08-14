// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './components/Admin';
import ProjectManagement from './components/ProjectManagement';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './Admin.css';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      const windowHeight = window.innerHeight;
      if (position < windowHeight) {
        setCurrentSection('home');
      } else if (position < windowHeight * 2) {
        setCurrentSection('about');
      } else if (position < windowHeight * 3) {
        setCurrentSection('projects');
      } else {
        setCurrentSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            {/* Basic Meta Tags */}
            <title>Tharani - Web Developer, Music Creator, YouTuber</title>
            <meta name="description" content="Portfolio of Tharani (MS Dharani), a web developer, music creator, and YouTuber. Specializing in HTML, CSS, JS, Tailwind CSS, Bootstrap, React JS, React Native, and Firebase." />
            <meta name="keywords" content="web development, music creation, YouTube, HTML, CSS, JavaScript, Tailwind CSS, Bootstrap, React JS, React Native, Firebase" />
            <meta name="author" content="Tharani (MS Dharani)" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content="Tharani - Web Developer, Music Creator, YouTuber" />
            <meta property="og:description" content="Portfolio of Tharani (MS Dharani), showcasing web development projects and music creations." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://tharani-web-dev.vercel.app" />
            <meta property="og:image" content="https://tharani-web-dev.vercel.app/og-image.jpg" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Tharani - Web Developer, Music Creator, YouTuber" />
            <meta name="twitter:description" content="Portfolio of Tharani (MS Dharani), showcasing web development projects and music creations." />
            <meta name="twitter:image" content="https://tharani-web-dev.vercel.app/twitter-image.jpg" />

            {/* Other Advanced Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <link rel="canonical" href="https://tharani-web-dev.vercel.app" />

            {/* Music Website Link */}
            <link rel="alternate" href="https://www.artistmsdharani.com" title="MS Dharani Music" />
          </Helmet>

          <Routes>
            <Route path="/" element={
              <>
                <Home scrollPosition={scrollPosition} />
                <About scrollPosition={scrollPosition} />
                <Projects scrollPosition={scrollPosition} />
                <Contact scrollPosition={scrollPosition} />
                <div className="current-section">{currentSection}</div>
              </>
            } />
            <Route path="/msd-admin" element={<Admin />} />
            <Route 
              path="/addProjectInfo" 
              element={
                <ProtectedRoute>
                  <ProjectManagement />
                </ProtectedRoute>
              } 
            />
            {/* Redirect any unknown routes to the home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;