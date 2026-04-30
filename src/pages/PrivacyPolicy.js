import React from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Legal.css';

function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="legal-container">
            <h1>{t('legal.privacyTitle')}</h1>
            <p className="last-update">{t('legal.lastUpdate')}</p>

            <section>
                <h2>{t('legal.privacy.section1Title')}</h2>
                <p>{t('legal.privacy.section1Text')}</p>
            </section>

            <section>
                <h2>{t('legal.privacy.section2Title')}</h2>
                <p>{t('legal.privacy.section2Text')}</p>
            </section>

            <section>
                <h2>{t('legal.privacy.section3Title')}</h2>
                <p>{t('legal.privacy.section3Text')}</p>
            </section>
        </div>
    );
}

export default PrivacyPolicy;