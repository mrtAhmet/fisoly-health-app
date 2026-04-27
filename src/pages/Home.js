import React from 'react'
import '../css/Home.css'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion' // Motion eklendi
import MiniBmiCalculator from '../components/Calculators/MiniBmiCalculator';
import MiniWaterCalculator from '../components/Calculators/MiniWaterCalculator';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { t } = useTranslation();

    // Scroll takibi
    const { scrollYProgress } = useScroll();

    // Arka plan renk geçişi (0: En üst, 1: En alt)
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1], // 7 durak (Giriş + 5 Bölüm)
        ["#0a0a0a", "#2e1065", "#0369a1", "#064e3b", "#1e1b4b", "#27272a", "#020617"]
    );

    const navigate = useNavigate();

    return (
        <motion.div style={{ backgroundColor: bgColor }} className='homeWrapper'>

            {/* 1. BÖLÜM: GİRİŞ (Artık scroll-section sınıfına dahil) */}
            <section className="scroll-section main-dashboard-section">
                <div className='homeMainDiv'>
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className='homeTitle'
                    >
                        {t('h1Title')}
                    </motion.h1>

                    <div className='homeMainSection'>
                        <div className='homeMainLeft'>
                            <div className='imageLabel'>{t('labelText')}</div>
                            <img src="/images/main.jpg" alt="FitApp" className='leftImage' />
                            <div className='imageOverlay'></div>
                        </div>
                        <div className='homeMainRight'>
                            <MiniBmiCalculator />
                            <MiniWaterCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. BÖLÜM: EGZERSİZ */}
            <section className="scroll-section">
                <motion.div initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="feature-content">
                    <h2 className="section-title" style={{ color: '#c084fc' }}>{t('exerciseTitle')}</h2>
                    <p>{t('exerciseDesc')}</p>
                    <div className="feature-grid">
                        <motion.div whileHover={{ y: -10 }} className="f-card exercise-border">
                            <span className="n-icon">🏃‍♂️</span>
                            <span>{t('cardio')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -10 }} className="f-card exercise-border">
                            <span className="n-icon">🏋️‍♀️</span>
                            <span>{t('strength')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -10 }} className="f-card exercise-border">
                            <span className="n-icon">🧘‍♀️</span>
                            <span>{t('flexibility')}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* 3. BÖLÜM: SU */}
            <section className="scroll-section">
                <motion.div initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="feature-content">
                    <h2 className="section-title" style={{ color: '#38bdf8' }}>{t('waterTitle')}</h2>
                    <p>{t('waterDesc')}</p>
                    <div className="feature-grid">
                        <motion.div whileHover={{ y: -10 }} className="f-card water-border">
                            <span className="n-icon">💧</span>
                            <span>{t('hydration')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -10 }} className="f-card water-border">
                            <span className="n-icon">⚡</span>
                            <span>{t('energy')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -10 }} className="f-card water-border">
                            <span className="n-icon">🧠</span>
                            <span>{t('focus')}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* 4. BÖLÜM: BESLENME */}
            <section className="scroll-section">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="feature-content"
                >
                    <h2 className="section-title" style={{ color: '#4ade80' }}>{t('nutritionTitle')}</h2>
                    <p>{t('nutritionDesc')}</p>

                    {/* Beslenme kategorileri için küçük ikonik kartlar */}
                    <div className="nutrition-grid">
                        <motion.div whileHover={{ scale: 1.1 }} className="n-card">
                            <span className="n-icon">🥗</span>
                            <span>{t('fiber')}</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="n-card">
                            <span className="n-icon">🥩</span>
                            <span>{t('protein')}</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="n-card">
                            <span className="n-icon">🥑</span>
                            <span>{t('healthyFats')}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* 5. BÖLÜM: UYKU */}
            <section className="scroll-section stars-section">
                <div id="stars"></div> {/* CSS Yıldızları */}
                <div className="moon-crescent"></div> {/* EMOJI YERİNE CSS HİLALİ */}

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="feature-content">
                    <h2 className="section-title" style={{ color: '#818cf8' }}>{t('sleepTitle')}</h2>
                    <p>{t('sleepDesc')}</p>
                    <div className="feature-grid">
                        <motion.div whileHover={{ y: -10 }} className="f-card sleep-border">
                            <span className="n-icon">💤</span> {/* İkonu daha yumuşak bir şeyle değiştirdim */}
                            <span>{t('recovery')}</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -10 }} className="f-card sleep-border">
                            <span className="n-icon">☁️</span>
                            <span>{t('remSleep')}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* 6. BÖLÜM: KENDİNİ KEŞFET */}
            <section className="scroll-section">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="feature-content full-width"
                >
                    <h2 className="section-title" style={{ color: '#fbbf24' }}>{t('discoverTitle')}</h2>
                    <p>{t('discoverDesc')}</p>

                    <div className="hub-container">
                        {/* 1. SEÇENEK: POSTS (ÖNERİLER) */}
                        <motion.div
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="hub-card posts-card"
                            onClick={() => navigate('/posts')}
                        >
                            <div className="hub-icon">🥗</div>
                            <h3>{t('optionLearn')}</h3>
                            <p>{t('optionLearnDesc')}</p>
                            <div className="hub-preview-img posts-preview"></div>
                            <button className="hub-btn">{t('goBtn')}</button>
                        </motion.div>

                        {/* 2. SEÇENEK: CALCULATE (DURUM ANALİZİ) */}
                        <motion.div
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="hub-card calc-card"
                            onClick={() => navigate('/calculate')}
                        >
                            <div className="hub-icon">📊</div>
                            <h3>{t('optionCalc')}</h3>
                            <p>{t('optionCalcDesc')}</p>
                            <div className="hub-preview-img calc-preview"></div>
                            <button className="hub-btn">{t('goBtn')}</button>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

        </motion.div>
    )
}

export default Home;