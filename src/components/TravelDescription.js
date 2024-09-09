import React from 'react';

const TravelDescription = ({ description }) => (
    <div className="travel-description-container">
        <div className="travel-description">
            <p>{description}</p>
            <hr className="divider" />
        </div>
    </div>
);

export default TravelDescription;
