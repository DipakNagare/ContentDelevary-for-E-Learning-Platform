import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../CSS/SideBar.css';

const Sidebar = ({ isSidebarOpen, isSidebarHoverable, handleSidebarCollapse, handleSidebarExpand, menuItems, handleSublinkClick, loadingProgress,selectedContent,setLoadingProgress }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  // let valueProgress = 30;
  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? 'close' : ''} ${isSidebarHoverable ? 'hoverable' : ''}`}>
      <div className="menu_content">
        <ul className="menu_items">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="item">
              <a
                href="#"
                className={`nav_link submenu_item ${activeSubmenu === index ? 'show_submenu' : ''}`}
                onClick={() => toggleSubmenu(index)}
              >
                <span className="navlink_icon">
                  <i className={`bx ${menuItem.icon}`}></i>
                </span>
                <span className="navlink">{menuItem.title}</span>
                <i className="bx bx-chevron-right arrow-left"></i>
              </a>

              <ul className={`menu_items submenu ${activeSubmenu === index ? 'show_submenu' : ''}`}>
                {menuItem.submenus.map((submenu, subIndex) => (
                  <li key={submenu.id}>
                    <a
                      href="#"
                      className="nav_link sublink"
                      onClick={() => handleSublinkClick(submenu)}
                    >
                      {submenu.name}
                      {activeSubmenu === index && selectedContent &&  (
                        <div className="progress-bar-container">
                          {/* Circular Progress Bar */}
                         {/* {valueProgress = parseInt(localStorage.getItem(`contentId-${submenu.id}`)) || 0 }; */}
                          <CircularProgressbar
                            value={parseInt(localStorage.getItem(`contentId-${submenu.id}`)) || 0}
                            text={`${Math.round(parseFloat(localStorage.getItem(`contentId-${submenu.id}`)) || 0)}%`}
                            strokeWidth={10}
                            styles={{
                              root: { width: '30px', height: '30px', marginLeft: '30px' },
                              path: { stroke: '#007bff' },
                              trail: { stroke: '#d6d6d6' },
                              text: { fill: '#007bff', fontSize: '30px' }
                            }}
                          />
                        </div>
                      )}
                    </a>

                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Sidebar Open / Close */}
        <div className="bottom_content">
          <div className="bottom expand_sidebar" onClick={handleSidebarExpand}>
            <span> Expand</span>
            <i className='bx bx-log-in'></i>
          </div>
          <div className="bottom collapse_sidebar" onClick={handleSidebarCollapse}>
            <span> Collapse</span>
            <i className='bx bx-log-out'></i>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;