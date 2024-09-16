// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TravelPage from './pages/TravelPage';
import TravelDetailsPage from './pages/TravelDetailsPage'; // Импортируем страницу TravelDetailsPage
import './App.css';
import MyTravels from "./pages/MyTravels";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/travel" element={<TravelPage/>}/>
                    <Route path="/travel/:uuid" element={<TravelDetailsPage/>}/>
                    <Route path="/my-travels" element={<MyTravels/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
