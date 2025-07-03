import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { getLanguageIcon } from '../utils/iconUtils';

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-slate-900/95 backdrop-blur-md rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
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
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
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

export default ProjectModal;