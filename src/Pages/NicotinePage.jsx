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
import NicotineModel from '../modelComps/NicotineModel'
import { editable as e } from '@theatre/r3f'
import Transition from '../Ui/Transition'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Nicotine = () => {
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

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio
      let ratioMenuLinkPosition = window.scrollY / state.menuLinkPosition
      console.debug(
        '[RobeFrancaise] @useEffect @useScrollStore.subscribe',
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
      <group position={isBigScreen ? [-0.4, 0.3, 0] : [-0.8, 0, 0]} scale={isBigScreen ? 1 : 0.7}>
        <e.group theatreKey="Robe">
          <NicotineModel />
        </e.group>
      </group>
    </>
  )
}

const NicotinePage = ({ pathname }) => {
  const project = getProject('Robe Francaise Animation', {
    state: TfaAnimation
  })
  const sheet = project.sheet('Scene')

  return (
    <div className="Scene fixed h-screen w-full top-0">
      <HelmetProvider>
        <Helmet>
          <title>3D Molecules · Nicotine</title>
          <meta name="description" content="Telling stories about chemicals." data-rh="true" />
          <meta name="keywords" content="Nicotine, LCSB, C²DH" />
        </Helmet>
      </HelmetProvider>
      <Canvas
        gl={{
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          antialias: false,
          forceWebGL1: true,
          powerPreference: 'low-power'
        }}
      >
        <SheetProvider sheet={sheet}>
          <Nicotine pathname={pathname} />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default Transition(NicotinePage)
