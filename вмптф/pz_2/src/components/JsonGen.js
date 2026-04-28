import React from 'react';

const JsonGen = () => {
    const generateAndSaveJson = () => {
        const data = {
            id: 1,
            task: "Практична робота №2",
            status: "Completed",
            timestamp: new Date().toISOString()
        };

        // Перетворення об'єкта у JSON-рядок [cite: 206, 215]
        const jsonString = JSON.stringify(data, null, 2);

        // Створення файлу для збереження на диск [cite: 330]
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "generated_data.json";
        link.click();
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>Генератор JSON (Рівень 2)</h3>
            <button onClick={generateAndSaveJson}>Згенерувати та зберегти JSON</button>
        </div>
    );
};

export default JsonGen;