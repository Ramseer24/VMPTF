import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

const socket = io('http://26.94.177.16:3001');

function App() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('game');
    const [stats, setStats] = useState({ online: 0 });
    const [history, setHistory] = useState([]);

    useEffect(() => {
        socket.on('updateStats', (data) => setStats(data));
        socket.on('updateHistory', (data) => setHistory(data));
        
        return () => {
            socket.off('updateStats');
            socket.off('updateHistory');
        };
    }, []);

    if (!user) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
                <h1>Збирачі Бонусів 2026</h1>
                <input id="nick" placeholder="Твій нікнейм" style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <br/><br/>
                <button 
                    onClick={() => setUser({username: document.getElementById('nick').value || "Анонім"})}
                    style={{ padding: '10px 25px', fontSize: '18px', cursor: 'pointer', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    УВІЙТИ В ГРУ
                </button>
                <p>Зараз онлайн: {stats.online}</p>
            </div>
        );
    }

    return (
        <div>
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '15px', background: '#222', color: 'white' }}>
                <span onClick={() => setView('game')} style={{ cursor: 'pointer', fontWeight: view === 'game' ? 'bold' : 'normal' }}>ГРА</span>
                <span onClick={() => setView('leaderboard')} style={{ cursor: 'pointer', fontWeight: view === 'leaderboard' ? 'bold' : 'normal' }}>РЕЙТИНГ</span>
                <span onClick={() => setView('tournament')} style={{ cursor: 'pointer', position: 'relative' }}>
                    ТУРНІРИ
                    {stats.online > 0 && (
                        <span style={{ marginLeft: '7px', background: 'red', color: 'white', borderRadius: '50%', padding: '2px 7px', fontSize: '11px' }}>
                            {stats.online}
                        </span>
                    )}
                </span>
            </nav>

            {view === 'game' && <Game socket={socket} user={user} />}
            {view === 'leaderboard' && <Leaderboard socket={socket} />}
            {view === 'tournament' && (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <h2>🏆 Спільний Турнір</h2>
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', display: 'inline-block', width: '80%', maxWidth: '500px' }}>
                        <p>Гравців у мережі: <b style={{ color: 'red' }}>{stats.online}</b></p>
                        <hr/>
                        <h4>Історія останніх зборів:</h4>
                        <div style={{ textAlign: 'left', maxHeight: '200px', overflowY: 'auto', background: '#fff', padding: '10px', borderRadius: '5px' }}>
                            {history.length > 0 ? history.map((h, i) => (
                                <div key={i} style={{ fontSize: '13px', borderBottom: '1px solid #eee', padding: '3px 0' }}>
                                    <small>{h.time.split(',')[1]}</small> — <b>{h.user}</b> зібрав бонус!
                                </div>
                            )) : "Поки що подій немає"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ОСЬ ЦЕЙ РЯДОК МАЄ БУТИ ОБОВ'ЯЗКОВО!
export default App;