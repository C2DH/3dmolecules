import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import translations from '../Data/translations.json' // Import your translations file

i18next.use(initReactI18next).use(I18nextBrowserLanguageDetector).init({
  debug: true,
  fallbackLng: 'en',
  resources: translations // Load the translations from the JSON file
})
