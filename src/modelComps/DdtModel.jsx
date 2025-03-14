import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { getSafeBasePathUrl } from '../utils'
import vertexShader from '../shaders/vertex.glsl?raw'
import fragmentShader from '../shaders/fragment.glsl?raw'
import SpecialEffects from '../Ui/SpecialEffects'
import { useMediaQuery } from 'react-responsive'

const modelUrl = getSafeBasePathUrl('/gltf/Ddt.glb')

const DdtModel = forwardRef(({ position, ...props }, ref) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })

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
          cameraPosition: { value: new THREE.Vector3() }, // Updated automatically
          uSize: { value: isBigScreen ? 0.15 : 0.13 }, // Default point size
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
  const atoms1Points = createPointsGeometry(nodes.atoms_1.geometry, atomsColors[2])
  const atoms2Points = createPointsGeometry(nodes.atoms_2.geometry, atomsColors[5])

  const hydrogenPoints = createPointsGeometry(nodes.hydrogen.geometry, atomsColors[4])

  const sticks1Points = createPointsGeometry(nodes.sticks_1.geometry, atomsColors[5])
  const sticks2Points = createPointsGeometry(nodes.sticks_2.geometry, atomsColors[2])
  const sticks3Points = createPointsGeometry(nodes.sticks_3.geometry, atomsColors[4])

  const stickMaterial = useMemo(() => {
    const mat = customShaderMaterial.clone()
    mat.uniforms.uSize.value = isBigScreen ? 0.1 : 0.075
    return mat
  }, [])

  return (
    <>
      <group
        {...props}
        dispose={null}
        position={position}
        rotation={isBigScreen ? [1.5, 0, -0.4] : [0, 1.9, 1.57]}
        ref={ref}
        scale={1}
      >
        <points geometry={atoms1Points} material={customShaderMaterial} />
        <points geometry={atoms2Points} material={customShaderMaterial} />

        <points geometry={hydrogenPoints} material={stickMaterial} />

        <points geometry={sticks1Points} material={stickMaterial} />
        <points geometry={sticks2Points} material={stickMaterial} />
        <points geometry={sticks3Points} material={stickMaterial} />
      </group>
      <SpecialEffects />
    </>
  )
})

useGLTF.preload(modelUrl)
DdtModel.displayName = 'DdtModel'
export default DdtModel
