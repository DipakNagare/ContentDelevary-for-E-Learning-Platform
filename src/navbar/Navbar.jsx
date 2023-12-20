import React, { useState } from 'react';
import '../CSS/NavBar.css';
import userimage from '../assets/user.jpeg'
import { Button } from 'react-bootstrap';

const Navbar = ({ isSidebarOpen, handleSidebarToggle, handleDarkModeToggle, isDarkMode, setSelectedContent, menuItems }) => {

  const [currentSubMenuIndex, setCurrentSubMenuIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

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

  //   const handleNextSection = () => {
  //     if (currentSectionIndex < menuItems.length - 1) {
  //         setCurrentSectionIndex(currentSectionIndex + 1);
  //         setCurrentSubMenuIndex(0);
  //         const nextContent = menuItems[currentSectionIndex + 1]?.submenus[0];
  //         setSelectedContent(nextContent);
  //     }
  // };

  // const handlePreviousSection = () => {
  //     if (currentSectionIndex > 0) {
  //         setCurrentSectionIndex(currentSectionIndex - 1);
  //         setCurrentSubMenuIndex(0);
  //         const previousContent = menuItems[currentSectionIndex - 1]?.submenus[0];
  //         setSelectedContent(previousContent);
  //     }
  // };

  return (
    <nav className="navbar">
      <div className="logo_item">
        <i className={`bx bx-menu ${isSidebarOpen ? 'open' : ''}`} onClick={handleSidebarToggle}></i>
        {/* <img src="images/logo.png" alt=""></img> */}CD</div>

      {/* <div className="search_bar">
        <input type="text" placeholder="Search" />
      </div> */}
      <div className="row d-flex justify-content-center">
        {/* <div className="col-3">
                            <Button
                                onClick={handlePreviousSection}
                                disabled={currentSectionIndex === 0}
                            >
                                PS
                            </Button>
                        </div> */}
        <div className="col-6 col-md-3 ">
          <Button
            onClick={handlePreviousSubMenu}
            // disabled={currentSubMenuIndex === 0}
            size="sm"
            block
            className="custom-button" // Use Bootstrap margin classes


          >
            Prev
          </Button>
        </div>
        <div className="col-6 col-md-3 mb-2">
          <Button
            onClick={handleNextSubMenu}
            disabled={currentSubMenuIndex === menuItems[currentSectionIndex]?.submenus.length - 1}
            size="sm"
            block
            className="custom-button"
            style={{ marginLeft: '10px' }} // Additional margin for Windows mode
          >
            Next
          </Button>
        </div>
        {/* <div className="col-3 text-end">
                            <Button
                                onClick={handleNextSection}
                                disabled={currentSectionIndex === menuItems.length - 1}
                            >
                               NS
                            </Button>
                        </div> */}
      </div>


      <div className="navbar_content">
        <i className="bi bi-grid"></i>
        <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} onClick={handleDarkModeToggle}></i>
        {/* <i className='bx bx-bell'></i> */}
        <img src={userimage} alt="" className="profile" />
      </div>
    </nav>
  );
}

export default Navbar;
