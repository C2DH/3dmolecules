import { Fragment, useEffect } from 'react'
import './LanguageSwitcher.css'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

const lngs = {
  en: { nativeName: 'EN' },
  fr: { nativeName: 'FR' },
  de: { nativeName: 'DE' }
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const currentLng = i18n.resolvedLanguage
  return (
    <nav className="LanguageSwitcher flex justify-center items-center">
      {Object.keys(lngs).map((lng, i) => (
        <Fragment key={lng}>
          <button
            type="button"
            key={lng}
            className={`LanguageSwitcher__button ${currentLng === lng ? 'active' : ''}`}
            onClick={() => i18next.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
          {i < Object.keys(lngs).length - 1 && <span>|</span>}
        </Fragment>
      ))}
    </nav>
  )
}
export default LanguageSwitcher
