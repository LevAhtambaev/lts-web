import React from 'react';


const formatCurrency = (value) => `${value}р`;

const ExpensesTooltip = ({ expenses }) => {
    if (!expenses) {
        return <p>Траты не указаны</p>;
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
            <p>Итого: {formatCurrency(
                (expenses.road || 0) +
                (expenses.residence || 0) +
                (expenses.food || 0) +
                (expenses.entertainment || 0) +
                (expenses.other || 0)
            )}</p>
        </>
    );
};

export default ExpensesTooltip;
