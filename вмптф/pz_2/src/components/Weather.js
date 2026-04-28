import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [data, setData] = useState(null);
    const apiKey = 'YOUR_API_KEY'; // Замініть на свій ключ з OpenWeatherMap
    const city = 'Kyiv';

    useEffect(() => {
        // Використання fetch для отримання даних з API [cite: 277]
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json()) // Розбір JSON [cite: 278]
            .then(json => setData(json))
            .catch(err => console.error("Помилка:", err));
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>Прогноз погоди (Рівень 1)</h3>
            {data ? (
                <div>
                    <p>Місто: {data.name}</p>
                    <p>Температура: {data.main.temp}°C</p>
                    <p>Опис: {data.weather[0].description}</p>
                </div>
            ) : <p>Завантаження погоди...</p>}
        </div>
    );
};

export default Weather;