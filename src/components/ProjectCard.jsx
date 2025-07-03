import React from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { getLanguageIcon } from '../utils/iconUtils';

const ProjectCard = ({ project, onViewDetails, className = "" }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 ${className}`}>
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

        {/* Date Badge */}
        {project.timestamp && (
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
              <Calendar className="w-3 h-3" />
              {formatDate(project.timestamp)}
            </div>
          </div>
        )}
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
};

export default ProjectCard;