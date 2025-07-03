// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './components/Admin';
import ProjectManagement from './components/ProjectManagement';
import ProtectedRoute from './components/ProtectedRoute';

function MainContent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      const windowHeight = window.innerHeight;
      let newSection;
      let newPath;

      if (position < windowHeight * 0.5) {
        newSection = 'home';
        newPath = '/';
      } else if (position < windowHeight * 1.5) {
        newSection = 'about';
        newPath = '/about';
      } else if (position < windowHeight * 2.5) {
        newSection = 'projects';
        newPath = '/projects';
      } else {
        newSection = 'contact';
        newPath = '/contact';
      }

      setCurrentSection(newSection);
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: true });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate, location.pathname]);

  useEffect(() => {
    const scrollToSection = (multiplier) => {
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: windowHeight * multiplier,
        behavior: 'smooth'
      });
    };

    // This timeout ensures that the scroll happens after the route change
    setTimeout(() => {
      switch (location.pathname) {
        case '/':
          scrollToSection(0);
          break;
        case '/about':
          scrollToSection(1);
          break;
        case '/projects':
          scrollToSection(2);
          break;
        case '/contact':
          scrollToSection(3);
          break;
        default:
          scrollToSection(0);
      }
    }, 100);
  }, [location.pathname]);

  return (
    <>
      <Home scrollPosition={scrollPosition} ref={homeRef} />
      <About scrollPosition={scrollPosition} ref={aboutRef} />
      <Projects scrollPosition={scrollPosition} ref={projectsRef} />
      <Contact scrollPosition={scrollPosition} ref={contactRef} />
      <div className="current-section">{currentSection}</div>
    </>
  );
}

function App() {
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
            <Route path="/" element={<MainContent />} />
            <Route path="/about" element={<MainContent />} />
            <Route path="/projects" element={<MainContent />} />
            <Route path="/contact" element={<MainContent />} />
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