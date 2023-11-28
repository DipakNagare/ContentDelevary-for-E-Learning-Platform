
import React, { useState, useEffect } from 'react';
import './CSS/SideNav.css'; // Update the path accordingly
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import MenuItems from './sidebar/MenuItems';
import ContentView from './sidebar/ContentView';


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarHoverable, setSidebarHoverable] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleSublinkClick = (submenu) => {
    // Handle the selected submenu item here
    setSelectedContent(submenu);
};

  const handleSidebarCollapse = () => {
    setSidebarOpen(true);
    setSidebarHoverable(true);
  };

  const handleSidebarExpand = () => {
    setSidebarOpen(false);
    setSidebarHoverable(false);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleMouseEnter = () => {
      if (isSidebarHoverable) {
        setSidebarOpen(false);
      }
    };

    const handleMouseLeave = () => {
      if (isSidebarHoverable) {
        setSidebarOpen(true);
      }
    };

    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isSidebarHoverable]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        handleSidebarToggle={handleSidebarToggle}
        handleDarkModeToggle={handleDarkModeToggle}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isSidebarHoverable={isSidebarHoverable}
        handleSidebarCollapse={handleSidebarCollapse}
        handleSidebarExpand={handleSidebarExpand}
        menuItems={MenuItems}
        handleSublinkClick={handleSublinkClick}

      />
      {/* Add other components/content here */}
      <ContentView selectedContent={selectedContent} />

    </div>
  );
}

export default App;