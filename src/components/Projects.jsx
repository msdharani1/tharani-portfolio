import React, { useState, useEffect, forwardRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { ref as firebaseRef, onValue } from 'firebase/database';
import { database } from '../firebase';
import { useSwipeable } from 'react-swipeable';
import { getLanguageIcon } from '../utils/iconUtils';

const ProjectCard = ({ project, onViewDetails, isActive }) => (
  <div className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 ${isActive ? 'scale-105' : 'scale-100'}`}>
    {/* Image Container */}
    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
      <img 
        src={project.images[0]} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      
      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4 text-white" />
          </a>
        )}
      </div>

      {/* Project Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-cyan-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          Web App
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
        {project.title}
      </h3>
      
      <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed text-sm">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(project.languages).slice(0, 4).map(([lang, used]) => {
          if (!used) return null;
          const IconComponent = getLanguageIcon(lang);
          return (
            <div key={lang} className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg text-xs">
              {IconComponent && <IconComponent className="w-3 h-3 text-cyan-400" />}
              <span className="text-gray-300 capitalize">{lang.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>
          );
        })}
        {Object.values(project.languages).filter(Boolean).length > 4 && (
          <div className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300">
            +{Object.values(project.languages).filter(Boolean).length - 4} more
          </div>
        )}
      </div>

      {/* Action Button */}
      <button 
        onClick={onViewDetails}
        className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500 hover:to-blue-600 text-cyan-400 hover:text-white rounded-xl border border-cyan-500/30 hover:border-transparent transition-all duration-300 font-medium group-hover:shadow-lg group-hover:shadow-cyan-500/25"
      >
        View Details
      </button>
    </div>
  </div>
);

const ProjectModal = ({ project, onClose, currentImageIndex, setCurrentImageIndex }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-6 border-b border-white/10 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-gray-400">Detailed project overview</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Image Gallery */}
          <div className="relative mb-8">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-4">About This Project</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Technologies Sidebar */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
              <div className="space-y-3">
                {Object.entries(project.languages).map(([lang, used]) => {
                  if (!used) return null;
                  const IconComponent = getLanguageIcon(lang);
                  return (
                    <div key={lang} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      {IconComponent && <IconComponent className="w-5 h-5 text-cyan-400" />}
                      <span className="text-white capitalize font-medium">
                        {lang.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = forwardRef(({ scrollPosition }, ref) => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Fetch projects from Firebase
  useEffect(() => {
    const projectsRef = firebaseRef(database, 'projects');
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      const projectsList = data ? Object.entries(data).map(([id, project]) => ({ id, ...project })) : [];
      setProjects(projectsList);
    });
  }, []);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev + cardsPerView >= projects.length ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, projects.length - cardsPerView) : prev - 1
    );
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
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Auto-play functionality
  useEffect(() => {
    if (projects.length <= cardsPerView) return;
    
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [projects.length, cardsPerView, currentIndex]);

  const opacity = Math.max(0, Math.min((scrollPosition - window.innerHeight * 1.5) / 300, 1));

  const visibleProjects = projects.slice(currentIndex, currentIndex + cardsPerView);
  const totalSlides = Math.max(0, projects.length - cardsPerView + 1);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        opacity,
        transition: 'opacity 0.5s ease'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <Tag className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300 font-medium">Featured Work</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200 mb-6">
            My Projects
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my latest work showcasing modern web development, 
            creative design solutions, and cutting-edge technologies.
          </p>
        </div>

        {/* Projects Container */}
        {projects.length > 0 ? (
          <div className="relative">
            {/* Projects Grid */}
            <div 
              {...handlers}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.id}-${currentIndex}`}
                  project={project}
                  onViewDetails={() => openModal(project)}
                  isActive={index === Math.floor(cardsPerView / 2)}
                />
              ))}
            </div>

            {/* Navigation Controls */}
            {projects.length > cardsPerView && (
              <div className="flex items-center justify-center gap-6">
                {/* Previous Button */}
                <button 
                  onClick={goToPrev}
                  className="group p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-cyan-500 w-8' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button 
                  onClick={goToNext}
                  className="group p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </button>
              </div>
            )}

            {/* Project Counter */}
            <div className="text-center mt-8">
              <span className="text-sm text-gray-400">
                Showing {Math.min(currentIndex + cardsPerView, projects.length)} of {projects.length} projects
              </span>
            </div>
          </div>
        ) : (
          /* Loading State */
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-6">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Loading Projects</h3>
            <p className="text-gray-400">Please wait while we fetch the latest work...</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {modalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      )}
    </section>
  );
});

export default Projects;