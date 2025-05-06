import React, { useEffect, useState } from 'react';

function App() {
    const [status, setStatus] = useState("Загрузка...");

    useEffect(() => {
        fetch("http://localhost:8000/status")
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.message || "Нет ответа от сервера");
            })
            .catch(() => {
                setStatus("Ошибка запроса к серверу");
            });
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>BotFlow – Проверка API</h1>
            <p><strong>Ответ сервера:</strong> {status}</p>
        </div>
    );
}

export default App;
