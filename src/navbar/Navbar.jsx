import React, { useEffect, useState } from 'react';
import '../CSS/NavBar.css';
import userimage from '../assets/user.jpeg'
import { Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';


const Navbar = ({ isSidebarOpen, handleSidebarToggle, handleDarkModeToggle, isDarkMode, setSelectedContent, menuItems }) => {

  const [currentSubMenuIndex, setCurrentSubMenuIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Assume mobile view for screens <= 768px width

  const handleNextSubMenu = () => {
    const currentSubMenu = menuItems[currentSectionIndex]?.submenus || [];
    if (currentSubMenuIndex < currentSubMenu.length - 1) {
      const nextContent = currentSubMenu[currentSubMenuIndex + 1];
      setSelectedContent(nextContent);
      setCurrentSubMenuIndex(currentSubMenuIndex + 1);
    }
  };

  const handlePreviousSubMenu = () => {
    if (currentSubMenuIndex > 0) {
      setCurrentSubMenuIndex(currentSubMenuIndex - 1);
      const previousContent = menuItems[currentSectionIndex]?.submenus[currentSubMenuIndex - 1];
      setSelectedContent(previousContent);
    }
  };

  const changeFontSize = (delta) => {
    const currentFontSize = parseInt(document.documentElement.style.fontSize) || 16;

    // Calculate the new font size
    const newFontSize = currentFontSize + delta;

    // Set a maximum font size limit
    const maxFontSize = 18; // Adjust this value as needed
    const minFontSize = 13;


    // Check if the new font size is within the specified limits
    if (newFontSize >= minFontSize && newFontSize <= maxFontSize) {
      // Set the new font size for the entire document
      document.documentElement.style.fontSize = `${newFontSize}px`;

      // Optionally, you can loop through all elements and set their font size individually
      // Uncomment the following lines if you want to set font size for all elements
      // const allElements = document.getElementsByTagName('*');
      // for (let i = 0; i < allElements.length; i++) {
      //   allElements[i].style.fontSize = `${newFontSize}px`;
      // }
    };
  }
  // Inside Navbar component
  const handleZoomIn = () => {
    changeFontSize(1); // Increase font size by 1px
  };

  const handleZoomOut = () => {
    changeFontSize(-1); // Decrease font size by 1px
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
        {isMobileView ? <span>Content Dilevery</span> : <span>Content Dilevery</span>}
      </div>

      {isMobileView && (
        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} onClick={handleDarkModeToggle}></i>
          <img src={userimage} alt="" className="profile" />
        </div>
      )}

      {!isMobileView && (
        <div className="row d-flex justify-content-center">
          <div className="col-6 col-md-3 ">
            <Button
              onClick={handlePreviousSubMenu}
              size="sm"
              block
              className="custom-button"
            >
              <i class='bx bxs-left-arrow-circle' ></i>
            </Button>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <Button
              onClick={handleNextSubMenu}
              disabled={currentSubMenuIndex === menuItems[currentSectionIndex]?.submenus.length - 1}
              size="sm"
              block
              className="custom-button"
              style={{ marginLeft: '10px' }}
            >
            <i class='bx bxs-right-arrow-circle'></i>
            </Button>
          </div>
        </div>
      )}

      {isMobileView && (
        <div className="row d-flex justify-content-center mt-3">
          <div className="col-6 col-md-3 ">
            <Button
              onClick={handlePreviousSubMenu}
              size="sm"
              block
              className="custom-button"
              style={{ marginLeft: '100px' }}
            >
              <i class='bx bxs-left-arrow-circle' ></i>
            </Button>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <Button
              onClick={handleNextSubMenu}
              disabled={currentSubMenuIndex === menuItems[currentSectionIndex]?.submenus.length - 1}
              size="sm"
              block
              className="custom-button"
              style={{ marginLeft: '50px' }}
            >
              <i class='bx bxs-right-arrow-circle'></i>
            </Button>
          </div>
        </div>
      )}

      {!isMobileView && (
        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <div className="zoom-buttons-container">
            <a className="btn zoom" onClick={handleZoomIn}>
              <i className="fas fa-search-plus"></i>
            </a>
            <a className="btn zoom-out" onClick={handleZoomOut}>
              <i className="fas fa-search-minus"></i>
            </a>
            <a className="btn zoom-init" onClick={handleZoomInit}>
              <i className="fas fa-recycle"></i>
            </a>
          </div>
          <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} onClick={handleDarkModeToggle}></i>
          <img src={userimage} alt="" className="profile" />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
