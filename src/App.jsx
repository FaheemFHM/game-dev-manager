import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute(
      "data-theme",
      newMode ? "light" : "dark"
    );
  }

  return (
    <div className='app'>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <ProjectsPage />
    </div>
  );
}

function Navbar({darkMode, toggleTheme}) {
  return (
    <div className='navbar'>
      <NavbarButton
        icon={"bi-folder"}
        iconAlt={"bi-folder-fill"}
        label={"Projects"}
      />
      <NavbarButton
        icon={"bi-house"}
        iconAlt={"bi-house-fill"}
        label={"Dashboard"}
      />
      <NavbarButton
        icon={"bi-kanban"}
        iconAlt={"bi-kanban-fill"}
        label={"Kanban"}
      />
      <NavbarButton
        icon={"bi-clipboard2-pulse"}
        iconAlt={"bi-clipboard2-pulse-fill"}
        label={"Progress"}
      />
      <NavbarButton
        icon={"bi-journal-bookmark"}
        iconAlt={"bi-journal-bookmark-fill"}
        label={"Diary"}
      />
      <NavbarButton
        icon={"bi-sticky"}
        iconAlt={"bi-sticky-fill"}
        label={"Notes"}
      />

      <VerticalSpacer />

      <ThemeButton darkMode={darkMode} toggleTheme={toggleTheme} />

      <NavbarButton
        icon={"bi-gear"}
        iconAlt={"bi-gear-fill"}
        label={"Settings"}
      />
    </div>
  );
}

function NavbarButton({icon, iconAlt, label}) {
  const [hovered, setHovered] = useState(false);
  const iconClass = `bi ${hovered ? iconAlt : icon}`;

  return (
    <button
      className='navbar-button'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <i className={iconClass}></i>
      <span>{label}</span>
    </button>
  );
}

function ThemeButton({ darkMode, toggleTheme }) {
  const [hovered, setHovered] = useState(false);
  let iconClass = "bi bi-";
  if (hovered) iconClass += darkMode ? "moon-fill" : "sun-fill";
  else iconClass += darkMode ? "moon" : "sun";

  return (
    <button
      className='navbar-button'
      onClick={toggleTheme}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <i className={iconClass}></i>
      <span>Theme</span>
    </button>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
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

function VerticalSpacer() {
  return <div className='vertical-spacer'></div>
}
