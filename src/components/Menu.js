import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import menuIcon from '../assets/images/menu.png'; // Иконка гамбургер
import crossIcon from '../assets/images/cross.png'; // Иконка крестик
import './Menu.css'; // Подключаем CSS для меню

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Инициализируем хук useNavigate

    // Переключение состояния меню
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Функция для обработки перехода на страницу
    const handleNavigation = (path) => {
        toggleMenu(); // Закрываем меню после перехода
        navigate(path); // Переход на указанную страницу
    };

    return (
        <div>
            {/* Иконка меню или крестик */}
            <div className="menu-icon" onClick={toggleMenu}>
                <img src={isOpen ? crossIcon : menuIcon} alt="Menu Icon" />
            </div>

            {/* Оверлей меню с пунктами */}
            <div className={`menu-overlay ${isOpen ? 'show' : ''}`}>
                <div className="menu-content">
                    <ul>
                        <li onClick={() => handleNavigation('/my-travels')}>МОИ ПУТЕШЕСТВИЯ</li>
                        <li>МОИ ПЛАНЫ</li>
                        <li>МОИ КОЛЛЕКЦИИ</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
