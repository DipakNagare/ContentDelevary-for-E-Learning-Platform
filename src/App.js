
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
  const [isPreviousContentCompleted, setPreviousContentCompleted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  


  const markContentCompleted = () => {
    setPreviousContentCompleted(true);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleSublinkClick = (submenu) => {
    // Handle the selected submenu item here
    setSelectedContent(submenu);

    // valueProgress = parseInt(localStorage.getItem(`contentId-${submenu.id}`)) || 0 ;

    // Save selectedContent to local storage
    localStorage.setItem('selectedContent', JSON.stringify(submenu));


    if (submenu.type === 'pdf') {
      // Initiate the download
      const link = document.createElement('a');
      link.href = submenu.src;
      link.download = 'downloaded_file.pdf';
      link.click();

      // Open in a new tab/window after a short delay (adjust the delay as needed)
      setTimeout(() => {
        window.open(submenu.src, '_blank');
      }, 1000);
    } else {
      // Handle other types (image, video) as needed
      console.log('Clicked on:', submenu.type, submenu.src);
    }
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
    const newDarkModeState = !isDarkMode;
    setDarkMode(newDarkModeState);
  
    // Save dark mode preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(newDarkModeState));
  
    // Toggle dark mode class on the body element
    document.body.classList.toggle('dark', newDarkModeState);
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
    const storedDarkMode = localStorage.getItem('darkMode');

    // Check if storedDarkMode is not null or undefined
    if (storedDarkMode !== null && storedDarkMode !== undefined) {
      // Parse the storedDarkMode value and set the dark mode state
      setDarkMode(JSON.parse(storedDarkMode));
  
      // Toggle dark mode class on the body element
      document.body.classList.toggle('dark', JSON.parse(storedDarkMode));
    }
    if (window.innerWidth < 768) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
    // Load initial selectedContent from local storage
    const storedContent = JSON.parse(localStorage.getItem('selectedContent'));
    setSelectedContent(storedContent);
  }, []);

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        handleSidebarToggle={handleSidebarToggle}
        handleDarkModeToggle={handleDarkModeToggle}
        setSelectedContent={setSelectedContent}
        menuItems={MenuItems}

      />
     <div className={`wrapper ${!isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isSidebarHoverable={isSidebarHoverable}
        handleSidebarCollapse={handleSidebarCollapse}
        handleSidebarExpand={handleSidebarExpand}
        menuItems={MenuItems}
        handleSublinkClick={handleSublinkClick}
        loadingProgress={loadingProgress}
        selectedContent={selectedContent}  // Pass selectedContent as a prop
        setLoadingProgress={setLoadingProgress}

      />
      {/* Add other components/content here */}
      <ContentView
        selectedContent={selectedContent}
        setSelectedContent={setSelectedContent}
        isPreviousContentCompleted={isPreviousContentCompleted}
        markContentCompleted={markContentCompleted}
        MenuItems={MenuItems}
        loadingProgress={loadingProgress}  // Pass loadingProgress as a prop
        setLoadingProgress={setLoadingProgress}

      />
      </div>

    </div>
  );
}

export default App;
