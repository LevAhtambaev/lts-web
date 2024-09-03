import React, { useState } from 'react';
import "./ImageSlider.css"

const ImageSlider = ({ images, width = '600px', height = '400px' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="image-slider" style={{ width, height }}>
            {images.length > 0 && (
                <>
                    <img
                        src={images[currentIndex]}
                        alt={`Place ${currentIndex + 1}`}
                        className="slider-image"
                        style={{ width, height }}
                    />
                    <button className="slider-button left" onClick={prevSlide}>◀</button>
                    <button className="slider-button right" onClick={nextSlide}>▶</button>
                </>
            )}
        </div>
    );
};

export default ImageSlider;
