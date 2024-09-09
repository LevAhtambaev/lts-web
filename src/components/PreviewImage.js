import React from 'react';
import defaultPreview from '../assets/images/default-preview.jpg';

const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const options = { day: 'numeric', month: 'long' };
    const startFormatted = start.toLocaleDateString('ru-RU', options);
    const endFormatted = end.toLocaleDateString('ru-RU', options);

    if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()} - ${endFormatted}`;
    } else {
        return `${startFormatted} - ${endFormatted}`;
    }
};

const PreviewImage = ({ travel, setShowUploadModal }) => (
    <div
        className="travel-preview"
        style={{ backgroundImage: `url(${travel.preview || defaultPreview})` }}
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
);

export default PreviewImage;
