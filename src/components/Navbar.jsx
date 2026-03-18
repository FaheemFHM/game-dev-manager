
import { useState } from 'react'
import './Navbar.css'

export default function Navbar({darkMode, toggleTheme}) {
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
      
      <div style={{ flexGrow: 1 }}></div>
      
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
