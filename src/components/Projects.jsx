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
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll-based card index
  const maxIndex = Math.max(0, projects.length - visibleCards);
  useEffect(() => {
    const scrollPercentage = Math.max(0, Math.min((scrollPosition - window.innerHeight * 2) / window.innerHeight, 1));
    const newIndex = Math.floor(scrollPercentage * maxIndex);
    setCardIndex(newIndex);
  }, [scrollPosition, maxIndex]);

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

  return (
    <section 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center py-20 px-4 md:px-8 sticky top-0 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Added Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center relative z-10">
        Featured Projects
      </h1>

      <div className="relative w-full max-w-6xl mx-auto">
        <div 
          {...handlers}
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${cardIndex * 100 / visibleCards}%)` }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={() => openModal(project)}
            />
          ))}
        </div>

        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex gap-4">
          <button 
            onClick={handleScrollLeft}
            disabled={cardIndex === 0}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button 
            onClick={handleScrollRight}
            disabled={cardIndex === maxIndex}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>
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