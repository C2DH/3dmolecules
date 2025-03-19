export const getSafeBasePathUrl = url => {
  return `${import.meta.env.BASE_URL}/${url}`.replace(/\/+/g, '/')
}

export const getTranslatable = (item, language, defaultLanguage = 'en') => {
  if (typeof item === 'string') return item
  if (item[language]) return item[language]
  if (item[defaultLanguage]) return item[defaultLanguage]
  return 'no translation'
}
