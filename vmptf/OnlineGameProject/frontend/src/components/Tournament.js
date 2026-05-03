import React from 'react';

const Tournament = () => {
    return (
        <div className="tournament">
            <h2>🏟️ Tournament Grid</h2>
            <div className="match">
                <p>Match 1: Player A vs Player B (Live)</p>
                <p>Match 2: Player C vs Player D (Pending)</p>
            </div>
            <p><i>Оптимізовано для високих навантажень через WebSocket</i></p>
        </div>
    );
};

export default Tournament; // Цей рядок обов'язковий!