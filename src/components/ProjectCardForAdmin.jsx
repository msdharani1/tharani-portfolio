import React from 'react';
import { Edit, Trash2, Calendar, Eye } from 'lucide-react';

function ProjectCardForAdmin({ project, onEdit, onDelete }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-lg group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.images[0]} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white line-clamp-2 flex-1">{project.title}</h3>
        </div>
        
        <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Date */}
        {project.timestamp && (
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(project.timestamp)}</span>
          </div>
        )}

        {/* Demo Link */}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mb-4 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Demo
          </a>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-white/10">
          <button 
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button 
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCardForAdmin;