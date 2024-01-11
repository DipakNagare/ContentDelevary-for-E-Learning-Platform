
import React, { useState, useEffect } from 'react';
import './CSS/SideNav.css'; // Update the path accordingly
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import MenuItems from './sidebar/MenuItems';
import ContentView from './sidebar/ContentView';
import Swal from 'sweetalert2';


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarHoverable, setSidebarHoverable] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  // const [isPreviousContentCompleted, setPreviousContentCompleted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);



  const markContentCompleted = (contentType) => {
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleSublinkClick = (submenu) => {
    // Check if the previous content is completed
    const previousContentId = submenu.id - 1;
    const storedProgress = localStorage.getItem(`contentId-${previousContentId}`);
    const isPreviousContentCompleted = storedProgress && parseFloat(storedProgress) > 99;
    
    // If the previous content is completed, proceed to the selected submenu
    if (submenu.id === 1 || isPreviousContentCompleted) {
      setSelectedContent(submenu);
  
      // Save selectedContent to local storage
      localStorage.setItem('selectedContent', JSON.stringify(submenu));

    } else {
      // Display a SweetAlert modal when the previous content is not completed
      Swal.fire({
        title: 'Incomplete Content',
        text: `Complete the previous content ${submenu.name} 100% before proceeding to the next menu.`,
        icon: 'warning',
      });
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
      <div className={`wrapper ${!isSidebarOpen ? 'sidebar-open' : ''}`} style={{ padding: '15px' }}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isSidebarHoverable={isSidebarHoverable}
          handleSidebarCollapse={handleSidebarCollapse}
          handleSidebarExpand={handleSidebarExpand}
          menuItems={MenuItems}
          isDarkMode={isDarkMode}
          handleSublinkClick={handleSublinkClick}
          loadingProgress={loadingProgress}
          selectedContent={selectedContent}  
          setLoadingProgress={setLoadingProgress}

        />
        <ContentView
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          markContentCompleted={markContentCompleted}
          MenuItems={MenuItems}
          loadingProgress={loadingProgress}  
          setLoadingProgress={setLoadingProgress}

        />
      </div>

    </div>
  );
}

export default App;
