
import { useState, useEffect } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import ProjectsPage from './components/Projects'

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
