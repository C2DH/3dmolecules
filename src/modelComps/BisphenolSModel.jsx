import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { Sparkles } from '@react-three/drei'
import { forwardRef, useEffect, useMemo } from 'react'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'
import { getSafeBasePathUrl } from '../utils'
import vertexShader from '../shaders/vertex.glsl?raw'
import fragmentShader from '../shaders/fragment.glsl?raw'

const modelUrl = getSafeBasePathUrl('/gltf/BisphenolS.glb')

const BisphenolSModel = forwardRef(({ position, ...props }, ref) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const customShaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          fogColor: { value: new THREE.Color(0x000000) }, // Black fog
          fogNear: { value: 1 }, // Fog starts at 5 units
          fogFar: { value: 2 }, // Fog ends at 15 units
          cameraPosition: { value: new THREE.Vector3() }, // Updated automatically
          uSize: { value: 0.15 }, // Default point size
          uColor: { value: new THREE.Color('') }, // Default color (green)
          uAlpha: { value: 1.0 }, // Default alpha (fully opaque)
          uTime: { value: 0 }, // Optional: For animations
          uResolution: new THREE.Uniform(
            new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)
          )
        },
        transparent: true // Enable transparency
      }),
    []
  )

  const { nodes } = useGLTF(modelUrl)

  // Function to extract vertices and create a BufferGeometry for points
  const createPointsGeometry = (geometry, color) => {
    const pointsGeometry = new THREE.BufferGeometry()

    // Extract the position attribute from the original geometry
    const positions = geometry.attributes.position.array
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Add color attribute
    const colors = new Float32Array(positions.length) // 3 components (r, g, b) per vertex
    const pointColor = new THREE.Color(color) // Use the provided color
    for (let i = 0; i < positions.length; i += 3) {
      colors[i] = pointColor.r // Red component
      colors[i + 1] = pointColor.g // Green component
      colors[i + 2] = pointColor.b // Blue component
    }
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return pointsGeometry
  }

  // Define colors for atomsPoints
  const fluorine = '#C5F097' // Green
  const oxygen = '#FF3F3F' // Red
  const carbon = '#E9DCB0' // Light Brown
  const nitrogen = '#7697FC' // Blue
  const hydrogen = '#FFFFFF' // White
  const chlorine = '#61F861' // Green
  const sulfur = '#FFFF76' // Yellow
  const atomsColors = [fluorine, oxygen, carbon, nitrogen, hydrogen, chlorine, sulfur]

  // Create points geometries for each mesh with specific colors
  const atoms1Points = createPointsGeometry(nodes.atoms_1.geometry, atomsColors[6])
  const atoms2Points = createPointsGeometry(nodes.atoms_2.geometry, atomsColors[1])
  const atoms3Points = createPointsGeometry(nodes.atoms_3.geometry, atomsColors[2])

  const hydrogenPoints = createPointsGeometry(nodes.hydrogen.geometry, atomsColors[4])

  const sticks1Points = createPointsGeometry(nodes.sticks_1.geometry, atomsColors[2])
  const sticks2Points = createPointsGeometry(nodes.sticks_2.geometry, atomsColors[6])
  const sticks3Points = createPointsGeometry(nodes.sticks_3.geometry, atomsColors[4])
  const sticks4Points = createPointsGeometry(nodes.sticks_4.geometry, atomsColors[1])

  const stickMaterial = useMemo(() => {
    const mat = customShaderMaterial.clone()
    mat.uniforms.uSize.value = 0.1
    return mat
  }, [])

  return (
    <>
      <group {...props} dispose={null} position={position} rotation={[0, 0, 0]} ref={ref} scale={1}>
        <points geometry={atoms1Points} material={customShaderMaterial} />
        <points geometry={atoms2Points} material={customShaderMaterial} />
        <points geometry={atoms3Points} material={customShaderMaterial} />

        <points geometry={hydrogenPoints} material={stickMaterial} />

        <points geometry={sticks1Points} material={stickMaterial} />
        <points geometry={sticks2Points} material={stickMaterial} />
        <points geometry={sticks3Points} material={stickMaterial} />
        <points geometry={sticks4Points} material={stickMaterial} />
      </group>
      <Sparkles count={60} size={1} scale={5} speed={0.1} opacity={0.3} />
      <EffectComposer>
        <Bloom
          intensity={1.5} // Adjust the intensity of the glow
          kernelSize={3} // Adjust the size of the glow
          luminanceThreshold={0.01} // Adjust the threshold for what gets glowing
          luminanceSmoothing={0.01} // Adjust the smoothness of the glow
        />
        <DepthOfField
          focusDistance={0} // Distance to the focus target
          focalLength={0.6} // Strength of the blur
          bokehScale={4} // Scale of the bokeh effect
          height={480} // Optional: Height of the effect (can be adjusted)
        />
      </EffectComposer>
    </>
  )
})

useGLTF.preload(modelUrl)
BisphenolSModel.displayName = 'BisphenolSModel'
export default BisphenolSModel
