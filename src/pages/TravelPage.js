// src/pages/TravelPage.js
import React from 'react';
import Header from '../components/Header'; // Импортируем компонент Header
import './TravelPage.css'; // Импортируем CSS файл


const TravelPage = () => {
    return (
        <div>
            <Header /> {/* Отображаем Header на странице */}
            <div className="travel-form">
                {/* Здесь можете разместить вашу форму для создания путешествия */}
                <h2>CREATE YOUR STORY</h2>
                <form>
                    {/* Форма с полями для создания путешествия */}
                </form>
            </div>
        </div>
    );
};

export default TravelPage;
