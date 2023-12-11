import React, { useState } from 'react';
import '../CSS/SideBar.css';

const Sidebar = ({ isSidebarOpen, isSidebarHoverable, handleSidebarCollapse, handleSidebarExpand, menuItems,handleSublinkClick }) => {
    const [activeSubmenu, setActiveSubmenu] = useState(null);

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
                                {menuItem.submenus.map((submenu) => (
                                    <a
                                        key={submenu.id}
                                        href="#"
                                        className="nav_link sublink"
                                        onClick={() => handleSublinkClick(submenu)}
                                    >
                                        {submenu.name}
                                    </a>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>



                {/* Sidebar Open / Close */}
                <div className="bottom_content">
                    <div className="bottom expand_sidebar" onClick={handleSidebarExpand}>
                        <span> Expand</span>
                        <i className='bx bx-log-in' ></i>
                    </div>
                    <div className="bottom collapse_sidebar" onClick={handleSidebarCollapse}>
                        <span> Collapse</span>
                        <i className='bx bx-log-out'></i>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
