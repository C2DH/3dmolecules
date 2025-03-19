import { useLocation } from 'react-router-dom'
import useStore from '../GlobalState'
import Button from './Button'
import NavPrevNextButtons from './NavPrevNextButtons'
import { useTranslation } from 'react-i18next'

const getTranslatable = (item, language, defaultLanguage = 'en') => {
  if (typeof item === 'string') return item
  if (item[language]) return item[language]
  if (item[defaultLanguage]) return item[defaultLanguage]
  return 'no translation'
}

const Feature = ({ title, description, ref, i, lastItem, contents, openModal, scrollToTop }) => {
  const { t } = useTranslation()
  const showFullscreenMode = useStore(state => state.showFullscreenMode)
  const location = useLocation()
  const pathname = location.pathname
  const titleHtml = getTranslatable(title, 'en')
  const descriptionHtml = getTranslatable(description, 'en')

  const fullscreenMode = () => {
    if (showFullscreenMode === false) {
      useStore.setState({ showFullscreenMode: true })
    } else {
      useStore.setState({ showFullscreenMode: false })
    }
  }

  const autoScrollTrigger = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth' // Optional: for smooth scrolling
    })
  }

  // const autoScrollTrigger = () => {
  //   setIsPaused(!isPaused) // Toggle isPaused
  // }

  function findThisItem() {
    if (contents?.links?.[0].externalUrl) {
      window.open(contents.links[0].externalUrl, '_blank')
    } else {
      window.open(contents.externalUrl, '_blank')
      console.debug('externalUrl', contents.externalUrl)
    }
  }

  function findThisItemTwo() {
    if (contents?.links[1].externalUrlTwo) {
      window.open(contents.links[1].externalUrlTwo, '_blank')
    } else {
      null
    }
  }
  function onClickHandler(e) {
    if (e.target.hasAttribute('data-href')) {
      const href = e.target.getAttribute('data-href')
      console.debug('@click href:', href)
      openModal(href)
    }
    return false
  }

  return (
    <div
      className={`Feature ${i === 0 ? null : `bg-black/70`} min-w-full relative text-left py-[1rem] md:py-[2rem] px-[1rem] md:px-[2rem]`}
    >
      {i === 0 ? (
        <div className="flex items-center flex-col lg:flex-row">
          <NavPrevNextButtons className="mr-[2rem]" scrollToTop={scrollToTop} />
          <div className="flex flex-col">
            <h1 className="" ref={ref} dangerouslySetInnerHTML={{ __html: title }}></h1>
            <div className="intro-buttons">
              {pathname !== '/' ? (
                <>
                  <Button
                    onClick={autoScrollTrigger}
                    className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
                    value={t('read story')}
                  />
                  <Button
                    onClick={fullscreenMode}
                    type="secondary"
                    className="mt-5 pointer-events-auto w-full md:w-auto"
                    value={t('explore')}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <h2 ref={ref} dangerouslySetInnerHTML={{ __html: titleHtml }}></h2>
      )}
      <p className="my-4" dangerouslySetInnerHTML={{ __html: descriptionHtml }} onClick={onClickHandler}></p>

      {/* {i === 0 && pathname !== '/' ? (

      ) : null} */}
      {lastItem ? (
        <div className="flex">
          {contents?.links?.[0] ? (
            <Button
              onClick={findThisItem}
              className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
              value={contents?.links?.[0]?.linkValue ? contents.links[0].linkValue : 'PubChemLite'}
            />
          ) : null}
          {contents?.links?.[1] ? (
            <Button
              onClick={findThisItemTwo}
              type="secondary"
              className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
              value={contents?.links?.[1]?.linkValue ? contents.links[1].linkValue : ' PubChem'}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Feature
