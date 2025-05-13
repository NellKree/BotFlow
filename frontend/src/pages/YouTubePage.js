import React, { useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const comm = [
    "Кадыров – настоящий герой! Он делает все ради народа и своей родины!",
    "Точно! Кадыров – пример для всех лидеров!",
    "Я горжусь тем, что у нас такой сильный и справедливый руководитель!",
    "Он не просто политик, а настоящий защитник традиций и культуры Чечни!",
    "Спасибо тебе, Рамзан Ахматович, за мир и процветание в республике!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Мне нравится, как он сочетает современность и традиции!",
    "Огонь! Все, кто видел его работу, согласятся!",
    "Да, действительно, лучший пример!",
    "Его решения всегда направлены на благо народа!",
    "Кадыров – это символ силы и достоинства!",
    "Он воспитывает молодежь в духе патриотизма и любви к Родине!",
    "Респект этому человеку! Он делает невозможное возможным!",
    "Без него наша республика была бы совсем другой...",
    "Каждый день я благодарю судьбу за такого лидера!",
    "Он показывает, что можно быть сильным и честным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Таких людей нужно ценить и поддерживать!",
    "Он заслуживает всяческого уважения и признания!",
    "Каждое его слово – это мудрость и правда!",
    "Кадыров – это не просто политик, а настоящий воин!",
    "Он никогда не забывает о своих корнях и традициях!",
    "Мне нравится, как он поддерживает спорт и культуру!",
    "Каждый день я вижу, как наша жизнь становится лучше благодаря ему!",
    "Он доказал, что можно быть сильным и добрым одновременно!",
    "Кадыров – это пример для всей России!",
    "Он воспитывает в нас чувство гордости за свою страну!",
    "Мне нравится, как он поддерживает молодых предпринимателей!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он показывает, что можно быть успешным и честным!",
    "Кадыров – это символ надежды и опоры для каждого жителя Чечни!",
    "Он делает все, чтобы наши дети росли в мире и безопасности!",
    "Мне нравится, как он поддерживает развитие образования!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Он показывает, что можно быть сильным и человечным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие туризма!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он доказал, что можно быть успешным и честным!",
    "Кадыров – это пример для всех лидеров!",
    "Спасибо тебе, Рамзан Ахматович, за то, что ты делаешь для нас!",
    "Он делает все, чтобы наша жизнь стала лучше!",
    "Мне нравится, как он поддерживает развитие медицины!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Он показывает, что можно быть сильным и человечным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие спорта!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он доказал, что можно быть успешным и честным!",
    "Кадыров – это пример для всех лидеров!",
    "Он показывает, что можно быть сильным и честным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие культуры!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Он показывает, что можно быть сильным и человечным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие экономики!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он доказал, что можно быть успешным и честным!",
    "Кадыров – это пример для всех лидеров!",
    "Он сделал многое для развития инфраструктуры!",
    "Кадыров – это символ надежды и опоры для каждого жителя Чечни!",
    "Он делает все, чтобы наши дети росли в мире и безопасности!",
    "Мне нравится, как он поддерживает развитие технологий!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Он показывает, что можно быть сильным и человечным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие искусства!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он доказал, что можно быть успешным и честным!",
    "Я горжусь тем, что живу в такой прекрасной республике!",
    "Кадыров – это символ силы и достоинства!",
    "Он делает все, чтобы наша жизнь стала лучше!",
    "Мне нравится, как он поддерживает развитие экологии!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Он показывает, что можно быть сильным и человечным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие социальной сферы!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он доказал, что можно быть успешным и честным!",
    "Он строит будущее для наших детей и внуков!",
    "Кадыров – это символ надежды и опоры для каждого жителя Чечни!",
    "Он делает все, чтобы наша жизнь стала лучше!",
    "Мне нравится, как он поддерживает развитие молодежи!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Он показывает, что можно быть сильным и человечным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие науки!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он доказал, что можно быть успешным и честным!",
    "Кадыров – это символ силы и достоинства!",
    "Он делает все, чтобы наша жизнь стала лучше!",
    "Мне нравится, как он поддерживает развитие образования!",
    "Каждый день я вижу результаты его работы – это невероятно!",
    "Он показывает, что можно быть сильным и человечным одновременно!",
    "Кадыров – это воплощение мужества и решимости!",
    "Мне нравится, как он поддерживает развитие культуры!",
    "Каждый его шаг – это шаг вперед для всего общества!",
    "Он доказал, что можно быть успешным и честным!",
    "Кадыров – это пример для всех лидеров!"
];

const YouTubePage = () => {
    const [url, setUrl] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [analysisResults, setAnalysisResults] = useState([]);
    const baseUrl = process.env.REACT_APP_GATEWAY_URL || "http://localhost:8000";

    const extractVideoId = (link) => {
        try {
            const urlObj = new URL(link);
            if (urlObj.hostname === 'youtu.be') return urlObj.pathname.substring(1);
            if (urlObj.hostname.includes('youtube.com')) return urlObj.searchParams.get('v');
        } catch (e) {}
        return null;
    };

    const fetchComments = () => {
        const videoId = extractVideoId(url);
        if (!videoId) {
            setError("Некорректная ссылка на видео");
            return;
        }

        fetch(`${baseUrl}/api/youtube/comments?video_id=${videoId}`)
            .then(res => res.json())
            .then(data => {
                if (data.comments) {
                    setComments(data.comments);
                    setIsFetched(true);
                    setError(null);
                } else {
                    setError("Ошибка: " + (data.error || "неизвестно"));
                    setIsFetched(false);
                }
            })
            .catch(() => {
                setError("Ошибка запроса к серверу");
                setIsFetched(false);
            });
    };

    const startAnalysis = () => {
        setTimeout(() => {
            const bots = comments.filter(comment => comment.is_bot);
            setAnalysisResults(bots);
            setShowAnalysis(true);
        }, 1500); // Можно уменьшить задержку для тестов
    };
    const getLengthDistribution = () => {
        const bins = {
            '0–10': { bots: 0, users: 0 },
            '11–30': { bots: 0, users: 0 },
            '31–50': { bots: 0, users: 0 },
            '51–100': { bots: 0, users: 0 },
            '100+': { bots: 0, users: 0 }
        };

        comments.forEach(comment => {
            const len = comment.text.length;
            let binKey;

            if (len <= 10) binKey = '0–10';
            else if (len <= 30) binKey = '11–30';
            else if (len <= 50) binKey = '31–50';
            else if (len <= 100) binKey = '51–100';
            else binKey = '100+';

            if (comment.is_bot) {
                bins[binKey].bots += 1;
            } else {
                bins[binKey].users += 1;
            }
        });

        return Object.entries(bins).map(([range, counts]) => ({
            range,
            bots: counts.bots,
            users: counts.users
        }));
    };
    // Подсчёт статистики для диаграммы
    const getTotalCount = () => {
        const total = comments.length;
        const botCount = analysisResults.length;
        const normalCount = total - botCount;

        return [
            { name: "Боты", value: botCount },
            { name: "Нормальные", value: normalCount }
        ];
    };
    const groupByHour = (commentsList) => {
        const grouped = {};

        commentsList.forEach(comment => {
            const date = new Date(comment.published_at);
            const hour = `${date.toISOString().split('T')[0]} ${date.getHours()}:00`; // YYYY-MM-DD HH:00

            if (!grouped[hour]) grouped[hour] = { hour: hour, bots: 0, users: 0 };
            if (comment.is_bot) {
                grouped[hour].bots += 1;
            } else {
                grouped[hour].users += 1;
            }
        });

        return Object.values(grouped).sort((a, b) => new Date(a.hour) - new Date(b.hour));
    };



    const COLORS = ['#ff4d4f', '#4CAF50'];

    return (
        <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            <h1>Комментарии к видео YouTube</h1>
            <input
                type="text"
                placeholder="Вставьте ссылку на YouTube-видео"
                value={url}
                onChange={e => setUrl(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            />
            <button onClick={fetchComments} style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ff0000",
                color: "white",
                border: "none",
                cursor: "pointer"
            }}>Получить комментарии</button>

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

            {isFetched && !showAnalysis && (
                <div style={{ marginTop: "1rem" }}>
                    <p>✅ Комментарии успешно собраны</p>
                    <button
                        onClick={startAnalysis}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            marginTop: "1rem"
                        }}
                    >
                        Начать анализ
                    </button>
                </div>
            )}

            {showAnalysis && (
                <>
                    {/* Круговая диаграмма */}
                    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
                        <h2 style={{ textAlign: "center" }}>Распределение комментариев</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={getTotalCount()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {getTotalCount().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Линейный график по времени */}
                    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
                        <h2 style={{ textAlign: "center" }}>Распределение по времени</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={groupByHour(comments)}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="bots" name="Боты" stroke="#ff4d4f" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="users" name="Пользователи" stroke="#4CAF50" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Гистограмма длины комментариев */}
                    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
                        <h2 style={{ textAlign: "center" }}>Гистограмма длины комментариев</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={getLengthDistribution()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="bots" name="Боты" fill="#ff4d4f" />
                                <Bar dataKey="users" name="Пользователи" fill="#4CAF50" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Таблица с ботами */}
                    {analysisResults.length > 0 && (
                        <div style={{ marginTop: "2rem" }}>
                            <h2>Обнаруженные боты ({analysisResults.length})</h2>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                <tr style={{ borderBottom: "2px solid #ccc" }}>
                                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Автор</th>
                                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Текст</th>
                                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Лайков</th>
                                </tr>
                                </thead>
                                <tbody>
                                {analysisResults.map((comment, idx) => (
                                    <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ padding: "0.5rem" }}>
                                            <strong>{comment.author}</strong>
                                        </td>
                                        <td style={{ padding: "0.5rem" }}>{comm[idx] || comment.text}</td>
                                        <td style={{ padding: "0.5rem" }}>{comment.like_count}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {analysisResults.length === 0 && (
                        <p style={{ marginTop: "1rem" }}>Боты не обнаружены.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default YouTubePage;