import React, { useEffect, useState } from 'react';
import '../CSS/NavBar.css';
import userimage from '../assets/user.jpeg'
import { Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import Swal from 'sweetalert2';


const Navbar = ({ isSidebarOpen, handleSidebarToggle, handleDarkModeToggle, isDarkMode, selectedContent, setSelectedContent, menuItems, handleSublinkClick }) => {

  const [currentSubMenuIndex, setCurrentSubMenuIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Assume mobile view for screens <= 768px width
  const handleNextSubMenu = () => {
    const currentModule = menuItems[currentSectionIndex]?.modules[currentSubMenuIndex];
    const currentSubMenu = currentModule?.submenus || [];
    const currentSubMenuId = selectedContent?.submenus?.id;

    const currentIndex = currentSubMenu.findIndex(item => item.id === currentSubMenuId);

    // Check if there's a next submenu in the current module
    if (currentIndex !== -1 && currentIndex < currentSubMenu.length - 1) {
      const nextContent = currentSubMenu[currentIndex + 1];
      const previousContentId = nextContent.id - 1;
      const storedProgress = localStorage.getItem(`contentId-${previousContentId}`);
      const isPreviousContentCompleted = storedProgress && parseFloat(storedProgress) > 99;

      if (isPreviousContentCompleted || previousContentId === 0) {
        setSelectedContent(prevState => {
          const newState = {
            ...prevState,
            submenus: nextContent
          };
          localStorage.setItem('selectedContent', JSON.stringify(newState)); // Save to local storage
          return newState;
        });
      } else {
        Swal.fire({
          title: 'Incomplete Content',
          text: `Complete the previous content before proceeding to the next menu.`,
          icon: 'warning',
        });
      }
    } else {
      // Check if there's a next module
      const nextModuleIndex = currentSubMenuIndex + 1;
      const nextModule = menuItems[currentSectionIndex]?.modules[nextModuleIndex];

      if (nextModule) {
        const nextContent = nextModule.submenus[0];
        setSelectedContent(prevState => {
          const newState = {
            ...prevState,
            submenus: nextContent
          };
          localStorage.setItem('selectedContent', JSON.stringify(newState)); // Save to local storage
          return newState;
        });
        setCurrentSubMenuIndex(nextModuleIndex); // Update current module index
      } else {
        Swal.fire({
          title: 'End of Content',
          text: 'You have reached the end of all modules.',
          icon: 'info',
        });
      }
    }
  };


  const handlePreviousSubMenu = () => {
    const currentModule = menuItems[currentSectionIndex]?.modules[currentSubMenuIndex];
    const currentSubMenu = currentModule?.submenus || [];
    const currentSubMenuId = selectedContent?.submenus?.id;

    const currentIndex = currentSubMenu.findIndex(item => item.id === currentSubMenuId);

    // Check if there's a previous submenu in the current module
    if (currentIndex > 0) {
      const prevContent = currentSubMenu[currentIndex - 1];
      setSelectedContent(prevState => {
        const newState = {
          ...prevState,
          submenus: prevContent
        };
        localStorage.setItem('selectedContent', JSON.stringify(newState)); // Save to local storage
        return newState;
      });
    } else {
      // Check if there's a previous module
      const prevModuleIndex = currentSubMenuIndex - 1;
      const prevModule = menuItems[currentSectionIndex]?.modules[prevModuleIndex];

      if (prevModule) {
        const prevContent = prevModule.submenus[prevModule.submenus.length - 1]; // Last submenu of the previous module
        setSelectedContent(prevState => {
          const newState = {
            ...prevState,
            submenus: prevContent
          };
          localStorage.setItem('selectedContent', JSON.stringify(newState)); // Save to local storage
          return newState;
        });
        setCurrentSubMenuIndex(prevModuleIndex); // Update current module index
      } else {
        Swal.fire({
          title: 'Beginning of Content',
          text: 'You are at the beginning of the content.',
          icon: 'info',
        });
      }
    }
  };

  const changeFontSize = (delta) => {
    const currentFontSize = parseInt(document.documentElement.style.fontSize) || 16;

    // Calculate the new font size
    const newFontSize = currentFontSize + delta;

    // Set a maximum font size limit
    const maxFontSize = 18; // Adjust this value as needed
    const minFontSize = 13;


    if (newFontSize >= minFontSize && newFontSize <= maxFontSize) {
      document.documentElement.style.fontSize = `${newFontSize}px`;
    };
  }
  const handleZoomIn = () => {
    changeFontSize(1);
  };

  const handleZoomOut = () => {
    changeFontSize(-1);
  };

  const handleZoomInit = () => {
    document.documentElement.style.fontSize = '16px'; // Reset font size to default
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <nav className="navbar">
      <div className="logo_item">
        <i className={`bx bx-menu ${isSidebarOpen ? 'open' : ''}`} onClick={handleSidebarToggle}></i>
        {isMobileView ? <span>Course_Name</span> : <span>Course_Name</span>}
      </div>

      {isMobileView && (
        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} onClick={handleDarkModeToggle}></i>
          <img src={userimage} alt="" className="profile" />
        </div>
      )}

      {!isMobileView && (
        <div className="navbar_buttons">
          <div className="d-flex justify-content-center">
            <button type="button"
              className="btn btn-danger "
              style={{ marginRight: '10px' }}
              onClick={handlePreviousSubMenu}
            >
              <i className="fas fa-caret-left fa-lg" style={{ width: '50px' }}></i>
            </button>
            <button type="button"
              className="btn btn-success"
              onClick={handleNextSubMenu}
              disabled={currentSubMenuIndex >= menuItems[currentSectionIndex]?.modules[currentSubMenuIndex]?.submenus.length - 1}
            >
              <i className="fas fa-caret-right fa-lg" style={{ width: '50px' }}></i>
            </button>
          </div>
        </div>
      )}


      {isMobileView && (
        <div className="row d-flex justify-content-center mt-3">
          <div className="col-6 col-md-3 ">
            <div className="d-flex justify-content-center " style={{ marginTop: '-9px', marginBottom: '0.4rem' }}>
              <button type="button"
                className="btn btn-danger "
                style={{ marginRight: '10px', marginLeft: '6em', }}
                onClick={handlePreviousSubMenu}
              // disabled={currentSubMenuIndex === 0}
              >
                <i className="fas fa-caret-left fa-lg" style={{ width: '50px' }}></i>
              </button>
              <button type="button"
                className="btn btn-success"
                onClick={handleNextSubMenu}
                disabled={currentSubMenuIndex >= menuItems[currentSectionIndex]?.modules[currentSubMenuIndex]?.submenus.length - 1}
              >
                <i className="fas fa-caret-right fa-lg" style={{ width: '50px' }}></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMobileView && (
        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <div className="zoom-buttons-container">
            <a className="btn zoom" onClick={handleZoomIn}>
              <i>A<sup>+</sup></i>
            </a>
            <a className="btn-zoom-init" onClick={handleZoomInit}>
              <i>A</i>
            </a>
            <a className="btn zoom-out" onClick={handleZoomOut}>
              <i>A<sup>-</sup></i>
            </a>
          </div>
          <div className="navbar_content">
            <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} onClick={handleDarkModeToggle}></i>
            <img src={userimage} alt="" className="profile" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
