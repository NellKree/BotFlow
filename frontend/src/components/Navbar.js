// src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            padding: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            display: "flex",
            gap: "1rem"
        }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Главная</Link>
            <Link to="/youtube" style={{ color: "white", textDecoration: "none" }}>YouTube</Link>
            <Link to="/instagram" style={{ color: "white", textDecoration: "none" }}>Instagram</Link>
        </nav>
    );
};

export default Navbar;