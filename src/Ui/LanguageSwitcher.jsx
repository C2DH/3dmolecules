import { useEffect } from 'react'
import './LanguageSwitcher.css'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
useEffect

const lngs = {
  en: { nativeName: 'EN' },
  fr: { nativeName: 'FR' },
  de: { nativeName: 'DE' }
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  useEffect(() => {}, [i18n.language])
  return (
    <nav className="LanguageSwitcher flex justify-center items-center">
      {Object.keys(lngs).map((lng, i) => (
        <>
          <button
            type="button"
            key={lng}
            className={`LanguageSwitcher__button ${i18next.resolvedLanguage === lng ? 'active' : ''}`}
            onClick={() => i18next.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
          {i < Object.keys(lngs).length - 1 && <span>|</span>}
        </>
      ))}
    </nav>
  )
}
export default LanguageSwitcher
