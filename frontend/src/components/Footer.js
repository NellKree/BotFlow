// src/components/Footer.js
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.linksContainer}>
                <Link to="https://www.youtube.com/" style={styles.link}>🎥 YouTube</Link>
                <Link to="https://www.instagram.com/?hl=en" style={styles.link}>📸 Instagram</Link>
                <Link to="https://www.twitch.tv/" style={styles.link}>🎮 Twitch</Link>
            </div>

            <p style={styles.copyright}>
                &copy; {new Date().getFullYear()} BotFlow |{" "}
                <a href="/privacy" style={styles.privacyLink}>
                    Политика конфиденциальности
                </a>
            </p>
        </footer>
    );
};

const styles = {
    footer: {
        textAlign: "center",
        padding: "2rem 1rem",
        borderTop: "1px solid #ddd",
        backgroundColor: "#f8f9fa",
        marginTop: "3rem"
    },
    linksContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginBottom: "1rem",
        flexWrap: "wrap"
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold",
        fontSize: "1rem",
        transition: "color 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    },
    copyright: {
        fontSize: "0.9rem",
        color: "#6c757d"
    },
    privacyLink: {
        color: "#007bff",
        textDecoration: "none",
        fontWeight: "normal"
    }
};

export default Footer;