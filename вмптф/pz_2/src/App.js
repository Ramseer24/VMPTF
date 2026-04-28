import React from 'react';
import Weather from './components/Weather';
import JsonGen from './components/JsonGen';
import MovieApp from './components/MovieApp';

function App() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
            <h1 style={{ textAlign: 'center' }}>Звіт: Практична робота №2</h1>
            <Weather />
            <JsonGen />
            <MovieApp />
        </div>
    );
}

export default App;