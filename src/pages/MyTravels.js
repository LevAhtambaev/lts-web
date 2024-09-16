import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyTravels.css';
import Header from "../components/Header";

const MyTravels = () => {
    const [travels, setTravels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Запрос данных путешествий с сервера
        const fetchTravels = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/travel');
                const data = await response.json();
                // Сортировка путешествий по дате начала в обратном порядке
                const sortedTravels = data.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
                setTravels(sortedTravels);
            } catch (error) {
                console.error('Ошибка при загрузке путешествий:', error);
            }
        };

        fetchTravels();
    }, []);

    // Группируем путешествия по годам
    const groupedTravels = travels.reduce((acc, travel) => {
        const year = new Date(travel.date_start).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(travel);
        return acc;
    }, {});

    // Функция для перехода на страницу путешествия
    const handleTravelClick = (id) => {
        navigate(`/travel/${id}`); // Переход на страницу с указанным ID путешествия
    };

    return (
        <div>
            <Header />
            <div className="my-travels">
                {Object.keys(groupedTravels)
                    .sort((a, b) => b - a) // Сортируем года в обратном порядке
                    .map((year) => (
                        <div key={year}>
                            {/* Линия с годом */}
                            <div className="year-divider">
                                <hr />
                                <span>{year}</span>
                                <hr />
                            </div>

                            {/* Карточки путешествий за год */}
                            <div className="travels-list">
                                {groupedTravels[year].map((travel) => (
                                    <div
                                        className="travel-card"
                                        key={travel.id}
                                        onClick={() => handleTravelClick(travel.id)}
                                    >
                                        <img
                                            src={travel.preview}
                                            alt={travel.name}
                                            className="travel-preview-card"
                                        />
                                        <div className="travel-info">
                                            <h3>{travel.name}</h3>
                                            <p>
                                                {new Date(travel.date_start).toLocaleDateString()} -{' '}
                                                {new Date(travel.date_end).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyTravels;
