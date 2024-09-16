// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем Link и useNavigate из react-router-dom
import profileIcon from '../assets/images/profile.png';
import Menu from './Menu'; // Импортируем компонент меню
import './Header.css'; // Если у вас есть CSS для этого компонента

const Header = () => {
    const navigate = useNavigate(); // Используем хук useNavigate для навигации

    const handleClick = () => {
        navigate('/'); // Переходим на главную страницу при клике на заголовок
    };

    return (
        <header className="header">
            {/* Компонент Menu заменяет иконку меню */}
            <Menu />

            <h1>
                <span className="header-link" onClick={handleClick}> {/* Добавляем onClick для обработки клика */}
                    LTS
                </span>
            </h1>
            <div className="profile-icon">
                <img src={profileIcon} alt="Profile Icon" />
            </div>
        </header>
    );
};

export default Header;
