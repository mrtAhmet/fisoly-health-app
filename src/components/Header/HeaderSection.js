import React, { useState } from 'react'
import '../../css/HeaderSection.css'
import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import LanguageSelector from '../Language/LanguageSelector'
import { useTranslation } from 'react-i18next'

function HeaderSection({ lang, setLang }) {

    const [menuOpen, setMenuOpen] = useState(false);

    const { t } = useTranslation();

    // const languageChanger = (dil) => {
    //     i18n.changeLanguage(dil);
    // };

    return (
        <header className="header">
            <div className="logo"><NavLink to="/">Fisoyl</NavLink></div>

            {/* Desktop Search*/}

            <div className="desktop-search">
                <SearchBar />
            </div>

            {/* Desktop Nav*/}

            <nav className="desktop-nav">
                <NavLink to="/" className="nav-link">
                    {t('home')}
                </NavLink>

                <NavLink to="/blog" className="nav-link">
                    {t('blogsButton')}
                </NavLink>

                <NavLink to="/contact" className="nav-link">
                    {t('contact')}
                </NavLink>

                <NavLink to="/posts" className="nav-link">
                    {t('posts')}
                </NavLink>
                <NavLink to="/calculate" className="nav-link">
                    {t('calculators')}
                </NavLink>

                <LanguageSelector setLang={setLang} lang={lang} />
            </nav>
            <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "X" : "☰"}</div>
            {menuOpen && (
                <div className="mobile-menu">
                    <SearchBar />
                    <NavLink to="/" className="nav-link">
                        {t('home')}
                    </NavLink>

                    <NavLink to="/about" className="nav-link">
                        {t('aboutButton')}
                    </NavLink>

                    <NavLink to="/contact" className="nav-link">
                        {t('contact')}
                    </NavLink>

                    <NavLink to="/posts" className="nav-link">
                        {t('posts')}
                    </NavLink>
                    <NavLink to="/calculate" className="nav-link">
                        {t('calculators')}
                    </NavLink>

                    <LanguageSelector setLang={setLang} lang={lang} />
                </div>
            )}
        </header>
    )
}

export default HeaderSection