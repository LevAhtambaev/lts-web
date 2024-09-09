import React from 'react';

const UploadModal = ({ show, onClose, onFileChange, onUploadClick }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Загрузите превью путешествия</h2>
                <input type="file" onChange={onFileChange} />
                <button onClick={onUploadClick}>Загрузить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default UploadModal;
