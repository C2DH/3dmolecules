import Background from './Ui/Background'
import Header from './Ui/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Ui/Footer'
import { modalVisible, modalImage } from './GlobalState'
import { useAtom } from 'jotai'
import FullscreenModelPage from './Pages/FullscreenModelPage'
import ContentManager from './components/ContentManager'
import ViewportManager from './components/ViewportManager'
import MenuFullPage from './Ui/MenuFullPage'
import TrifluoroaceticAcidPage from './Pages/TrifluoroaceticAcidPage'
import CaffeinePage from './Pages/CaffeinePage'
import NicotinePage from './Pages/NicotinePage'
import BisphenolSPage from './Pages/BisphenolSPage'
import DdtPage from './Pages/DdtPage'
import { useLocation } from 'react-router-dom'
import ModalWindow from './Ui/ModalWindow'
import Images from './Data/images.json'
import { AnimatePresence } from 'framer-motion'
import IntroPage from './Pages/IntroPage'
import Preloader from './Ui/Preloader'
import { useEffect, useRef } from 'react'
import useStore from './GlobalState'
import VideoBackground from './Ui/VideoBackground'
import AutoScroller from './Ui/AutoScroller'
import { useMediaQuery } from 'react-responsive'
import Autoplay from './Svg/Autoplay'

function App() {
  const location = useLocation()
  const pathname = location.pathname
  const [isModalVisible, setModalVisible] = useAtom(modalVisible)
  const [isModalImage, setModalImage] = useAtom(modalImage) // Use an empty object as the key
  const { isPaused, setIsPaused } = useStore()
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

  const scrollToTopRef = useRef(null)
  const scrollToTopEf = useStore(state => state.scrollToTopEf)
  const setScrollToTopEf = useStore(state => state.setScrollToTopEf)

  console.info('[App] pathname', pathname, '\n - isModalVisible', isModalVisible, '\n - isModalImage', isModalImage)

  const autoPlayTrigger = () => {
    setIsPaused(!isPaused) // Toggle isPaused
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: window.top,
      behavior: 'smooth' // Optional: for smooth scrolling§
    })
    setScrollToTopEf(true)
    console.debug('scrollToTopEf', scrollToTopEf)
    scrollToTopRef.current = setTimeout(() => {
      setScrollToTopEf(false)
    }, 2000)
  }

  const openModal = imageId => {
    setModalVisible(true)
    setModalImage(Images.images[imageId])
  }

  const closeModal = () => {
    setModalVisible(false)
    setTimeout(() => {
      setModalImage(null)
    }, 500)
  }

  useEffect(() => {
    scrollToTop
  }, [pathname])

  return (
    <>
      {}
      {isBigScreen && pathname !== '/' ? (
        <button className="autoplay-button auto-play-trigger fixed flex justify-center z-10" onClick={autoPlayTrigger}>
          <Autoplay className={'absolute'} width={100} />
          <span className="text-center absolute'">{isPaused ? 'OFF' : 'ON'}</span>
        </button>
      ) : null}
      <AutoScroller />
      <ModalWindow closeModal={closeModal} isModalImage={isModalImage} isModalVisible={isModalVisible} />
      <Header scrollToTop={scrollToTop} />

      <MenuFullPage />
      <Preloader pathname={pathname} />
      <FullscreenModelPage pathname={pathname} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={pathname} pathname={pathname}>
          <Route path="/" element={<IntroPage pathname={pathname} />}></Route>
          <Route
            path="/trifluoroacetic_acid"
            element={<TrifluoroaceticAcidPage pathname={pathname} scrollToTopEf={scrollToTopEf} />}
          ></Route>
          <Route path="/caffeine" element={<CaffeinePage pathname={pathname} scrollToTopEf={scrollToTopEf} />}></Route>
          <Route path="/nicotine" element={<NicotinePage pathname={pathname} scrollToTopEf={scrollToTopEf} />}></Route>
          <Route path="/ddt" element={<DdtPage pathname={pathname} scrollToTopEf={scrollToTopEf} />}></Route>
          <Route
            path="/bisphenol_s"
            element={<BisphenolSPage pathname={pathname} scrollToTopEf={scrollToTopEf} />}
          ></Route>
        </Routes>
        {pathname === '/' ? null : (
          <ContentManager openModal={openModal} isModalVisible={isModalVisible} key="sss-robe" />
        )}
      </AnimatePresence>

      <ViewportManager />
      <Footer scrollToTop={scrollToTop} pathname={pathname} />
      <VideoBackground pathname={pathname} />
      <Background pathname={pathname} showFullscreenMode={true} />
    </>
  )
}

export default App
