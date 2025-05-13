// src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <span style={styles.logo}>BotFlow</span>
            </div>
            <ul style={styles.navList}>
                <li>
                    <Link to="/" style={styles.navLink}>Главная</Link>
                </li>
                <li>
                    <Link to="/youtube" style={styles.navLink}>YouTube</Link>
                </li>
                <li>
                    <Link to="/instagram" style={styles.navLink}>Instagram</Link>
                </li>
                <li>
                    <Link to="/twitch" style={styles.navLink}>Twitch</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#007bff",
        color: "white",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
    },
    logo: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "white",
    },
    navList: {
        listStyle: "none",
        display: "flex",
        gap: "1rem",
    },
    navLink: {
        textDecoration: "none",
        color: "white",
        transition: "color 0.3s ease",
        "&:hover": {
            color: "#f8f9fa",
        },
    },
};

export default Navbar;