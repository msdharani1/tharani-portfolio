// Projects.jsx
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaMobile, FaBootstrap, FaWind, FaFireAlt } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

function Projects({ scrollPosition }) {
  const [projects, setProjects] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const projectsRef = ref(database, 'projects');
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      const projectsList = data ? Object.entries(data).map(([id, project]) => ({ id, ...project })) : [];
      setProjects(projectsList);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCards);

  useEffect(() => {
    const scrollPercentage = Math.max(0, Math.min((scrollPosition - window.innerHeight * 2) / window.innerHeight, 1));
    const newIndex = Math.floor(scrollPercentage * maxIndex);
    setCardIndex(newIndex);
  }, [scrollPosition, maxIndex]);

  const handleScrollLeft = () => {
    setCardIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleScrollRight = () => {
    setCardIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    let interval;
    if (modalOpen && selectedProject && selectedProject.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [modalOpen, selectedProject]);

  const getLanguageIcon = (language) => {
    switch (language) {
      case 'html': return <FaHtml5 />;
      case 'css': return <FaCss3Alt />;
      case 'js': return <FaJs />;
      case 'react': return <FaReact />;
      case 'reactNative': return <FaMobile />;
      case 'bootstrap': return <FaBootstrap />;
      case 'tailwindCss': return <FaWind />;
      case 'firebase': return <FaFireAlt />;
      default: return null;
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleScrollRight(),
    onSwipedRight: () => handleScrollLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="projects">
      <div 
        {...handlers}
        className="project-container" 
        style={{ transform: `translateX(-${cardIndex * (100 / visibleCards)}%)` }}
      >
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.images[0]} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-languages">
              {Object.entries(project.languages).map(([lang, used]) => 
                used && <span key={lang} className="language-icon">{getLanguageIcon(lang)}</span>
              )}
            </div>
            <button className="view-details-btn" onClick={() => openModal(project)}>View Details</button>
          </div>
        ))}
      </div>
      <div className="project-navigation">
        <button className="arrow-btn" onClick={handleScrollLeft} disabled={cardIndex === 0}>
          <FaChevronLeft />
        </button>
        <button className="arrow-btn" onClick={handleScrollRight} disabled={cardIndex === maxIndex}>
          <FaChevronRight />
        </button>
      </div>
      {modalOpen && selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <button className="close-btn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modal-image-container">
              <img src={selectedProject.images[currentImageIndex]} alt={selectedProject.title} />
            </div>
            <p>{selectedProject.description}</p>
            <div className="project-languages">
              {Object.entries(selectedProject.languages).map(([lang, used]) => 
                used && (
                  <span key={lang} className="language-button">
                    {getLanguageIcon(lang)}
                    {lang}
                  </span>
                )
              )}
            </div>
            <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="demo-link">
              View Demo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;