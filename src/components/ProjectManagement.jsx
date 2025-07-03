import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, LogOut, Filter, Grid, Calendar } from 'lucide-react';
import ProjectForm from './ProjectForm';
import ProjectCardForAdmin from './ProjectCardForAdmin';

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Project Management</h1>
                <p className="text-gray-400">Manage your portfolio projects</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="new" className="bg-slate-800">Newest First</option>
                <option value="old" className="bg-slate-800">Oldest First</option>
              </select>
            </div>

            {/* Add Project Button */}
            <button 
              onClick={handleAddProject}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCardForAdmin
              key={project.id}
              project={project}
              onEdit={() => handleEditProject(project)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
              <Grid className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first project'}
            </p>
            {!searchTerm && (
              <button 
                onClick={handleAddProject}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Your First Project
              </button>
            )}
          </div>
        )}

        {/* Project Form Modal */}
        {showForm && (
          <ProjectForm
            project={editProject}
            onClose={() => setShowForm(false)}
            onSubmit={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default ProjectManagement;