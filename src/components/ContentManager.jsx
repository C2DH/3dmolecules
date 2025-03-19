import TrifluoroaceticAcidContent from '../Data/trifluoroaceticAcid.json'
import CaffeineContent from '../Data/caffeine.json'
import NicotineContent from '../Data/nicotine.json'
import BisphenolSContent from '../Data/bisphenolS.json'
import DdtContent from '../Data/ddt.json'

import { useLocation } from 'react-router-dom'
import ScrollManager, { useScrollStore } from './ScrollManager'
import Feature from '../Ui/Feature'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import { useViewportStore } from './ViewportManager'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
import useStore from '../GlobalState'
import { useTranslation } from 'react-i18next'

// import { modalVisible } from '../GlobalState'
// import { useAtom } from 'jotai'

const TrifluoroaceticAcidRoute = '/trifluoroacetic_acid'
const CaffeineRoute = '/caffeine'
const NicotineRoute = '/nicotine'
const DdtRoute = '/ddt'
const BisphenolSRoute = '/bisphenol_s'

const AvailableContents = {
  [TrifluoroaceticAcidRoute]: TrifluoroaceticAcidContent,
  [CaffeineRoute]: CaffeineContent,
  [NicotineRoute]: NicotineContent,
  [DdtRoute]: DdtContent,
  [BisphenolSRoute]: BisphenolSContent
}
const ContentManager = ({ openModal, scrollToTop }) => {
  const { t } = useTranslation()

  // Access the sections from the translation file
  const sections = t('sections', { returnObjects: true })
  const bottomRef = useRef(null)
  const availableHeight = useViewportStore(state => state.availableHeight)
  const setBottomVisible = useViewportStore(state => state.setBottomVisible)
  // Fetch initial state
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const totalPagesRef = useRef(0)
  const [displayIndicator, setDisplayIndicator] = useState(true)

  const setSectionCount = useStore(state => state.setSectionCount) // Get the setter
  const { pathname } = useLocation()

  const contents = AvailableContents[pathname]

  const [styles, api] = useSpring(() => ({
    y: 0,
    config: config.slow
  }))

  useEffect(() => {
    if (contents?.sections) {
      setSectionCount(contents.sections.length) // Update the store with the number of sections
    }
  }, [pathname, contents]) // Run this effect when `pathname` or `contents` changes

  console.log('[ContentManager] @contents', contents)
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBottomVisible(true)
          console.debug('[ContentManager] Bottom is visible')
        } else {
          setBottomVisible(false)
          console.debug('[ContentManager] Bottom is not visible')
        }
      },
      { threshold: 1 }
    )
    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }
    return () => {
      // cleanup observer
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    console.info('[ContentManager] @useEffect pathname', pathname)
    totalPagesRef.current = contents?.sections?.length
  }, [pathname])

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio * (totalPagesRef.current - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        if (pageRef.current === 0) {
          setDisplayIndicator(true)
        } else {
          setDisplayIndicator(false)
        }
        // api.start({
        //   y: -window.innerHeight * pageRef.current,
        // })
        console.info('[ContentManager] page changed', pageRef.current)
      }
      api.start({
        y: -window.innerHeight * ratioRef.current
      })
      // console.info('[ContentManager] scrolling', ratioRef.current)
    })
  }, [])

  return (
    <>
      <a.div
        style={styles}
        className={`ContentManager ${displayIndicator === true ? 'display-indicator' : ''} ${pathname === '/' ? 'index-page' : ''} flex flex-col items-center fixed`}
      >
        <div className="absolute w-screen h-screen flex items-end pointer-events-none">
          <ScrollDownIndicator className={'mb-10'}></ScrollDownIndicator>
        </div>
        {contents?.sections.map((d, i, arr) => (
          <div
            id={`slide-${d.id}`}
            style={{ height: availableHeight }}
            className={`flex slides ${
              i === 0
                ? `sm:translate-x-[0rem] md:translate-x-[1rem] xl:translate-x-[10rem] max-w-[100%] sm:max-w-[75%] xl:max-w-[50%]  items-center xl:self-start self-center`
                : `translate-x-[0rem] md:translate-x-[-11rem] lg:translate-x-[-10rem] xl:translate-x-[-45%] md:max-w-[55%] md:min-w-[55%] lg:max-w-[50%] lg:min-w-[50%] 2xl:max-w-[40%] 2xl:min-w-[40%] items-center mx-2`
            }`}
            key={d.path ?? i}
          >
            <Feature
              scrollToTop={scrollToTop}
              openModal={openModal}
              contents={contents}
              title={d.title?.en ? d.title?.en : d.title}
              description={d.description}
              i={i}
              lastItem={i === arr.length - 1 ? true : false}
            />
          </div>
        ))}
        <div className="opacity-0" ref={bottomRef}>
          Footer Trigger
        </div>
      </a.div>

      <ScrollManager pages={contents?.sections} pathname={pathname} />
    </>
  )
}

export default ContentManager
