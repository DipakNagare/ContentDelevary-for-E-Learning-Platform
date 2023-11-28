import React from 'react';
import '../CSS/NavBar.css';
import userimage from '../assets/user.jpeg'

const Navbar = ({ isSidebarOpen, handleSidebarToggle, handleDarkModeToggle, isDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="logo_item">
        <i className={`bx bx-menu ${isSidebarOpen ? 'open' : ''}`} onClick={handleSidebarToggle}></i>
        {/* <img src="images/logo.png" alt=""></img> */}
        CD</div>

      {/* <div className="search_bar">
        <input type="text" placeholder="Search" />
      </div> */}

      <div className="navbar_content">
        <i className="bi bi-grid"></i>
        <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} onClick={handleDarkModeToggle}></i>
        <i className='bx bx-bell'></i>
        <img src={userimage} alt="" className="profile" />
      </div>
    </nav>
  );
}

export default Navbar;
