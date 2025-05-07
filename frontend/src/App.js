import React, { useEffect, useState } from 'react';

function App() {
    const [status, setStatus] = useState("Загрузка...");

    const [url, setUrl] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    const extractVideoId = (link) => {
        try {
            const urlObj = new URL(link);
            if (urlObj.hostname === 'youtu.be') {
                return urlObj.pathname.substring(1);
            }
            if (urlObj.hostname.includes('youtube.com')) {
                return urlObj.searchParams.get('v');
            }
        } catch (e) {
            return null;
        }
        return null;
    };

    const fetchComments = () => {
        const videoId = extractVideoId(url);
        if (!videoId) {
            setError("Некорректная ссылка на видео");
            return;
        }

        fetch(`${process.env.REACT_APP_YOUTUBE_URL}/youtube/comments?video_id=${videoId}`)
            .then(res => res.json())
            .then(data => {
                if (data.comments) {
                    setComments(data.comments);
                    setError(null);
                } else {
                    setError("Ошибка: " + (data.error || "неизвестно"));
                    setComments([]);
                }
            })
            .catch(() => {
                setError("Ошибка запроса к серверу");
            });
    };

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
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
            <h1>BotFlow – Проверка API</h1>
            <p><strong>Ответ сервера:</strong> {status}</p>
            <h1>Комментарии к видео YouTube</h1>
            <input
                type="text"
                placeholder="Вставьте ссылку на YouTube-видео"
                value={url}
                onChange={e => setUrl(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            />
            <button onClick={fetchComments}>Получить комментарии</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginTop: "2rem" }}>
                {comments.map((comment, idx) => (
                    <div key={idx} style={{
                        display: "flex",
                        gap: "1rem",
                        borderBottom: "1px solid #ccc",
                        padding: "1rem 0"
                    }}>
                        <img
                            src={comment.profileImage}
                            alt={comment.author}
                            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
                        />
                        <div>
                            <strong>{comment.author}</strong> <br />
                            <small>{new Date(comment.publishedAt).toLocaleString()}</small>
                            <p>{comment.text}</p>
                            <p>👍 {comment.likeCount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
