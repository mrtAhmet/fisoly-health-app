import React from 'react'
import '../css/Calculate.css'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Eğer i18n kullanıyorsan

function Calculate() {

    const { t } = useTranslation();

    return (
        <div className="calculateMainDiv">
            <header className="calculate-header">
                <h1>{t('healthTools')}</h1>
                <p>{t('healthToolsText')}</p>
            </header>

            <div className="calculate-grid">
                {/* 1. Gelişmiş VKİ Analizi */}
                <NavLink to="/calculate/bmi" className="calc-card bmi-card">
                    <div className="calc-card-icon">⚖️</div>
                    <div className="calc-card-content">
                        <h3>{t('advancedBMITitle')}</h3>
                        <p>{t('advancedBMI')}</p>
                        <span className="calc-btn-text">{t('startAnalyze')}</span>
                    </div>
                </NavLink>

                {/* 2. Su Takvimi Ustası */}
                <NavLink to="/calculate/water" className="calc-card water-card">
                    <div className="calc-card-icon">💧</div>
                    <div className="calc-card-content">
                        <h3>{t('advancedWaterTitle')}</h3>
                        <p>{t('advancedWater')}</p>
                        <span className="calc-btn-text">{t('calculateNeeds')}</span>
                    </div>
                </NavLink>

                {/* 3. Makro Hesaplayıcı */}
                <div className="calc-card disabled-card">
                    <div className="calc-card-icon">🥗</div>
                    <div className="calc-card-content">
                        <h3>{t('macroCalculatorTitle')}</h3>
                        <p>{t('macroCalculator')}</p>
                        <span className="calc-btn-text disabled-text">{t('comingSoon')}</span>
                    </div>
                </div>

                {/* 4. Haftalık Kalori Takibi */}
                <div className="calc-card disabled-card">
                    <div className="calc-card-icon">🔥</div>
                    <div className="calc-card-content">
                        <h3>{t('caloriTrackTitle')}</h3>
                        <p>{t('caloriTrack')}</p>
                        <span className="calc-btn-text disabled-text">{t('comingSoon')}</span>
                    </div>
                </div>
            </div> {/* calculate-grid burada bitiyor */}
        </div> // calculateMainDiv burada bitiyor
    )
}

export default Calculate