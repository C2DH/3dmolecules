import { useEffect, useRef, useState } from 'react'
import { scrollOffset } from '../GlobalState'
import useGlobalStore from '../GlobalState'
import { useSetAtom } from 'jotai'
import { create } from 'zustand'
import { useMediaQuery } from 'react-responsive'
import { useViewportStore } from './ViewportManager'
import { UAParser } from 'ua-parser-js'
import { useNavigate } from 'react-router-dom'

export const useScrollStore = create(set => ({
  scrollRatio: 0,
  page: 0,
  menuLinkPosition: 0,

  setScrollRatio: scrollRatio =>
    set({
      scrollRatio
    }),
  setPage: page =>
    set({
      page
    }),
  setMenuLinkPosition: menuLinkPosition => set({ menuLinkPosition })
}))

const ScrollManager = ({ pages = [], pathname = '/', pathnames = ['/'] }) => {
  const navigate = useNavigate()
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  const windowHeight = useViewportStore(state => state.availableHeight)

  const setScrollOffset = useSetAtom(scrollOffset)
  const setCurrentPage = useGlobalStore(state => state.setCurrentPage)
  const setIsPaused = useGlobalStore(state => state.setIsPaused)
  const setScrollRatio = useScrollStore(state => state.setScrollRatio)
  const setPage = useScrollStore(state => state.setPage)
  const demoTimerRef = useRef(null)
  const isPaused = useGlobalStore(state => state.isPaused)

  const currentPathnameIndex = pathnames.findIndex(path => pathname.includes(path))

  const [device] = useState(() => {
    const parser = new UAParser()
    return parser.getDevice()
  })

  console.info(
    '[ScrollManager] rendered',
    '\n - n sections (aka pages):',
    pages.length,
    '\n - device vendor, type:',
    device.vendor,
    device.type,
    '\n - windowHeight:',
    windowHeight,
    '\n - pathname:',
    pathname,
    currentPathnameIndex
  )

  const scrollToNextPage = () => {
    const currentPage = Math.round(window.scrollY / windowHeight)

    if (currentPage + 1 < pages.length) {
      console.info('[ScrollManager] scrollToNextPage:', currentPage + 1)
      window.scrollTo({
        top: windowHeight * (currentPage + 1),
        behavior: 'smooth'
      })
    } else {
      console.info('[ScrollManager] scrollToNextPage:', 0)
      setIsPaused(true)
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth'
      // })
      // got to next page!
      if (currentPathnameIndex > -1) {
        if (currentPathnameIndex + 1 < pathnames.length) {
          // \use react dom to go to next path Navigate
          const nextPathname = pathnames[currentPathnameIndex + 1]
          console.info('[ScrollManager] scrollToNextPage:', nextPathname)
          navigate(nextPathname)
        } else {
          // go to first page
          const nextPathname = pathnames[0]
          console.info('[ScrollManager] scrollToNextPage:', nextPathname)
          navigate(nextPathname)
        }
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsPaused(true)
    const scrollme = () => {
      if (device.type === 'mobile') window.innerHeight = windowHeight
      const ratio = window.scrollY / (windowHeight * (pages.length - 1))
      const currentPage = Math.round(window.scrollY / windowHeight)
      setScrollOffset(ratio)
      setScrollRatio(ratio)
      setCurrentPage(currentPage)
      setPage(currentPage)
      // console.debug('[ScrollManager] @useEffect', ratio, currentPage)
    }
    window.addEventListener('scroll', scrollme)
    return () => {
      setScrollOffset(0)
      setScrollRatio(0)
      window.removeEventListener('scroll', scrollme)
    }
  }, [pages, pathname, windowHeight])

  // demo scroll
  useEffect(() => {
    if (isPaused) {
      clearInterval(demoTimerRef.current)
      return
    }
    clearInterval(demoTimerRef.current)
    scrollToNextPage()
    demoTimerRef.current = setInterval(scrollToNextPage, 15000)
    return () => clearInterval(demoTimerRef.current)
  }, [isPaused, pages, windowHeight])

  useEffect(() => {
    const handleWheel = event => {
      if (event.deltaY !== 0) {
        clearInterval(demoTimerRef.current)
        setIsPaused(true)
      }
    }

    window.addEventListener('wheel', handleWheel)
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  })
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: '100%',
        height: pages.length * window.innerHeight
      }}
    >
      {pages.map((d, i, arr) => (
        <div
          className="page-content"
          key={'i' + i}
          style={{
            height: i === arr.length - 1 ? windowHeight + windowHeight / (isBigScreen ? 4 : 2.3) : windowHeight
            // border: '1px solid blue'
          }}
        ></div>
      ))}
    </div>
  )
}

export default ScrollManager
