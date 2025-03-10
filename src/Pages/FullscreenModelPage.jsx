import './Pages.css'
import useStore from '../GlobalState'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Background from '../Ui/Background'
import { useMediaQuery } from 'react-responsive'
import CaffeineModel from '../modelComps/CaffeineModel'
import NicotineModel from '../modelComps/NicotineModel'
import TrifluoroaceticAcidModel from '../modelComps/TrifluoroaceticAcidModel'
import ClofenotanModel from '../modelComps/ClofenotanModel'
import BisphenolSModel from '../modelComps/BisphenolSModel'
import CloseButton from '../Ui/CloseButton'
import { useEffect } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import InfoPanel from '../Ui/InfoPanel'
import Annotation from '../Ui/Annotation'
import TrifluoroaceticAcidSvg from '../Svg/Chemical/TrifluoroaceticAcidSvg'
import ComponentAnnotation from '../Ui/ComponentAnnotation'

const FullscreenModelPage = ({ pathname }) => {
  const showFullscreenMode = useStore(state => state.showFullscreenMode)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

  const fullscreenMode = () => {
    if (showFullscreenMode === false) {
      useStore.setState({ showFullscreenMode: true })
    } else {
      useStore.setState({ showFullscreenMode: false })
    }
  }

  const [styles, api] = useSpring(() => ({
    opacity: 0,
    config: config.slow
  }))

  useEffect(() => {
    console.debug('API', api.start)
    api.start({
      opacity: showFullscreenMode ? 1 : 0,
      config: { delay: showFullscreenMode === false ? 5000 : 5000, duration: showFullscreenMode === false ? 500 : 300 } // Added 500ms to the existing delay
    })
  }, [showFullscreenMode])

  return (
    <a.div
      style={styles}
      className={`FullscreenModelPage ${showFullscreenMode ? 'pointer-events-auto z-50' : 'pointer-events-none z-[-1]'}`}
    >
      <div className="ChemicalSvg flex justify-center opacity-50 w-full fixed top-10 left-5 z-1">
        <TrifluoroaceticAcidSvg width={200} />
      </div>
      <ComponentAnnotation pathname={pathname} />
      <CloseButton
        onClick={fullscreenMode}
        className="mb-2"
        size={32}
        style={{ position: 'absolute', right: isBigScreen ? '3rem' : '1rem', top: isBigScreen ? '2rem' : '1rem' }}
      />
      {isBigScreen ? <InfoPanel /> : <InfoPanel mobile={true} />}
      <Canvas gl={{ pixelRatio: Math.min(window.devicePixelRatio, 2), antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
        <OrbitControls autoRotate={false} autoRotateSpeed={0.5} enableDamping={true} />
        {pathname === '/trifluoroacetic_acid' ? (
          <>
            <TrifluoroaceticAcidModel position={[0, 0, 0]} scale={1.2} />
            <Annotation id={8} position={[-0.1, 2.2, -0.5]} />
            <Annotation id={14} position={[-0.15, 0, 0.6]} />
          </>
        ) : null}
        {pathname === '/caffeine' ? (
          <>
            <CaffeineModel position={[0, 0, 0]} scale={1.2} />
            <Annotation id={8} position={[-0.1, 2.2, -0.5]} />
            <Annotation id={14} position={[-0.15, 0, 0.6]} />
          </>
        ) : null}
        {pathname === '/nicotine' ? (
          <>
            <NicotineModel position={[0, 0, 0]} scale={1.2} />
            <Annotation id={8} position={[-0.1, 2.2, -0.5]} />
            <Annotation id={14} position={[-0.15, 0, 0.6]} />
          </>
        ) : null}
        {pathname === '/clofenotan' ? (
          <>
            <ClofenotanModel position={[0, 0, 0]} scale={1.2} />
            <Annotation id={8} position={[-0.1, 2.2, -0.5]} />
            <Annotation id={14} position={[-0.15, 0, 0.6]} />
          </>
        ) : null}
        {pathname === '/bisphenol_s' ? (
          <>
            <BisphenolSModel position={[0, 0, 0]} scale={1.2} />
            <Annotation id={8} position={[-0.1, 2.2, -0.5]} />
            <Annotation id={14} position={[-0.15, 0, 0.6]} />
          </>
        ) : null}
      </Canvas>
      <Background showFullscreenMode={showFullscreenMode} />
    </a.div>
  )
}

export default FullscreenModelPage
