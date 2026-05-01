import React, { useState } from 'react';

const JsonFilter = () => {
    const [jsonData, setJsonData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [error, setError] = useState('');

    // Обробка завантаження файлу
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsedData = JSON.parse(e.target.result);

                // Перевіряємо, чи є дані масивом (найкраще підходить для фільтрації)
                const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];

                setJsonData(dataArray);
                setFilteredData(dataArray);
                setError('');
            } catch (err) {
                setError('Помилка: невірний формат JSON-файлу.');
                setJsonData(null);
                setFilteredData(null);
            }
        };
        reader.readAsText(file);
    };

    // Обробка введення тексту фільтра
    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterValue(value);
        applyFilter(jsonData, value);
    };

    // Логіка фільтрації
    const applyFilter = (data, filterText) => {
        if (!data) return;

        if (!filterText.trim()) {
            setFilteredData(data);
            return;
        }

        const lowerCaseFilter = filterText.toLowerCase();

        // Фільтруємо масив об'єктів: залишаємо ті, де хоча б одне значення містить текст фільтра
        const filtered = data.filter((item) => {
            return Object.values(item).some((val) =>
                String(val).toLowerCase().includes(lowerCaseFilter)
            );
        });

        setFilteredData(filtered);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>Фільтр JSON даних</h2>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    <strong>Завантажити JSON файл:</strong>
                </label>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    <strong>Значення фільтра:</strong>
                </label>
                <input
                    type="text"
                    value={filterValue}
                    onChange={handleFilterChange}
                    placeholder="Введіть текст для фільтрації..."
                    disabled={!jsonData}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            <div>
                <h3>Відфільтровані дані:</h3>
                <pre style={{
                    backgroundColor: '#f4f4f4',
                    padding: '15px',
                    borderRadius: '5px',
                    overflowX: 'auto',
                    maxHeight: '400px'
                }}>
          {filteredData ? JSON.stringify(filteredData, null, 2) : 'Завантажте файл для відображення даних.'}
        </pre>
            </div>
        </div>
    );
};

export default JsonFilter;