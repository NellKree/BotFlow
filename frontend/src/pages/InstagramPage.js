// src/pages/InstagramPage.js
import React, { useState } from 'react';

const InstagramPage = () => {
    const [mode, setMode] = useState("profile");
    const [input, setInput] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const baseUrl = process.env.REACT_APP_GATEWAY_URL || "http://localhost:8000";

    const fetchInstagramData = () => {
        const url = mode === "profile"
            ? `${baseUrl}/api/instagram/profile?username=${input}`
            : `${baseUrl}/api/instagram/post?shortcode=${input}`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    setError(json.error);
                    setData(null);
                } else {
                    setData(json);
                    setError("");
                }
            })
            .catch(() => setError("Ошибка запроса к серверу"));
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Instagram Scraper</h1>
            <label>
                Режим:
                <select value={mode} onChange={e => setMode(e.target.value)} style={{ marginLeft: "1rem" }}>
                    <option value="profile">Анализ профиля</option>
                    <option value="post">Анализ поста</option>
                </select>
            </label>
            <br />
            <input
                type="text"
                placeholder={mode === "profile" ? "Имя пользователя" : "Код поста (shortcode)"}
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginTop: "1rem", marginBottom: "1rem" }}
            />
            <button onClick={fetchInstagramData} style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#c23369",
                color: "white",
                border: "none",
                cursor: "pointer"
            }}>Анализ</button>

            {error && <p style={{ color: 'red', marginTop: "1rem" }}>{error}</p>}
            {data && (
                <pre style={{
                    backgroundColor: "#f4f4f4",
                    padding: "1rem",
                    overflowX: "auto"
                }}>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
};

export default InstagramPage;