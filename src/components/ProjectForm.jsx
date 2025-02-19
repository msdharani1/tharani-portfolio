import { ref, push, update } from 'firebase/database';
import { database } from '../firebase';
import { useState, useEffect } from 'react';

function ProjectForm({ project, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
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
      setImages(project.images || []);
      setLanguages(project.languages || {});
      setDemoLink(project.demoLink || '');
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const projectData = {
      title,
      description,
      images,
      languages,
      demoLink,
      timestamp: Date.now(),
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

  // Handle click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-[#000000a1] z-50 flex items-center justify-center overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="relative min-h-screen md:min-h-0 flex items-center justify-center w-full p-4">
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Form Content */}
          <div className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">
              {project ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project Title"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project Description"
                required
                className="w-full px-4 py-2 border rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              
              <div className="space-y-4">
                {images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Image URL"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {image && (
                      <img 
                        src={image} 
                        alt={`Preview ${index + 1}`} 
                        className="max-h-40 object-contain rounded"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  Add Image
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(languages).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setLanguages({ ...languages, [key]: e.target.checked })}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <span className="capitalize">{key}</span>
                  </label>
                ))}
              </div>
              
              <input
                type="url"
                value={demoLink}
                onChange={(e) => setDemoLink(e.target.value)}
                placeholder="Demo Link"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    project ? 'Update' : 'Add'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;