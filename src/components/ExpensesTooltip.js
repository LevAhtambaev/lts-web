import React, { useState } from 'react';

const formatCurrency = (value) => `${value}р`;

const ExpensesTooltip = ({ expenses, placeUuid }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newExpenses, setNewExpenses] = useState({
        road: 0,
        residence: 0,
        food: 0,
        entertainment: 0,
        other: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpenses((prevExpenses) => ({
            ...prevExpenses,
            [name]: parseInt(value) || 0,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/expenses/${placeUuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExpenses),
            });

            if (response.ok) {
                setIsEditing(false);
                window.location.reload();
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка');
        }
    };

    if (!expenses) {
        return (
            <div>
                <p>Траты не указаны</p>
                {!isEditing && <button onClick={() => setIsEditing(true)}>Добавить траты</button>}
                {isEditing && (
                    <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '180px', textAlign: 'left' }}>
                                Дорога:
                            </label>
                            <input
                                type="number"
                                name="road"
                                value={newExpenses.road}
                                onChange={handleChange}
                                style={{ flex: '1', padding: '5px', boxSizing: 'border-box' }} /* Гибкая ширина для input */
                            />
                        </div>
                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '180px', textAlign: 'left' }}>
                                Проживание:
                            </label>
                            <input
                                type="number"
                                name="residence"
                                value={newExpenses.residence}
                                onChange={handleChange}
                                style={{ flex: '1', padding: '5px', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '180px', textAlign: 'left' }}>
                                Еда:
                            </label>
                            <input
                                type="number"
                                name="food"
                                value={newExpenses.food}
                                onChange={handleChange}
                                style={{ flex: '1', padding: '5px', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '180px', textAlign: 'left' }}>
                                Развлечения:
                            </label>
                            <input
                                type="number"
                                name="entertainment"
                                value={newExpenses.entertainment}
                                onChange={handleChange}
                                style={{ flex: '1', padding: '5px', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '180px', textAlign: 'left' }}>
                                Другое:
                            </label>
                            <input
                                type="number"
                                name="other"
                                value={newExpenses.other}
                                onChange={handleChange}
                                style={{ flex: '1', padding: '5px', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button type="submit" style={{ marginRight: '10px' }}>Сохранить траты</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Отменить</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }

    return (
        <>
            <p>Траты:</p>
            {expenses.road !== null && <p>Дорога: {formatCurrency(expenses.road)}</p>}
            {expenses.residence !== null && <p>Проживание: {formatCurrency(expenses.residence)}</p>}
            {expenses.food !== null && <p>Еда: {formatCurrency(expenses.food)}</p>}
            {expenses.entertainment !== null && <p>Развлечения: {formatCurrency(expenses.entertainment)}</p>}
            {expenses.other !== null && <p>Другое: {formatCurrency(expenses.other)}</p>}
            <hr />
            <p>
                Итого:{' '}
                {formatCurrency(
                    (expenses.road || 0) +
                    (expenses.residence || 0) +
                    (expenses.food || 0) +
                    (expenses.entertainment || 0) +
                    (expenses.other || 0)
                )}
            </p>
        </>
    );
};

export default ExpensesTooltip;
