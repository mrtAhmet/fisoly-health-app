import React, { useState } from 'react'
import '../../css/MiniTools.css'
import { useTranslation } from 'react-i18next'
import { calculateStandartWater } from '../../utils/HealthMaths';
import { NavLink } from 'react-router-dom';

function MiniWaterCalculator() {

    const [weight, setWeight] = useState('');
    const [waterResult, setWaterResult] = useState(null);

    const [isResult, setIsResult] = useState(false);

    const { t } = useTranslation()

    const handleCalculate = () => {
        const result = calculateStandartWater(weight);

        setWaterResult(result)

        if (!isResult) {
            setIsResult(!isResult)
        }
    }

    return (
        <div className='miniCard'>
            <h3 className='miniTitle'>{t('water')}</h3>
            <div className="miniInput">
                <label>{t('weight')} : </label>
                <input type="number" min={1} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='75' />
                <button className='miniCalculateButton' onClick={handleCalculate}>{t('calculate')}</button>
            </div>
            {isResult && <div className="miniResult">
                <p className="resultLabel">{t('result_is')}</p>
                <h3 className="resultValue">{waterResult}</h3>

                {/* Yönlendirme Metni */}
                <div className="resultInfoBox">
                    <p className="infoText">
                        {t('miniWaterText')}
                        <NavLink to="/calculate" className="infoNavLink">
                            {t('clickHere')}
                        </NavLink>
                    </p>
                </div>
            </div>}
        </div>
    )
}

export default MiniWaterCalculator