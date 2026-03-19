
import { useState, useEffect } from "react";
import './Projects.css'
import '../modal.css'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("ProjectsPage:", err));
  }, []);
  
  return (
    <div className='projects-page'>
      {projects.map(p => (
        <ProjectsCard
          key={p.id}
          lbl={p.title}
          desc={p.description}
          img={p.imageUrl}
          mod={p.lastModified}
        />
      ))}

      <button
        className="add-project-button"
        onClick={() => setIsModelOpen(true)}
      >
        <i className="bi bi-plus-circle"></i>
      </button>

      {isModelOpen &&
        <AddProjectModal
          onClose={() => setIsModelOpen(false)}
        />
      }
    </div>
  );
}

function ProjectsCard({img, lbl, desc, mod}) {
  return (
    <div className='projects-card'>
      <div className='projects-card-img-container'>
        {img && <img src={img} className='projects-card-img' />}
      </div>
      <h3>{lbl}</h3>
      <p>{desc}</p>
      <span>{mod}</span>
    </div>
  );
}

function AddProjectModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setImage("");
  }

  const handleClose = () => {
    handleReset();
    onClose();
  };
  
  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Add Project</h2>
        <form>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={handleReset}>Reset</button>
            <button type="button" onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
