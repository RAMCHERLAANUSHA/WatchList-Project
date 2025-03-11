import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [watchItems, setWatchItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '' });

    useEffect(() => {
        axios.get('http://localhost:8000/api/watchlist/')
            .then(res => setWatchItems(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/watchlist/', newItem)
            .then(res => {
                setWatchItems([...watchItems, res.data]);
                setNewItem({ title: '' });
            })
            .catch(err => console.log(err));
    };

    const handleComplete = (id) => {
        axios.patch(`http://localhost:8000/api/watchlist/${id}/`, { completed: true })
            .then(res => {
                const updatedItems = watchItems.map(item =>
                    item.id === id ? { ...item, completed: true } : item
                );
                setWatchItems(updatedItems);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Watchlist</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newItem.title}
                    onChange={handleChange}
                    placeholder="Enter a movie title"
                    className="input-field"
                    required
                />
                <button type="submit" className="add-button">Add</button>
            </form>
            <ul className="watchlist-container">
                {watchItems.map(item => (
                    <li
                        key={item.id}
                        className={`watchlist-item ${item.completed ? 'completed' : ''}`}
                    >
                        {item.title} - {item.completed ? '✅' : '❌'}
                        {!item.completed && (
                            <button
                                className="complete-button"
                                onClick={() => handleComplete(item.id)}
                            >
                                🎥
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;