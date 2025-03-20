import { Canvas } from '@react-three/fiber'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import TfaAnimation from '../Data/Animation/tfaAnimation.json'
import { useEffect, useRef } from 'react'
import { config, useSpring } from '@react-spring/web'
import { useCurrentSheet, PerspectiveCamera } from '@theatre/r3f'
import { useScrollStore } from '../components/ScrollManager'
import { val } from '@theatre/core'
import { useMediaQuery } from 'react-responsive'
import TrifluoroaceticAcidModel from '../modelComps/TrifluoroaceticAcidModel'
import { editable as e } from '@theatre/r3f'
import Transition from '../Ui/Transition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import DebugMemory from '../components/DebugMemory'

const TrifluoroaceticAcid = () => {
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const menuLinkRef = useRef(useScrollStore.getState().menuLinkPosition)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  const sheet = useCurrentSheet()
  const sequenceLength = val(sheet.sequence.pointer.length)

  const [, apiTheatre] = useSpring(() => ({
    position: 0,
    config: config.molasses,
    onChange: ({ value }) => {
      sheet.sequence.position = value.position
    }
  }))
  console.log('[TrifluoroaceticAcid] @sheet', sheet)
  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio
      let ratioMenuLinkPosition = window.scrollY / state.menuLinkPosition
      console.debug(
        '[TrifluoroaceticAcid] @useEffect @useScrollStore.subscribe',
        state.menuLinkPosition,
        window.scrollY,
        state.scrollRatio,
        ratioMenuLinkPosition
      )
      if (menuLinkRef.current !== state.menuLinkPosition) {
        menuLinkRef.current = state.menuLinkPosition
      }
      apiTheatre.start({
        position: ratioRef.current * sequenceLength
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceLength, sheet.address.sheetId])

  return (
    <>
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0.2, 8]} fov={45} near={0.1} far={70} />
      <group position={isBigScreen ? [0, 0.3, 0] : [-1, 0.3, 0]} scale={isBigScreen ? 1 : 0.8}>
        <e.group theatreKey="Robe">
          <TrifluoroaceticAcidModel />
        </e.group>
      </group>
    </>
  )
}

const TrifluoroaceticAcidPage = ({ pathname }) => {
  const canvasRef = useRef()

  const project = getProject('Robe Francaise Animation', {
    state: TfaAnimation
  })
  const sheet = project.sheet('Scene')
  console.log('[TrifluoroaceticAcidPage] @sheet', sheet)

  useEffect(() => {
    const canvas = canvasRef.current

    const handleContextLost = event => {
      event.preventDefault()
      console.error('WebGL context lost!')
      // Handle context loss (e.g., show a message, save state)
    }

    const handleContextRestored = event => {
      console.log('WebGL context restored!')
      // Handle context restoration (e.g., reload resources)
    }

    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      }
    }
  }, [sheet])

  return (
    <div className="Scene fixed h-screen w-full top-0">
      <HelmetProvider>
        <Helmet>
          <title>3D Molecules · Trifluoroacetic Acid (TFA)</title>
          <meta name="description" content="Telling stories about chemicals." data-rh="true" />
          <meta name="keywords" content="TFA, LCSB, C²DH" />
        </Helmet>
      </HelmetProvider>
      <Canvas
        dpr={[1, 2]}
        gl={{
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          antialias: true
        }}
      >
        {/* <DebugMemory /> */}
        <SheetProvider sheet={sheet}>
          <TrifluoroaceticAcid pathname={pathname} />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default Transition(TrifluoroaceticAcidPage)
