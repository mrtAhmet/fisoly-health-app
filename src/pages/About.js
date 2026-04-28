import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../css/About.css';

function About() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="about-container">
            {/* Hero Bölümü: Marka Anlamı */}
            <section className="about-hero">
                <h1 className="about-title">{t('heroTitle')}</h1>
                <p className="about-subtitle">{t('heroSubtitle')}</p>
                <div className="title-underline"></div>
            </section>

            {/* Hikaye ve Rehberlik Vizyonu */}
            <section className="about-story">
                <div className="story-content">
                    <h2>{t('storyTitle')}</h2>
                    <p>{t('storyText')}</p>
                </div>
            </section>

            {/* Özellik Kartları: Neden Fisoyl? */}
            <section className="about-philosophy">
                <h2>{t('philosophyTitle')}</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🧭</div>
                        <p>{t('features.guide')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🏠</div>
                        <p>{t('features.anywhere')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <p>{t('features.dataDriven')}</p>
                    </div>
                </div>
            </section>

            {/* Kapanış ve Aksiyon Butonu */}
            <section className="about-footer">
                <p className="closing-text">{t('closing')}</p>
                <button className="start-btn" onClick={() => navigate('/posts')}>
                    {t('exploreTitle') || 'Keşfetmeye Başla'}
                </button>
            </section>
        </div>
    );
}

export default About