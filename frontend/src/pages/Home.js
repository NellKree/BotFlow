// src/pages/Home.js
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [status, setStatus] = useState("Загрузка...");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_GATEWAY_URL || "http://localhost:8000"}/status`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.message || "Нет ответа от сервера");
            })
            .catch(() => {
                setStatus("Ошибка запроса к серверу");
            });
    }, []);

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Добро пожаловать в BotFlow</h1>
            <p><strong>Статус сервера:</strong> {status}</p>

            <div style={{ marginTop: "2rem" }}>
                <h2>Функции</h2>
                <ul>
                    <li><a href="/youtube">Получение комментариев YouTube</a></li>
                    <li><a href="/instagram">Анализ профиля или поста Instagram</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Home;