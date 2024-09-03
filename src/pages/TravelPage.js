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
                <h2>CREATE YOUR STORY</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="travel-name">Travel name</label>
                        <input
                            type="text"
                            id="travel-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <small>Set a name for your travel</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="travel-description">Description</label>
                        <textarea
                            id="travel-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="A very long line of text which is expected to span more than two to three lines so it breaks as the text increases."
                        />
                        <small>Write a summary for your travel</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="start-date">Start date *</label>
                        <input
                            type="date"
                            id="start-date"
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                            placeholder="YYYY/MM/DD"
                        />
                        <small>Set a start date for your travel</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="end-date">End date *</label>
                        <input
                            type="date"
                            id="end-date"
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                            placeholder="YYYY/MM/DD"
                        />
                        <small>Set an end date for your travel</small>
                    </div>

                    <button type="submit" className="create-button">Create</button>
                </form>
            </div>
        </div>
    );
};

export default TravelPage;
