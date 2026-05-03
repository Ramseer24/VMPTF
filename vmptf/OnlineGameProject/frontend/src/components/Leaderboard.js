import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://26.94.177.16:3001');

const Leaderboard = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        // Отримуємо дані через сокет, а не через fetch
        socket.on('refreshLeaderboard', (data) => setList(data));
        return () => socket.off('refreshLeaderboard');
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h3>Топ 10 Гравців</h3>
            {list.length === 0 ? <p>Рейтинг порожній...</p> :
                list.map((u, i) => (
                    <div key={i} style={{fontSize: '20px', margin: '10px'}}>
                        {i+1}. <b>{u.name}</b>: {u.score} очок
                    </div>
                ))
            }
        </div>
    );
};

export default Leaderboard;