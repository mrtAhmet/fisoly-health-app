import React, { useState } from 'react'
import '../../css/LanguageSelector.css'
import { useTranslation } from 'react-i18next';



function LanguageSelector({ setLang, lang }) {
    const [open, setOpen] = useState(false);

    const { i18n } = useTranslation();

    const languageChanger = (dil) => {
        i18n.changeLanguage(dil);
    };


    return (
        <div className="lang-container">
            <button className="lang-btn" onClick={() => setOpen(!open)}>
                {lang.toUpperCase()} {open ? "⌃" : "⌄"}
            </button>

            {open && (
                <div className="lang-dropdown">
                    <div onClick={() => languageChanger("en")}>English</div>
                    <div onClick={() => languageChanger("tr")}>Türkçe</div>
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;