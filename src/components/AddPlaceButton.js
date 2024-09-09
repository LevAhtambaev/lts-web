import React, { useState } from 'react';

const AddPlaceButton = ({ onClick, travelUuid }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [placeName, setPlaceName] = useState('');
    const [placeStory, setPlaceStory] = useState('');
    const [placeDate, setPlaceDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPlace = {
            name: placeName,
            story: placeStory,
            date: placeDate,
        };

        try {
            const response = await fetch(`http://localhost:8000/api/place/${travelUuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlace),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Place added successfully:', data);
                setPlaceName('');
                setPlaceStory('');
                setPlaceDate('');
                setIsModalVisible(false); // Скрываем форму после успешного добавления
                onClick(); // Обновляем список мест
                window.location.reload();
            } else {
                console.error('Error adding place:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="add-place-container">
                <div className="add-place-button" onClick={() => setIsModalVisible(true)}>
                    <span className="add-place-line"></span>
                    <span className="add-place-icon">+</span>
                    <span className="add-place-line"></span>
                </div>
            </div>

            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Добавить новое место</h2>
                        <form className="add-place-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="place-name">Название места:</label>
                                <input
                                    type="text"
                                    id="place-name"
                                    value={placeName}
                                    onChange={(e) => setPlaceName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="place-story">Описание:</label>
                                <textarea
                                    id="place-story"
                                    value={placeStory}
                                    onChange={(e) => setPlaceStory(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="place-date">Дата:</label>
                                <input
                                    type="date"
                                    id="place-date"
                                    value={placeDate}
                                    onChange={(e) => setPlaceDate(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Добавить место</button>
                            <button type="button" onClick={() => setIsModalVisible(false)}>Отмена</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPlaceButton;
