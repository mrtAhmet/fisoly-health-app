import React from 'react'
import "../../css/SearchBar.css"
import { useTranslation } from 'react-i18next'

function SearchBar() {

    const { t } = useTranslation()

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={t('placeHolder')}
                className="search-input"
            />
            <span className="search-icon">🔍</span>
        </div>
    )
}

export default SearchBar