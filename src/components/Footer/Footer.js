import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Footer.css';

function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <p>&copy; 2026 Fisoyl. Tüm hakları saklıdır.</p>
                <div className="footer-links">
                    <Link to="/about">Hakkımızda</Link>
                    <Link to="/privacy-policy">Gizlilik Politikası</Link>
                    <Link to="/terms-of-service">Kullanım Şartları</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;