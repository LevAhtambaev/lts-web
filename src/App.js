// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TravelPage from './pages/TravelPage'; // Импортируем страницу TravelPage
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/travel" element={<TravelPage />} /> {/* Добавляем маршрут для страницы /travel */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
