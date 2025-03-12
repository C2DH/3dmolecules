import { useFrame, useThree } from '@react-three/fiber'

function DebugMemory() {
  const { gl } = useThree()
  useFrame(() => {
    console.log(
      'GPU draw calls:',
      gl.info.render.calls,
      '\n - geometries:',
      gl.info.memory.geometries,
      '\n - textures:',
      gl.info.memory.textures
    )
  })
  return null
}

export default DebugMemory
