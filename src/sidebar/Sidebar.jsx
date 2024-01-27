
import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../CSS/SideBar.css';

const Sidebar = ({ isSidebarOpen, isSidebarHoverable, handleSidebarCollapse, handleSidebarExpand, menuItems, handleSublinkClick, selectedContent, isDarkMode }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? 'close' : ''} ${isSidebarHoverable ? 'hoverable' : ''}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 menu_content">
            <ul className="menu_items">
              {menuItems.map((course, courseIndex) => (
                course.modules.map((module, moduleIndex) => (
                  <li key={moduleIndex} className="item">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-${moduleIndex}`} className={isDarkMode ? 'tooltip-white-bg-dark-mode' : ''}>{module.title}</Tooltip>}
                    >
                      <a
                        href="#"
                        className={`nav_link submenu_item ${activeSubmenu === moduleIndex ? 'show_submenu' : ''}`}
                        onClick={() => toggleSubmenu(moduleIndex)}
                      >
                        <div className="navlink_content">
                          <span className="navlink_icon">
                            <i className={`bx ${module.icon}`}></i>
                          </span>
                          {module.title.length > 9 ? (
                            <span className="navlink">
                              {module.title.slice(0, 9) + '...'}
                            </span>
                          ) : (
                            <span className="navlink">{module.title}</span>
                          )}
                        </div>
                        <i className="bx bx-chevron-right arrow-left"></i>
                      </a>
                    </OverlayTrigger>

                    <ul className={`menu_items submenu ${activeSubmenu === moduleIndex ? 'show_submenu' : ''}`}>
                      {module.submenus.map((submenu, subIndex) => (
                        <li key={submenu.id}>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tooltip-submenu-${submenu.id}`} className={isDarkMode ? 'tooltip-white-bg-dark-mode' : ''}>{submenu.name}</Tooltip>}
                          >
                            <a
                              href="#"
                              className="nav_link sublink"
                              onClick={() => handleSublinkClick(submenu, course.courseId, course.courseName, module)}
                            >
                              <span className="navlink_icon">
                                <i className='bx bx-book-content'></i>
                              </span>
                              {submenu.name.length > 10 ? (
                                <span className="navlink">
                                  {submenu.name.slice(0, 8) + '...'}
                                </span>
                              ) : (
                                <span>{submenu.name}</span>
                              )}
                              {activeSubmenu === moduleIndex && selectedContent && (
                                <div className="progress-bar-container">
                                  <CircularProgressbar
                                    value={parseInt(localStorage.getItem(`contentId-${submenu.id}`)) || 0}
                                    text={`${Math.round(parseFloat(localStorage.getItem(`contentId-${submenu.id}`)) || 0)}%`}
                                    strokeWidth={10}
                                    styles={{
                                      root: { width: '30px', height: '30px', marginLeft: '30px' },
                                      stroke: `linear-gradient(-180deg, #1D95C9 0%, #17759C 100%)`,
                                      trail: { stroke: '#d6d6d6' },
                                      text: { fill: '#007bff', fontSize: '30px' }
                                    }}
                                  />
                                </div>
                              )}
                            </a>
                          </OverlayTrigger>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
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
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;


