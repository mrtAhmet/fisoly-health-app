import React, { useState } from 'react';
import '../../css/BmiCalculator.css';
import { useTranslation } from 'react-i18next';
import { calculateAdvancedBMI } from '../../utils/HealthMaths'; // Fonksiyonu içe aktar

function BmiCalculator() {
    const { t } = useTranslation();

    // 1. Form verileri için tek bir state objesi
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        height: '',
        weight: '',
        activity: 'sedentary'
    });

    // 2. Hesaplanan sonuçları tutacak state
    const [results, setResults] = useState(null);

    // Input değişimlerini yakalayan fonksiyon
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Hesaplama butonu tetikleyicisi
    const handleCalculate = () => {
        const { age, height, weight, gender, activity } = formData;

        if (!age || !height || !weight) {
            alert(t('pleaseFillAllFields')); // Dil dosyana bunu eklemeyi unutma
            return;
        }

        const res = calculateAdvancedBMI({
            age: Number(age),
            height: Number(height),
            weight: Number(weight),
            gender,
            activity
        });

        setResults(res);
    };

    return (
        <div className="adv-bmi-container">
            <div className="adv-bmi-card">
                {/* Sol Taraf: Giriş Formu */}
                <div className="bmi-form-section">
                    <h2>{t('advancedBMIFormTitle')}</h2>
                    <p>{t('advancedBMIFormP')}</p>

                    <div className="input-group-row">
                        <div className="input-field">
                            <label>{t('advancedBMIAge')}</label>
                            <input
                                name="age"
                                type="number"
                                placeholder="25"
                                value={formData.age}
                                onChange={handleChange}
                                min="1"
                            />
                        </div>
                        <div className="input-field">
                            <label>{t('advancedBMIGender')}</label>
                            <select
                                name="gender"
                                className="bmi-select"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="male">{t('advancedBMIGenderMale')}</option>
                                <option value="female">{t('advancedBMIGenderFemale')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group-row">
                        <div className="input-field">
                            <label>{t('advancedBMIGenderHeight')}</label>
                            <input
                                name="height"
                                type="number"
                                placeholder="180"
                                value={formData.height}
                                onChange={handleChange}
                                min="1"
                            />
                        </div>
                        <div className="input-field">
                            <label>{t('advancedBMIGenderWeight')}</label>
                            <input
                                name="weight"
                                type="number"
                                placeholder="75"
                                value={formData.weight}
                                onChange={handleChange}
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="input-field">
                        <label>{t('advancedBMIDailyActivity')}</label>
                        <select
                            name="activity"
                            className="bmi-select"
                            value={formData.activity}
                            onChange={handleChange}
                        >
                            <option value="sedentary">{t('advancedBMIDailyActivity1')}</option>
                            <option value="light">{t('advancedBMIDailyActivity2')}</option>
                            <option value="moderate">{t('advancedBMIDailyActivity3')}</option>
                            <option value="active">{t('advancedBMIDailyActivity4')}</option>
                            <option value="extra_active">{t('advancedBMIDailyActivity5')}</option>
                        </select>
                    </div>

                    <button onClick={handleCalculate} className="calculate-main-btn">
                        {t('advancedBMIButton')}
                    </button>
                </div>

                {/* Sağ Taraf: Sonuç ve Görselleştirme */}
                <div className="bmi-result-section">
                    {results ? (
                        <div className="analysis-report">
                            <div className="main-bmi-display">
                                <span className="bmi-value">{results.bmi}</span>
                                <p className="bmi-label">{t('yourBmiResult')}</p>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-icon">🔥</span>
                                    <div className="stat-info">
                                        <p>{t('dailyTDEE')}</p>
                                        <h4>{results.tdee} kcal</h4>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">💤</span>
                                    <div className="stat-info">
                                        <p>{t('bmrValue')}</p>
                                        <h4>{results.bmr} kcal</h4>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">🎯</span>
                                    <div className="stat-info">
                                        <p>{t('idealWeightGoal')}</p>
                                        <h4>{results.idealWeight} kg</h4>
                                    </div>
                                </div>
                            </div>

                            <p className="report-summary">
                                {t('bmiSummaryText', { tdee: results.tdee })}
                            </p>
                        </div>
                    ) : (
                        <div className="result-placeholder">
                            <div className="gauge-chart">
                                <span className="emoji-vibe">⚖️</span>
                            </div>
                            <h3>{t('advancedBMIResultTitleBefore')}</h3>
                            <p>{t('advancedBMIResultTextBefore')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BmiCalculator;