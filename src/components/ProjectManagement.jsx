// components/ProjectManagement.jsx
import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ProjectCard from './ProjectCard';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [filter, setFilter] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects from Firebase
    const projectsRef = ref(database, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const projectsData = snapshot.val();
      const projectsList = projectsData 
        ? Object.entries(projectsData).map(([key, value]) => ({ id: key, ...value })) 
        : [];
      setProjects(projectsList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddProject = () => {
    setEditProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await remove(ref(database, `projects/${projectId}`));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/msd-admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const filteredProjects = projects
    .filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => filter === 'new' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp);

  return (
    <div className="project-management">
      <div className="project-management-header">
        <h2>Project Management</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects"
        />
        <button onClick={handleAddProject}>Add Project</button>
      </div>
      {showForm && (
        <ProjectForm
          project={editProject}
          onClose={() => setShowForm(false)}
          onSubmit={() => setShowForm(false)}
        />
      )}
      <div className="project-list">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => handleEditProject(project)}
            onDelete={() => handleDeleteProject(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectManagement;