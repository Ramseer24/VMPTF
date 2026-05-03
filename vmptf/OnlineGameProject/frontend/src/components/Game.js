import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://26.94.177.16:3001'); // Твій Radmin IP

const Game = ({ user }) => {
    const [players, setPlayers] = useState({});
    const [item, setItem] = useState({ x: -100, y: -100 });

    useEffect(() => {
        socket.emit('joinGame', { username: user?.username });
        socket.on('updatePlayers', (data) => setPlayers(data));
        socket.on('updateItem', (data) => setItem(data));

        return () => {
            socket.off('updatePlayers');
            socket.off('updateItem');
        };
    }, [user]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        socket.emit('move', {
            x: e.clientX - rect.left - 15,
            y: e.clientY - rect.top - 15
        });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Збери якнайбільше бонусів!</h2>
            <div
                onMouseMove={handleMouseMove}
                style={{
                    width: '500px', height: '500px',
                    border: '5px solid #444', position: 'relative',
                    margin: '0 auto', backgroundColor: '#222', // Темний фон для контрасту
                    cursor: 'none', overflow: 'hidden', borderRadius: '10px'
                }}
            >
                {/* МАЛЮЄМО БОНУС */}
                <div style={{
                    position: 'absolute',
                    left: item.x, top: item.y,
                    width: '25px', height: '25px',
                    backgroundColor: '#FFD700', // Золотий колір
                    borderRadius: '50%',
                    boxShadow: '0 0 15px #FFD700',
                    zIndex: 1
                }} />

                {/* МАЛЮЄМО ГРАВЦІВ */}
                {Object.values(players).map(p => (
                    <div key={p.id} style={{
                        position: 'absolute',
                        left: p.x, top: p.y,
                        width: '30px', height: '30px',
                        borderRadius: '5px',
                        backgroundColor: p.color,
                        border: p.id === socket.id ? '2px solid white' : 'none',
                        transition: '0.05s linear',
                        zIndex: 2
                    }}>
                        <div style={{ position: 'absolute', top: '-25px', color: 'white', fontSize: '12px', width: '100px', left: '-35px' }}>
                            {p.username}: {p.score}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game;