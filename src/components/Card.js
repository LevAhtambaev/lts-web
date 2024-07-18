// src/components/Card.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useHistory из react-router-dom
import './Card.css';
import plusIcon from '../assets/images/plus.png'; // Импортируем иконку plus.png

const Card = ({ title, className = '' }) => {
    // Проверяем, является ли карточка средней
    const isLarge = className.includes('large');

    const navigate = useNavigate();

    const handleClick = () => {
        if (className.includes('large')) {
            navigate('/travel');
        }
    };

    return (
        <div className={`card-wrapper ${className}`} onClick={handleClick}>
            <p className={`card-title ${isLarge ? 'large-text' : ''}`}>{title}</p>
            <div className="card">
                <div className="card-content">
                    <img
                        src={plusIcon}
                        alt="Plus Icon"
                        className={`plus-icon ${isLarge ? 'large-icon' : ''}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Card;
