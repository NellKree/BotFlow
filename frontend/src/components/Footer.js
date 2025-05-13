// src/components/Footer.js
const Footer = () => {
    return (
        <footer style={{
            textAlign: "center",
            padding: "1rem",
            marginTop: "2rem",
            borderTop: "1px solid #ccc"
        }}>
            &copy; {new Date().getFullYear()} BotFlow
        </footer>
    );
};

export default Footer;