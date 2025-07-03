import { ref, push, update } from 'firebase/database';
import { database } from '../firebase';
import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';

function ProjectForm({ project, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState(['']);
  const [languages, setLanguages] = useState({
    html: false,
    css: false,
    js: false,
    react: false,
    reactNative: false,
    bootstrap: false,
    tailwindCss: false,
    firebase: false,
    nextjs: false,
  });
  const [demoLink, setDemoLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setImages(project.images || ['']);
      setLanguages(project.languages || {});
      setDemoLink(project.demoLink || '');
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty images
    const filteredImages = images.filter(img => img.trim() !== '');

    const projectData = {
      title,
      description,
      images: filteredImages,
      languages,
      demoLink,
      timestamp: project ? project.timestamp : Date.now(),
    };

    try {
      if (project) {
        await update(ref(database, `projects/${project.id}`), projectData);
      } else {
        await push(ref(database, 'projects'), projectData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving project:', error);
    }

    setLoading(false);
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-2xl my-8">
        <div 
          className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white">
              {project ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter project title"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project"
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors resize-none"
                />
              </div>
              
              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Project Images
                  </label>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 hover:text-cyan-300 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
                <div className="space-y-4">
                  {images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="Enter image URL"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors"
                          />
                        </div>
                        {images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      {image && (
                        <div className="relative">
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-32 object-cover rounded-lg border border-white/10"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Technologies Used
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(languages).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setLanguages({ ...languages, [key]: e.target.checked })}
                        className="w-4 h-4 text-cyan-500 bg-transparent border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
                      />
                      <span className="text-white capitalize text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Demo Link */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Demo Link (Optional)
                </label>
                <input
                  type="url"
                  value={demoLink}
                  onChange={(e) => setDemoLink(e.target.value)}
                  placeholder="https://your-demo-link.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {project ? 'Update Project' : 'Add Project'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;