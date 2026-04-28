import React, { useState, useEffect } from 'react';

const AnimalList = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch('/animals.json')
            .then(res => res.json())
            .then(data => setAnimals(data))
            .catch(err => console.error("Помилка завантаження:", err));
    }, []);

    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px' }}>
            <h3>Рівень 1: Відображення тварин</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {animals.map((item, index) => (
                    <div key={index} style={{ textAlign: 'center', width: '100px' }}>
                        <img src={item.photo} alt={item.name} style={{ width: '100%', borderRadius: '10px' }} />
                        <p><strong>{item.name}</strong><br/><small>{item.type}</small></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimalList;