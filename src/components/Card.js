import React from 'react';
import './Card.css';

const Card = ({ title, className = '' }) => {
    return (
        <div className={`card-wrapper ${className}`}>
            <p className="card-title">{title}</p>
            <div className="card">
                <div className="card-content">
                    <span className="plus-icon">+</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
