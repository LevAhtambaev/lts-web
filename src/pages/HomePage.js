// src/pages/HomePage.js
import React from 'react';
import '../App.css';
import Header from '../components/Header';
import Card from '../components/Card';

function HomePage() {
    return (
        <div className="App">
            <Header />
            <div className="card-container">
                <Card title="ПЛАН" />
                <Card title="ПУТЕШЕСТВИЕ" className="large" />
                <Card title="КОЛЛЕКЦИЯ" />
            </div>
        </div>
    );
}

export default HomePage;
