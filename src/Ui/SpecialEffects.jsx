import { Sparkles } from '@react-three/drei'
import { useMediaQuery } from 'react-responsive'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'

const SpecialEffects = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

  return (
    <>
      {isBigScreen ? <Sparkles count={60} size={1} scale={5} speed={0.1} opacity={0.3} /> : null}
      <EffectComposer>
        {isBigScreen ? (
          <>
            <Bloom
              intensity={1.5} // Adjust the intensity of the glow
              kernelSize={2} // Adjust the size of the glow
              luminanceThreshold={0.01} // Adjust the threshold for what gets glowing
              luminanceSmoothing={0.01} // Adjust the smoothness of the glow
            />

            <DepthOfField
              focusDistance={0} // Distance to the focus target
              focalLength={1} // Strength of the blur
              bokehScale={4} // Scale of the bokeh effect
              height={480} // Optional: Height of the effect (can be adjusted)
            />
          </>
        ) : null}
      </EffectComposer>
    </>
  )
}

export default SpecialEffects
