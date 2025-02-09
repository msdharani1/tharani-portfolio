import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { getLanguageIcon } from '../utils/iconUtils';

const ProjectModal = ({ project, onClose, currentImageIndex }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-slate-900/90 backdrop-blur-md rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FaTimes className="text-white text-xl" />
          </button>
        </div>

        {/* Updated image container with 16:9 ratio */}
        <div className="relative w-full mb-6 rounded-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(project.languages).map(([lang, used]) =>
            used && (
              <span key={lang} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white">
                {getLanguageIcon(lang)}
                <span className="capitalize">{lang}</span>
              </span>
            )
          )}
        </div>

        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-colors duration-300"
        >
          View Demo
        </a>
      </div>
    </div>
  </div>
);

export default ProjectModal;