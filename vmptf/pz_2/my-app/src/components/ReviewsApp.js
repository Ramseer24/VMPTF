import React, { useState } from 'react';

const ReviewsApp = () => {
    const [reviews, setReviews] = useState([]);
    const [form, setForm] = useState({ product: '', rating: 5, comment: '', isBad: false });
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const addReview = () => {
        if (form.product) {
            setReviews([...reviews, { ...form, id: Date.now() }]);
            setForm({ product: '', rating: 5, comment: '', isBad: false });
        }
    };

    const lastIdx = currentPage * itemsPerPage;
    const firstIdx = lastIdx - itemsPerPage;
    const currentReviews = reviews.slice(firstIdx, lastIdx);

    return (
        <div style={{ border: '1px solid #ddd', padding: '15px' }}>
            <h3>Рівень 3 & 4: Відгуки та Пагінація</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '300px' }}>
                <input placeholder="Продукт/Послуга" value={form.product} onChange={e => setForm({...form, product: e.target.value})} />
                <input type="number" max="5" min="1" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} />
                <textarea placeholder="Ваш відгук" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
                <label>
                    <input type="checkbox" checked={form.isBad} onChange={e => setForm({...form, isBad: e.target.checked})} />
                    Не якісний товар
                </label>
                <button onClick={addReview}>Надіслати</button>
            </div>

            <hr />
            <label>Показувати по: </label>
            <input type = "number"
                min = "1"
                value = {itemsPerPage}
                onChange={(e) => {const val = Number(e.target.value);
                if (val > 0) {
                setItemsPerPage(val); setCurrentPage(1);}
                }}
                style = {{width: '50px'}}
            />
            


            <select onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1)}}>
                <option value="2">2</option>
                <option value="5">5</option>
            </select>

            <ul>
                {currentReviews.map(r => (
                    <li key={r.id} style={{ color: r.isBad ? 'red' : 'black', marginBottom: '10px' }}>
                        <strong>{r.product}</strong> ({r.rating}/5) <br />
                        {r.comment} {r.isBad && <b>— ТОВАР НЕЯКІСНИЙ!</b>}
                    </li>
                ))}
            </ul>

            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Назад</button>
            <span> Сторінка {currentPage} </span>
            <button disabled={lastIdx >= reviews.length} onClick={() => setCurrentPage(p => p + 1)}>Вперед</button>
        </div>
    );
};

export default ReviewsApp;