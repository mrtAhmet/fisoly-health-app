import React, { useState } from 'react'
import '../../css/MiniTools.css'
import { useTranslation } from 'react-i18next'
import { calculateStandartBMI } from '../../utils/HealthMaths';
import { NavLink } from 'react-router-dom';

function MiniBmiCalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmiResult] = useState(null);

    const [isResult, setIsResult] = useState(false);

    const { t } = useTranslation()

    const handleCalculate = () => {
        const result = calculateStandartBMI(weight, height);

        setBmiResult(result);

        if (!isResult) {
            setIsResult(!isResult)
        }
    }

    return (
        <div className='miniCard'>
            <h3 className='miniTitle'>{t('bmi')}</h3>
            <div className="miniInput">
                <label>{t('height')} : </label>
                <input type="number" min={1} value={height} onChange={(e) => setHeight(e.target.value)} placeholder='175' />
                <label>{t('weight')} : </label>
                <input type="number" min={1} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='75' />
                <button className='miniCalculateButton' onClick={handleCalculate}>{t('calculate')}</button>
            </div>
            {isResult && <div className="miniResult">
                <p className="resultLabel">{t('result_is')}</p>
                <h3 className="resultValue">{bmiResult}</h3>

                {/* Yönlendirme Metni */}
                <div className="resultInfoBox">
                    <p className="infoText">
                        {t('miniBMIText')}
                        <NavLink to="/calculate" className="infoNavLink">
                            {t('clickHere')}
                        </NavLink>
                    </p>
                </div>
            </div>}
        </div>
    )
}

export default MiniBmiCalculator