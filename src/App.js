import React from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="card-container">
                <Card title="NEW PLAN" />
                <Card title="NEW TRAVEL" className="large" />
                <Card title="COLLECTION" />
            </div>
        </div>
    );
}

export default App;
