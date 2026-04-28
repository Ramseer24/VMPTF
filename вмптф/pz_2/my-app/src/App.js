import React from 'react';
import AnimalList from './components/AnimalList';
import JsonFilter from './components/JsonFilter';
import ReviewsApp from './components/ReviewsApp';

/**
 * Головний компонент App, який об'єднує всі рівні практичної роботи №2.
 * Ієрархія:
 * - AnimalList (Рівень 1): Завантаження та відображення тварин з JSON.
 * - JsonFilter (Рівень 2): Фільтрація JSON-даних та вивід результату.
 * - ReviewsApp (Рівень 3 & 4): Відгуки, оцінка якості та пагінація.
 */
function App() {
    return (
        <div style={{
            maxWidth: '900px',
            margin: '40px auto',
            padding: '20px',
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            backgroundColor: '#fff',
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
            borderRadius: '12px'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#2c3e50', fontSize: '2.5rem' }}>
                    Звіт: Практична робота №2
                </h1>
                <p style={{ color: '#7f8c8d' }}>
                    Робота із форматом JSON, запитами fetch() та компонентами React
                </p>
            </header>

            <main>
                {/* Рівень 1: Відображення даних про тварин */}
                <section style={sectionStyle}>
                    <AnimalList />
                </section>

                {/* Рівень 2: Фільтрація JSON-структури */}
                <section style={sectionStyle}>
                    <JsonFilter />
                </section>

                {/* Рівень 3 та 4: Система відгуків, оцінка якості та пагінація */}
                <section style={sectionStyle}>
                    <ReviewsApp />
                </section>
            </main>

            <footer style={{
                textAlign: 'center',
                marginTop: '50px',
                paddingTop: '20px',
                borderTop: '1px solid #eee',
                color: '#bdc3c7',
                fontSize: '0.9rem'
            }}>
                © 2026 — Виконано в межах навчального курсу ВМПТФ
            </footer>
        </div>
    );
}

// Простий об'єкт стилів для секцій, щоб код виглядав охайно
const sectionStyle = {
    marginBottom: '30px',
    padding: '10px',
    borderBottom: '1px solid #f1f1f1'
};

export default App;