import React, { useState } from 'react';

const JsonFilter = () => {
    // Розширені вхідні дані (імітація великого JSON-файлу)
    const initialData = [
        { "id": 1, "name": "Лев", "type": "Ссавець", "origin": "Африка", "status": "Вільний" },
        { "id": 2, "name": "Орел", "type": "Птах", "origin": "Європа", "status": "Вільний" },
        { "id": 3, "name": "Акула", "type": "Риба", "origin": "Океан", "status": "Захищений" },
        { "id": 4, "name": "Тигр", "type": "Ссавець", "origin": "Азія", "status": "Захищений" },
        { "id": 5, "name": "Сова", "type": "Птах", "origin": "Ліс", "status": "Вільний" },
        { "id": 6, "name": "Змія", "type": "Плазун", "origin": "Степ", "status": "Вільний" },
        { "id": 7, "name": "Кіт", "type": "Ссавець", "origin": "Дім", "status": "Вільний" },
        { "id": 8, "name": "Вовк", "type": "Ссавець", "origin": "Тайга", "status": "Вільний" },
        { "id": 9, "name": "Слон", "type": "Ссавець", "origin": "Савана", "status": "Захищений" },
        { "id": 10, "name": "Пінгвін", "type": "Птах", "origin": "Антарктида", "status": "Вільний" }
    ];

    // Стан для значення фільтра
    const [filterValue, setFilterValue] = useState('');

    // Логіка фільтрації: шукаємо збіги в назві, типі або походженні (origin)
    const filteredData = initialData.filter(item => {
        const searchTerm = filterValue.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm) ||
            item.origin.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <div style={{
            padding: '20px',
            border: '2px solid #3498db',
            borderRadius: '10px',
            margin: '20px 0',
            backgroundColor: '#fdfdfd'
        }}>
            <h2 style={{ color: '#2980b9' }}>Рівень 2: Розширений фільтр JSON</h2>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold' }}>Пошук за ключовим словом: </label>
                <input
                    type="text"
                    placeholder="Тип, назва або регіон..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '300px',
                        borderRadius: '5px',
                        border: '1px solid #3498db',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                <p><strong>Результат фільтрації (JSON формат):</strong></p>
                {/* Використовуємо JSON.stringify для перетворення масиву в текст */}
                <pre style={{
                    background: '#1e1e1e',
                    color: '#9cdcfe',
                    padding: '20px',
                    borderRadius: '8px',
                    overflowX: 'auto',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    maxHeight: '400px',
                    border: '1px solid #555'
                }}>
                    {JSON.stringify(filteredData, null, 2)}
                </pre>
            </div>

            <div style={{ marginTop: '10px', color: '#555', fontStyle: 'italic' }}>
                Відображено об'єктів: {filteredData.length} із {initialData.length}
            </div>
        </div>
    );
};

export default JsonFilter;