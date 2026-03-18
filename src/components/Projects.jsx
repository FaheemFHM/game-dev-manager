
import { useState, useEffect } from "react";
import './Projects.css'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  
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
