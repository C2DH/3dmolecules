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
import useStore from './GlobalState'
import VideoBackground from './Ui/VideoBackground'
import { useMediaQuery } from 'react-responsive'
import Autoplay from './Svg/Autoplay'

function App() {
  const location = useLocation()
  const pathname = location.pathname
  const [isModalVisible, setModalVisible] = useAtom(modalVisible)
  const [isModalImage, setModalImage] = useAtom(modalImage) // Use an empty object as the key

  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

  const scrollToTopEf = useStore(state => state.scrollToTopEf)

  console.info('[App] pathname', pathname, '\n - isModalVisible', isModalVisible, '\n - isModalImage', isModalImage)

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

  return (
    <>
      {}
      {isBigScreen && pathname !== '/' ? <Autoplay className={'absolute'} width={100} /> : null}
      <ModalWindow closeModal={closeModal} isModalImage={isModalImage} isModalVisible={isModalVisible} />
      <Header />

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
      <Footer pathname={pathname} />
      <VideoBackground pathname={pathname} />
      <Background pathname={pathname} showFullscreenMode={true} />
    </>
  )
}

export default App
