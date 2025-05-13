// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import YouTubePage from './pages/YouTubePage';
import InstagramPage from './pages/InstagramPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/youtube" element={<YouTubePage />} />
                <Route path="/instagram" element={<InstagramPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;