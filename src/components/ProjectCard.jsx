// components/ProjectCard.jsx
import React from 'react';

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="project-card">
      <img src={project.images[0]} alt={project.title} />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description.length > 100 ? `${project.description.substring(0, 100)}...` : project.description}</p>
      </div>
      <div className="project-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ProjectCard;