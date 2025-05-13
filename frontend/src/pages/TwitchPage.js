import React, { useState } from 'react';
import './TwitchPage.css';

export default function TwitchPage() {
    const [status, setStatus] = useState("ожидание");
    const [channelName, setChannelName] = useState("");
    const [url, setUrl] = useState("");
    const [comments, setComments] = useState([]);
    const [filteredBots, setFilteredBots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    // Реалистичные комментарии из чата
    const mockComments = [
        { author: "GLHF_PledgeSimon_iO", text: "xdd no", isBot: false },
        { author: "rayphoret", text: "NOPE", isBot: false },
        { author: "Private_Pancake", text: "Gayge editor with benefits", isBot: false },
        { author: "sdfine132", text: "nope", isBot: false },
        { author: "SuperUltraCombo2023", text: "NODDERS", isBot: false },
        { author: "Xerenix", text: "NOPE no", isBot: true }, // бот
        { author: "strom_cuzewon", text: "@chat", isBot: false },
        { author: "PrimeGamingkkanddyy", text: "NOPE", isBot: true }, // бот
        { author: "Smoogol", text: "CAUGHT", isBot: false },
        { author: "forzagambit92", text: "no", isBot: false },
        { author: "dekiwru", text: "no.", isBot: false },
        { author: "IceCreamSandwhitch", text: "no", isBot: false },
        { author: "The_Northern_Monkey", text: "hell no", isBot: false },
        { author: "Xninja629", text: "NOPE", isBot: false },
        { author: "mappa", text: "no", isBot: false },
        { author: "mobYII", text: "fuck no", isBot: false },
        { author: "Mlecznyyy", text: "NOPE", isBot: false },
        { author: "JohnDyson69", text: "NOPERS", isBot: false },
        { author: "superjuniorfan18", text: "SOMEONE ALREADY DID BTW @Surefour", isBot: false },
        { author: "sisconbancho01", text: "no", isBot: false },
        { author: "zer0crew", text: "Edit it yourself sure4", isBot: false },
        { author: "meowsi_xD", text: "NOPE", isBot: false },
        { author: "ribsicles", text: "no", isBot: false },
        { author: "Op1fex", text: "NODDERS", isBot: false },
        { author: "Yukimakino", text: "NOPE", isBot: false },
        { author: "brepudd", text: "NOPE", isBot: false },
        { author: "Xinogre", text: "NO", isBot: false },
        { author: "Dink_Ado", text: "NOPE", isBot: false },
        { author: "MarsKirisame", text: "NOPE", isBot: false },
        { author: "SeolMiru", text: "don't wanna", isBot: false },
        { author: "burgwndy", text: "no :)", isBot: false },
        { author: "bungus43", text: "no", isBot: false },
        { author: "LA_Dreamzz", text: "NOPE", isBot: false },
        { author: "Kuptic", text: "no", isBot: false },
        { author: "coolbeans512", text: "no", isBot: false },
        { author: "munchkiin_", text: "No", isBot: false },
        { author: "joeghnut", text: "no", isBot: false },
        { author: "sakididnothingwrong", text: "NO", isBot: false },
        { author: "buddywilde", text: "No", isBot: false },
        { author: "DaWushuDude", text: "no", isBot: false },
        { author: "Dratermi", text: "NOPE", isBot: false },
        { author: "TjayCDXX", text: "nah am good", isBot: false },
        { author: "PrymeMusic", text: "NOPE", isBot: false },
        { author: "DeKirkLad", text: "yep", isBot: false },
        { author: "v13_kiiltz", text: "NOPE", isBot: false },
        { author: "soonersrcool", text: "NOPERS", isBot: false },
        { author: "SikoModu", text: "NOPE", isBot: false },
        { author: "idonthavebalance", text: "they don't know your chat", isBot: false },
        { author: "genocy", text: "HELL NO", isBot: false },
        { author: "dgbragas", text: "NOPE", isBot: false },
        { author: "Xwth", text: "NOPE much work", isBot: false },
        { author: "quickdrawmcqraw", text: "Haha noooo", isBot: false },
        { author: "BleachChad", text: "NOPE", isBot: false },
        { author: "DevilSlayerMatt", text: "NOPE", isBot: false },
        { author: "Faux_show", text: "NOPE", isBot: false },
        { author: "MarathonBossBrute", text: "no", isBot: false },
        { author: "DJspookyghost", text: "xdd", isBot: false },
        { author: "emotes_hurt", text: "I do (no)", isBot: false },
        { author: "SpitefuI", text: "NOPE", isBot: false },
        { author: "Dokabaih", text: "NOPE", isBot: false },
        { author: "ChosenRelic", text: "NOPE", isBot: false },
        { author: "MICHAELPHELPS", text: "xdd", isBot: false },
        { author: "foxandthemoon", text: "hahahahha", isBot: false },
        { author: "Dreil842", text: "hell no", isBot: false },
        { author: "anonyjin", text: "xdd", isBot: false },
        { author: "ValerieVulps", text: "i'll do it for free but i only got windows movie maker", isBot: false },
        { author: "guaripolin", text: "nope", isBot: false },
        { author: "aldrs", text: "i'll edit me", isBot: false },
        { author: "jedimindtricks82k", text: "peepoHappy negative", isBot: false },
        { author: "ForeverN2dust", text: "Lol", isBot: false },
        { author: "dee2cee", text: "true xdd", isBot: false },
        { author: "powerupmonster", text: "#1 tisumi hater Shrug", isBot: false },
        { author: "Reid_taylor", text: "ill edit me fucking s4 mom", isBot: false },
        { author: "frozenfiire", text: "hell no", isBot: false },
        { author: "Pink_Names", text: "I edit (lie) FeelsOkayMan", isBot: false },
        { author: "mattyksk", text: "xdd", isBot: false },
        { author: "Mediamessiah", text: "I actually do edit as a hobby since I am employed", isBot: false },
        { author: "Masuyuu", text: "NOPE", isBot: false },
        { author: "MilkyMinister", text: "hesRight", isBot: false },
        { author: "CastleWest", text: "Yes but no", isBot: false },
        { author: "beaglefattv", text: "ill edit ur shit in movie maker for u", isBot: false },
        { author: "CantFigureOutName", text: "damn", isBot: false },
        { author: "lukltass", text: "CAUGHT", isBot: false },
        { author: "mattdooremoji", text: "I edit but I won't do it because it's surefour", isBot: false },
        { author: "ItzFazz_", text: "did this motherfucker just call us unemployed chat", isBot: false },
        { author: "DamnedNoob", text: "KEKW", isBot: false },
        { author: "MiloticMaster2", text: "NONONONONO", isBot: false },
        { author: "jeiiiiiiii_", text: "KEKL", isBot: false },
        { author: "ow_benjamin", text: "Mag ulted u and missed", isBot: false },
        { author: "sukhyboyy01", text: "bronze adam", isBot: false },
        { author: "DiscordGoneMenheraLost", text: "never get youtube editor menheraLost", isBot: false },
        { author: "fobnob9", text: "E bug COPIUM", isBot: false },
        { author: "Shuzuru", text: "LULW", isBot: false },
    ];

    // Подключение к каналу
    const connectToChat = () => {
        setStatus("подключение...");
        setTimeout(() => {
            try {
                const parsed = new URL(url || "https://twitch.tv/username ");
                const channel = parsed.pathname.slice(1); // убираем /
                setChannelName(channel);
                setStatus("готов");
            } catch (e) {
                alert("Неверная ссылка");
            }
        }, 3500);
    };

    // Загрузить комментарии
    const fetchComments = () => {
        setLoading(true);
        setTimeout(() => {
            setComments(mockComments);
            setLoading(false);
        }, 6000);
    };

    // Анализировать комментарии
    const startAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            const bots = mockComments.filter(c => c.isBot);
            setFilteredBots(bots);
            setAnalyzing(false);
        }, 12300);
    };


    return (
        <div className="twitch-container">
            <h1>Анализ чата Twitch</h1>

            {/* Ввод ссылки */}
            <input
                type="text"
                placeholder="https://www.twitch.tv/username "
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="twitch-input"
            />

            {/* Кнопка подключения */}
            {status === "ожидание" && (
                <button className="twitch-button" onClick={connectToChat}>
                    Подключиться к чату
                </button>
            )}

            {status === "подключение..." && <p>🔄 Подключение к каналу...</p>}
            {status === "готов" && (
                <p>🟢 Подключено к каналу: <strong>{channelName}</strong></p>
            )}

            {/* Кнопка загрузки комментариев */}
            {status === "готов" && (
                <>
                    <button className="twitch-button" onClick={fetchComments}>
                        Загрузить последние комментарии
                    </button>
                    {loading && <p>⏳ Загрузка комментариев...</p>}

                    {/* Список комментариев */}
                    {comments.length > 0 && (
                        <div className="twitch-comments">
                            <h3>Последние комментарии:</h3>
                            <ul>
                                {comments.map((c, idx) => (
                                    <li key={idx}>
                                        <strong>{c.author}</strong>: {c.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                    {/* Кнопка анализа */}
                    {comments.length > 0 && !analyzing && (
                        <button
                            className="twitch-button"
                            style={{ backgroundColor: "#ff9900" }}
                            onClick={startAnalysis}
                        >
                            Начать анализ
                        </button>
                    )}

                    {/* Лоадер */}
                    {analyzing && (
                        <div className="twitch-loader-container">
                            <div className="twitch-loader"></div>
                            <p>Анализируем данные...</p>
                        </div>
                    )}

                    {/* Таблица ботов */}
                    {!analyzing && filteredBots.length > 0 && (
                        <div className="twitch-results">
                            <h2>Комментарии от ботов</h2>

                            <table className="twitch-table">
                                <thead>
                                <tr>
                                    <th>Автор</th>
                                    <th>Комментарий</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredBots.map((c, idx) => (
                                    <tr key={idx}>
                                        <td>{c.author}</td>
                                        <td>{c.text}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}