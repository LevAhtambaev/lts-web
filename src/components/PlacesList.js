import React, { useState } from 'react';
import moneyIcon from '../assets/images/money.png';
import defaultPreview from '../assets/images/default_place_image.png'; // Добавьте путь к изображению по умолчанию
import ExpensesTooltip from './ExpensesTooltip';
import ImageSlider from './ImageSlider';

const PlacesList = ({ places, travelUuid }) => {
    const [hoveredExpenses, setHoveredExpenses] = useState(null);
    const [showExpensesTooltip, setShowExpensesTooltip] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(null); // Состояние для отображения модального окна для каждого места
    const [showImageUploadModal, setShowImageUploadModal] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // Состояние для выбранного файла
    const [selectedFiles, setSelectedFiles] = useState([]); // Для загрузки нескольких изображений


    const handleMouseEnter = (expenses) => {
        setHoveredExpenses(expenses);
        setShowExpensesTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowExpensesTooltip(false);
        setHoveredExpenses(null);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Обработчик для нескольких файлов (фотографии)
    const handleFilesChange = (event) => {
        setSelectedFiles(Array.from(event.target.files)); // Сохраняем несколько файлов в массив
    };

    const handleUploadClick = async (placeUuid) => {
        if (!selectedFile) return;

        // Используем FileReader для чтения файла в формате binary
        const reader = new FileReader();
        reader.onloadend = async () => {
            const binaryData = reader.result;

            try {
                const response = await fetch(`http://localhost:8000/api/place/${travelUuid}/${placeUuid}`, {
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
                setShowUploadModal(null);
                window.location.reload();
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };


        reader.readAsArrayBuffer(selectedFile); // Читаем файл как ArrayBuffer для бинарной загрузки
    };

    const handleImageUploadClick = async (placeUuid) => {
        if (!selectedFiles.length) return;

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('image', file)); // Добавляем все файлы в FormData

        try {
            const response = await fetch(`http://localhost:8000/api/place/images/${travelUuid}/${placeUuid}`, {
                method: 'PUT',
                body: formData, // Отправляем как FormData
            });

            if (!response.ok) {
                throw new Error('Failed to upload images');
            }

            // Закрываем модальное окно и обновляем страницу после успешной загрузки
            setShowImageUploadModal(null);
            window.location.reload();
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };


    return (
        <div className="places-list">
            {places.map((place) => (
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
                                    <ExpensesTooltip expenses={place.expenses} />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Отображение превью места */}

                    <div className="place-preview-wrapper">
                        <img
                            src={place.preview || defaultPreview}
                            alt={place.name}
                            className="place-preview"
                        />
                        {!place.preview && (
                            <button
                                className="upload-place-preview-button"
                                onClick={() => setShowUploadModal(place.id)}
                            >
                                Загрузить превью
                            </button>
                        )}

                    </div>


                    <div className="place-story-container">
                        {place.story.split('\n').map((line, index) => (
                            <p className="place-story" key={index}>{line}</p>
                        ))}
                    </div>

                    {place.images && place.images.length > 0 ? (
                        <ImageSlider images={place.images} width="600px" height="400px" />
                    ) : (
                        <div className="place-preview-wrapper">
                            <button
                                className="upload-place-images-button"
                                onClick={() => setShowImageUploadModal(place.id)}
                            >
                                Загрузить фотографии
                            </button>
                        </div>
                    )}


                    {/* Модальное окно для загрузки превью */}
                    {showUploadModal === place.id && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Загрузите превью для {place.name}</h2>
                                <input type="file" onChange={handleFileChange} />
                                <button onClick={() => handleUploadClick(place.id)}>Загрузить</button>
                                <button onClick={() => setShowUploadModal(null)}>Отмена</button>
                            </div>
                        </div>
                    )}

                    {/* Модальное окно для загрузки фотографий */}
                    {showImageUploadModal === place.id && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Загрузите фотографии для {place.name}</h2>
                                <input type="file" multiple onChange={handleFilesChange} />
                                <button onClick={() => handleImageUploadClick(place.id)}>Загрузить</button>
                                <button onClick={() => setShowImageUploadModal(null)}>Отмена</button>
                            </div>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
};

export default PlacesList;
