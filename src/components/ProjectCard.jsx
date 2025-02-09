import React from 'react';
import { getLanguageIcon } from '../utils/iconUtils';

const ProjectCard = ({ project, onViewDetails }) => (
  <div className="flex-none w-full md:w-[calc(33.333%-1rem)] bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-lg">
    <div className="relative h-48 overflow-hidden">
      <img 
        src={project.images[0]} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{project.title}</h3>
      <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(project.languages).map(([lang, used]) => {
          if (!used) return null;
          const IconComponent = getLanguageIcon(lang);
          return (
            <span key={lang} className="text-cyan-400 text-xl">
              {IconComponent && <IconComponent />}
            </span>
          );
        })}
      </div>
      <button 
        onClick={onViewDetails}
        className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-colors duration-300"
      >
        View Details
      </button>
    </div>
  </div>
);

export default ProjectCard;