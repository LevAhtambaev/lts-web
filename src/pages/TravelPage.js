// src/pages/TravelPage.js
import React, { useState } from 'react';
import Header from '../components/Header';  // Импортируем Header
import './TravelPage.css';
import { useNavigate } from 'react-router-dom';


const TravelPage = () => {
    // Состояния для управления значениями формы
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Формируем данные для отправки
        const travelData = {
            name,
            description,
            date_start: dateStart,
            date_end: dateEnd,
        };

        try {
            const response = await fetch('http://localhost:8000/api/travel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(travelData),
            });

            if (response.ok) {
                const data = await response.json();
                // Переход на TravelDetailsPage с использованием UUID из ответа
                navigate(`/travel/${data.id}`);
            } else {
                console.error('Failed to create travel');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Header /> {/* Добавляем Header */}
            <div className="travel-form">
                <h3>ОПИШИ СВОЕ ПУТЕШЕСТВИЕ</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="travel-name">Название путешествия</label>
                        <input
                            type="text"
                            id="travel-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Название"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="travel-description">Описание</label>
                        <textarea
                            id="travel-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Описание"
                        />
                        <small>Кратко опиши введение для своей поездки</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="start-date">Дата начала путешествия</label>
                        <input
                            type="date"
                            id="start-date"
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                            placeholder="YYYY/MM/DD"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="end-date">Дата конца путешествия</label>
                        <input
                            type="date"
                            id="end-date"
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                            placeholder="YYYY/MM/DD"
                        />
                    </div>

                    <button type="submit" className="create-button">Создать</button>
                </form>
            </div>
        </div>
    );
};

export default TravelPage;
