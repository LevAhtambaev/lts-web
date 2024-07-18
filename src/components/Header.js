// src/components/Header.js
import React from 'react';
import menuIcon from '../assets/images/menu.png';
import profileIcon from '../assets/images/profile.png';
import './Header.css'; // Если у вас есть CSS для этого компонента

const Header = () => {
    return (
        <header className="header">
            <div className="menu-icon">
                <img src={menuIcon} alt="Menu Icon" />
            </div>
            <h1>LEO'S TRAVEL STORIES</h1>
            <div className="profile-icon">
                <img src={profileIcon} alt="Profile Icon" />
            </div>
        </header>
    );
};

export default Header;
