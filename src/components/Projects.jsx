import React, { useState, useEffect, forwardRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ref as firebaseRef, onValue } from 'firebase/database';
import { database } from '../firebase';
import { useSwipeable } from 'react-swipeable';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = forwardRef(({ scrollPosition }, ref) => {
  const [projects, setProjects] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Fetch projects from Firebase
  useEffect(() => {
    const projectsRef = firebaseRef(database, 'projects');
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      const projectsList = data ? Object.entries(data).map(([id, project]) => ({ id, ...project })) : [];
      setProjects(projectsList);
    });
  }, []);

  // Handle responsive card display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Image slideshow in modal
  useEffect(() => {
    let interval;
    if (modalOpen && selectedProject && selectedProject.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [modalOpen, selectedProject]);

  // Navigation handlers
  const handleScrollLeft = () => {
    setCardIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };
  
  const handleScrollRight = () => {
    const maxIndex = Math.max(0, projects.length - visibleCards);
    setCardIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  // Modal handlers
  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleScrollRight(),
    onSwipedRight: () => handleScrollLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const opacity = Math.max(0, Math.min((scrollPosition - window.innerHeight * 1.5) / 300, 1));
  const translateY = Math.max(0, 100 - scrollPosition / 5);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center py-20 px-4 md:px-8 overflow-hidden"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.5s ease, transform 0.5s ease'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-12 text-center relative z-10">
        Featured Projects
      </h1>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Projects Container */}
        <div className="overflow-hidden">
          <div 
            {...handlers}
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${cardIndex * (100 / visibleCards)}%)`,
              width: `${(projects.length / visibleCards) * 100}%`
            }}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={() => openModal(project)}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {projects.length > visibleCards && (
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={handleScrollLeft}
              disabled={cardIndex === 0}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/10 hover:border-cyan-500/50"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={handleScrollRight}
              disabled={cardIndex >= projects.length - visibleCards}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/10 hover:border-cyan-500/50"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {projects.length > visibleCards && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(projects.length / visibleCards) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(cardIndex / visibleCards) === index 
                    ? 'bg-cyan-500' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          currentImageIndex={currentImageIndex}
        />
      )}
    </section>
  );
});

export default Projects;