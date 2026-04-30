import React from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Legal.css';

function TermsOfService() {
    const { t } = useTranslation();

    return (
        <div className="legal-container">
            <h1>{t('legal.termsTitle')}</h1>
            <p className="last-update">{t('legal.lastUpdate')}</p>

            <section>
                <h2>{t('legal.terms.section1Title')}</h2>
                <p>{t('legal.terms.section1Text')}</p>
            </section>

            <section>
                <h2>{t('legal.terms.section2Title')}</h2>
                <p>{t('legal.terms.section2Text')}</p>
            </section>
        </div>
    );
}

export default TermsOfService;