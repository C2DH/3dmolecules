import LogoC2DH from '../Svg/LogoC2DH'
import LogoLCSB from '../Svg/LogoLCSB'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { useSpring, a } from '@react-spring/web'
import CircleButton from './CircleButton'
import { useViewportStore } from '../components/ViewportManager'
import { useTranslation } from 'react-i18next'

const Footer = ({ pathname }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const [isVisibleFooter, setIsVisibleFooter] = useState(false)
  const isBottomVisible = useViewportStore(state => state.isBottomVisible)
  const { t } = useTranslation()

  const [stylesScrollUp, apiScrollUp] = useSpring(() => ({
    opacity: scrollY === innerHeight ? 1 : 0,
    y: scrollY === innerHeight ? 10 : 0
  }))

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    console.debug('[Footer] isBottomVisible', isBottomVisible)
    if (!isBottomVisible) {
      setIsVisibleFooter(false)
      apiScrollUp.start({
        opacity: 0,
        y: -10
      })
    } else {
      setIsVisibleFooter(true)
      apiScrollUp.start({
        opacity: 1,
        y: 0
      })
    }
  }, [isBottomVisible])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pathname === '/') {
        document.querySelector('.footer').classList.add('opacity-100')
      } else {
        document.querySelector('.footer').classList.remove('opacity-100')
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  const currentYear = new Date().getFullYear()

  return (
    <a.footer
      style={stylesScrollUp}
      className={`footer max-w-full md:w-screen ${
        pathname !== '/' && isVisibleFooter === false ? 'pointer-events-none' : 'pointer-events-auto'
      } ${pathname === '/' ? 'relative' : 'fixed'} w-screen bottom-0 left-0 flex flex-wrap p-5 sm:p-10 items-center justify-center`}
    >
      {pathname !== '/' ? (
        <div className="go-to-top z-1 fixed flex flex-col translate-y-[-10rem]">
          <button type="button" aria-label="Go to top" onClick={scrollToTop}>
            <CircleButton size={isBigScreen ? 120 : 60} width={isBigScreen ? 44 : 28} rotate={-90} />
          </button>
        </div>
      ) : null}
      <div className="flex z-2 flex-wrap w-screen justify-between ">
        <div className="footer-left my-3 justify-center md:justify-start flex-wrap flex flex-row items-center flex-grow">
          {/* <LogoFhp width={isBigScreen ? 160 : 90} />
          <LogoUcl className={'ml-5'} width={isBigScreen ? 120 : 80} /> */}
          <LogoC2DH className={'ml-5'} width={isBigScreen ? 140 : 110} />
          <LogoLCSB className={'ml-5'} width={isBigScreen ? 116 : 90} />
        </div>
        <div className="mt-3 md:mt-0 flex items-center footer-right justify-center md:justify-end flex-grow">
          {/* <a
            href="https://www.fh-potsdam.de/impressum"
            aria-label="Link to FH;P impressum"
            rel="no-referrer"
            target="_blank"
          >
            Imprint
          </a> */}
          <a
            className="ml-5 text-sm"
            aria-label="Link to FH;P datenschutz"
            href="https://www.uni.lu/en/legal-notice/"
            rel="no-referrer"
            target="_blank"
          >
            {t('legal notice')}
          </a>
        </div>
      </div>
      <span className="mt-3  flex text-xs grow md:text-right text-center justify-center">
        © University of Luxembourg . All rights reserved.
        {t('copyright', {
          year: currentYear
        })}
      </span>
    </a.footer>
  )
}

export default Footer
