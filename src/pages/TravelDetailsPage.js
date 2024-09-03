import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TravelDetailsPage.css';
import moneyIcon from '../assets/images/money.png';
import defaultPreview from '../assets/images/default-preview.jpg'; // Добавьте путь к изображению по умолчанию
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";

// Функция для форматирования валюты
const formatCurrency = (value) => {
    return `${value}р`;
};

// Функция для форматирования дат
const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const options = { day: 'numeric', month: 'long' };
    const startFormatted = start.toLocaleDateString('ru-RU', options);
    const endFormatted = end.toLocaleDateString('ru-RU', options);

    if (start.getMonth() === end.getMonth()) {
        // Если месяцы совпадают, выводим один раз
        return `${start.getDate()} - ${endFormatted}`;
    } else {
        // Если месяцы разные, выводим оба
        return `${startFormatted} - ${endFormatted}`;
    }
};

const TravelDetailsPage = () => {
    const { uuid } = useParams();
    const [travel, setTravel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false); // Состояние для отображения модального окна
    const [selectedFile, setSelectedFile] = useState(null); // Состояние для хранения выбранного файла
    const [hoveredExpenses, setHoveredExpenses] = useState(null); // Добавлено состояние для отслеживания текущих расходов
    const [showExpensesTooltip, setShowExpensesTooltip] = useState(false); // Состояние для управления видимостью тултипа


    useEffect(() => {
        const fetchTravelDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/travel/${uuid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch travel details');
                }
                const data = await response.json();
                setTravel(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTravelDetails();
    }, [uuid]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (!selectedFile) return;

        // Используем FileReader для чтения файла в формате binary
        const reader = new FileReader();
        reader.onloadend = async () => {
            const binaryData = reader.result;

            try {
                const response = await fetch(`http://localhost:8000/api/travel/preview/${uuid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'image/jpeg', // Поменяйте Content-Type в зависимости от типа файла
                    },
                    body: binaryData, // Передаем бинарные данные в теле запроса
                });

                if (!response.ok) {
                    throw new Error('Failed to upload preview image');
                }

                // Закрываем модальное окно и обновляем страницу после успешной загрузки
                setShowUploadModal(false);
                window.location.reload();
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };

        reader.readAsArrayBuffer(selectedFile); // Читаем файл как ArrayBuffer для бинарной загрузки
    };

    const handleMouseEnter = (expenses) => {
        setHoveredExpenses(expenses); // Устанавливаем текущие расходы при наведении мыши
        setShowExpensesTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowExpensesTooltip(false); // Скрываем тултип при уходе мыши
        setHoveredExpenses(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!travel) {
        return <div>No travel details found.</div>;
    }

    return (
        <div>
            <Header />
            <div className="travel-details-page">
                {/* Preview Image and Travel Info */}
                <div
                    className="travel-preview"
                    style={{backgroundImage: `url(${travel.preview || defaultPreview})`}}
                >
                    <div className="travel-info-overlay">
                        <div className="travel-dates">
                            {formatDateRange(travel.date_start, travel.date_end)}
                        </div>
                        <h1 className="travel-name">{travel.name}</h1>
                    </div>
                    {!travel.preview && (
                        <button className="upload-preview-button" onClick={() => setShowUploadModal(true)}>
                            Загрузить превью
                        </button>
                    )}
                </div>

                {/* Travel Description */}
                <div className="travel-description-container">
                    <div className="travel-description">
                        <p>{travel.description}</p>
                        <hr className="divider"/>
                    </div>
                </div>

                {/* List of Places */}
                <div className="places-list">
                    {(travel.places || []).map((place) => (
                        <div key={place.id} className="place">
                            <div className="place-header">
                                <h2 className="place-name">{place.name}</h2>
                                <div className="place-date">
                                    {new Date(place.date).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                                {/* Обновляем иконку для отображения тултипа */}
                                <div className="place-expense-icon-wrapper">
                                    <div
                                        className="place-expense-icon"
                                        onMouseEnter={() => handleMouseEnter(place.expenses)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img src={moneyIcon} alt="Money Icon" />
                                    </div>
                                    {showExpensesTooltip && hoveredExpenses === place.expenses && (
                                        <div className="expenses-tooltip">
                                            {place.expenses ?
                                                <>
                                                    <p>Траты:</p>
                                                    {place.expenses.road !== null && <p>Дорога: {formatCurrency(place.expenses.road)}</p>}
                                                    {place.expenses.residence !== null && <p>Проживание: {formatCurrency(place.expenses.residence)}</p>}
                                                    {place.expenses.food !== null && <p>Еда: {formatCurrency(place.expenses.food)}</p>}
                                                    {place.expenses.entertainment !== null && <p>Развлечения: {formatCurrency(place.expenses.entertainment)}</p>}
                                                    {place.expenses.other !== null && <p>Другое: {formatCurrency(place.expenses.other)}</p>}
                                                    <hr />
                                                    <p>Итого: {formatCurrency(
                                                        (place.expenses.road || 0) +
                                                        (place.expenses.residence || 0) +
                                                        (place.expenses.food || 0) +
                                                        (place.expenses.entertainment || 0) +
                                                        (place.expenses.other || 0)
                                                    )}</p>
                                                </>
                                                : <p>Траты не указаны</p>
                                            }
                                        </div>
                                    )}
                                </div>

                            </div>
                            <img src={place.preview} alt={place.name} className="place-preview"/>
                            <div className="place-story-container">
                                {place.story.split('\n').map((line, index) => (
                                    <p className="place-story" key={index}>{line}</p>
                                ))}
                            </div>

                            {/* Слайдер для изображений места с заданными размерами */}
                            {place.images && place.images.length > 0 && (
                                <ImageSlider images={place.images} width="600px" height="400px" />
                            )}


                        </div>
                    ))}
                </div>


                {/* Add Place Button */}
                <div className="add-place-container">
                    <div className="add-place-button" onClick={() => { /* Заглушка для создания нового места */
                    }}>
                        <span className="add-place-line"></span>
                        <span className="add-place-icon">+</span>
                        <span className="add-place-line"></span>
                    </div>
                </div>

                {/* Upload Modal */}
                {showUploadModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Загрузите превью путешествия</h2>
                            <input type="file" onChange={handleFileChange}/>
                            <button onClick={handleUploadClick}>Загрузить</button>
                            <button onClick={() => setShowUploadModal(false)}>Отмена</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelDetailsPage;
