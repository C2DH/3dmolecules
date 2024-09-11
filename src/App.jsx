import Background from './Ui/Background'
import Header from './Ui/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Ui/Footer'
import { modalVisible, modalImage } from './GlobalState'
import { useAtom } from 'jotai'
import FullscreenModelPage from './Pages/FullscreenModelPage'
import ContentManager from './components/ContentManager'
import ViewportManager from './components/ViewportManager'
import { useScrollStore } from './components/ScrollManager'
import NavPrevNextButtons from './Ui/NavPrevNextButtons'
import { useEffect, useRef } from 'react'
import MenuFullPage from './Ui/MenuFullPage'
import GenericPage from './Pages/GenericPage'
import RobeFrancaisePage from './Pages/RobeFrancaisePage'
import GreekStyleDressPage from './Pages/GreekStyleDressPage'
import { useLocation } from 'react-router-dom'
import DoubletPage from './Pages/DoubletPage'
import ModalWindow from './Ui/ModalWindow'
import Images from './Data/images.json'

function App() {
  const location = useLocation()
  const pathname = location.pathname
  const pageRef = useRef(useScrollStore.getState().page)
  const [isModalVisible, setModalVisible] = useAtom(modalVisible)
  const [isModalImage, setModalImage] = useAtom(modalImage) // Use an empty object as the key

  // useEffect(() => {
  //   const findRoot = document.getElementById('root')
  //   const currentScrollY = window.scrollY
  //   console.log('currentScrollY', currentScrollY)
  //   if (isModalVisible === true) {
  //     findRoot.classList.add('no-scroll')
  //   } else {
  //     findRoot.classList.remove('no-scroll')
  //   }
  // }, [isModalVisible])

  // console.log('GreekStyleDressContent', GreekStyleDressContent.sections[3].image)

  const scrollToTop = () => {
    window.scrollTo({
      top: window.top,
      behavior: 'smooth' // Optional: for smooth scrolling§
    })
  }

  const openModal = imageId => {
    setModalImage(Images.images[imageId])
    setModalVisible(true)
  }

  const closeModal = () => {
    // setModalVisible(prev => !prev) // Toggle the boolean value
    setModalVisible(false)
  }

  console.log('PAGE-REF', pageRef)
  return (
    <>
      <ModalWindow closeModal={closeModal} isModalImage={isModalImage} isModalVisible={isModalVisible} />
      <Header scrollToTop={scrollToTop} />
      <MenuFullPage />
      <NavPrevNextButtons scrollToTop={scrollToTop} />
      <FullscreenModelPage pathname={pathname} />
      <Routes>
        <Route path="/" element={<RobeFrancaisePage pathname={pathname} />}></Route>
        <Route path="/doublet" element={<DoubletPage pathname={pathname} />}></Route>
        <Route path="/greek_style_dress" element={<GreekStyleDressPage pathname={pathname} />}></Route>
        <Route path="/about" element={<GenericPage />}></Route>
      </Routes>
      <ContentManager openModal={openModal} isModalVisible={isModalVisible} />
      <ViewportManager />
      {/* </AnimatePresence> */}
      <Footer />
      <Background />
    </>
  )
}

export default App
