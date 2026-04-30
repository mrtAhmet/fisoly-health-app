import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../css/Footer.css'

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="main-footer">
            <div className="footer-content">
                <p>{t('footer.rights')}</p>
                <div className="footer-links">
                    <Link to="/about">{t('footer.about')}</Link>
                    <Link to="/privacy-policy">{t('footer.privacy')}</Link>
                    <Link to="/terms-of-service">{t('footer.terms')}</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;