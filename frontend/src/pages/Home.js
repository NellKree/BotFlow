// src/pages/Home.js
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [status, setStatus] = useState("Загрузка...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_GATEWAY_URL || "http://localhost:8000"}/status`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.message || "Нет ответа от сервера");
                setLoading(false);
            })
            .catch(() => {
                setStatus("Ошибка запроса к серверу");
                setLoading(false);
            });
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Добро пожаловать в BotFlow</h1>
            <p style={styles.subtitle}><strong>Статус сервера:</strong> {status}</p>

            {loading && <p style={styles.loaderText}>🔄 Загружаем данные...</p>}

            {!loading && (
                <div style={styles.cardsContainer}>
                    {/* YouTube */}
                    <a href="/youtube" style={styles.card}>
                        <span style={styles.icon}>🎥</span>
                        <h2>YouTube</h2>
                        <p>Получите комментарии к видео</p>
                    </a>

                    {/* Instagram */}
                    <a href="/instagram" style={styles.card}>
                        <span style={styles.icon}>📸</span>
                        <h2>Instagram</h2>
                        <p>Анализ профиля или поста</p>
                    </a>

                    {/* Twitch */}
                    <a href="/twitch" style={styles.card}>
                        <span style={styles.icon}>🎮</span>
                        <h2>Twitch</h2>
                        <p>Сбор сообщений из чата</p>
                    </a>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    subtitle: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "2rem",
    },
    cardsContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "1.5rem",
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        width: "250px",
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    icon: {
        fontSize: "2.5rem",
        marginBottom: "0.5rem",
    },
    loaderText: {
        fontSize: "1.2rem",
        marginTop: "1rem",
    },
};

export default Home;