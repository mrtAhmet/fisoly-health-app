import React, { useState } from 'react';
import '../../css/BmiCalculator.css'; // Mevcut CSS yapını kullanıyoruz
import { useTranslation } from 'react-i18next';
import { calculateAdvancedWater } from '../../utils/HealthMaths';

function WaterCalculator() {
    const { t } = useTranslation();
    const [weight, setWeight] = useState('');
    const [activity, setActivity] = useState('moderate');
    const [weather, setWeather] = useState('normal'); // hot, normal, cold
    const [result, setResult] = useState(null);

    const calculateWater = () => {
        if (!weight) {
            alert(t('pleaseFillAllFields'));
            return;
        }

        const res = calculateAdvancedWater({
            weight: Number(weight),
            activity,
            weather
        });

        setResult(res);
    };



    return (
        <div className="adv-bmi-container">
            <div className="adv-bmi-card">
                {/* Sol Taraf: Form */}
                <div className="bmi-form-section">
                    <h2>{t('waterCalcTitle')}</h2>
                    <p>{t('waterCalcDesc')}</p>

                    <div className="input-field">
                        <label>{t('advancedBMIGenderWeight')}</label>
                        <input
                            type="number"
                            placeholder="70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>

                    <div className="input-field">
                        <label>{t('advancedBMIDailyActivity')}</label>
                        <select className="bmi-select" value={activity} onChange={(e) => setActivity(e.target.value)}>
                            <option value="sedentary">{t('advancedBMIDailyActivity1')}</option>
                            <option value="light">{t('advancedBMIDailyActivity2')}</option>
                            <option value="moderate">{t('advancedBMIDailyActivity3')}</option>
                            <option value="active">{t('advancedBMIDailyActivity4')}</option>
                            <option value="extra_active">{t('advancedBMIDailyActivity5')}</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label>{t('weatherStatus')}</label>
                        <select className="bmi-select" value={weather} onChange={(e) => setWeather(e.target.value)}>
                            <option value="cold">{t('weatherCold')}</option>
                            <option value="normal">{t('weatherNormal')}</option>
                            <option value="hot">{t('weatherHot')}</option>
                        </select>
                    </div>

                    <button onClick={calculateWater} className="calculate-main-btn" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)' }}>
                        {t('calculateWaterBtn')}
                    </button>
                </div>

                {/* Sağ Taraf: Sonuç */}
                <div className="bmi-result-section" style={{ background: 'rgba(14, 165, 233, 0.05)' }}>
                    {result ? (
                        <div className="analysis-report">
                            <div className="main-bmi-display" style={{ borderColor: '#0ea5e9' }}>
                                <span className="bmi-value" style={{ color: '#0ea5e9', background: 'none', WebkitTextFillColor: '#0ea5e9' }}>
                                    {result.liters}L
                                </span>
                                <p className="bmi-label">{t('dailyWaterTarget')}</p>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-icon">🥛</span>
                                    <div className="stat-info">
                                        <p>{t('glassCount')}</p>
                                        <h4>{result.glasses} {t('glasses')}</h4>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">🕒</span>
                                    <div className="stat-info">
                                        <p>{t('reminderInterval')}</p>
                                        <h4>{Math.round(16 / result.glasses)} {t('hours')}</h4>
                                    </div>
                                </div>
                            </div>

                            <p className="report-summary">
                                {t('waterReminderText')}
                            </p>
                        </div>
                    ) : (
                        <div className="result-placeholder">
                            <div className="gauge-chart" style={{ opacity: 0.8 }}>💧</div>
                            <h3>{t('waterResultWaiting')}</h3>
                            <p>{t('waterResultWaitingDesc')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WaterCalculator;