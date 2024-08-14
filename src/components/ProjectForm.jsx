// In ProjectForm.jsx
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

  return (
    <div className="project-form-overlay">
      <div className="project-form">
        <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            required
          ></textarea>
          <div className="image-inputs">
            {images.map((image, index) => (
              <div key={index} className="image-input">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Image URL"
                />
                {image && <img src={image} alt={`Preview ${index + 1}`} className="image-preview" />}
              </div>
            ))}
            <button type="button" onClick={handleAddImage}>Add Image</button>
          </div>
          <div className="languages-checkboxes">
            {Object.entries(languages).map(([key, value]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setLanguages({ ...languages, [key]: e.target.checked })}
                />
                {key}
              </label>
            ))}
          </div>
          <input
            type="url"
            value={demoLink}
            onChange={(e) => setDemoLink(e.target.value)}
            placeholder="Demo Link"
          />
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? <div className="spinner"></div> : (project ? 'Update' : 'Add')}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;