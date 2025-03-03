uniform vec2 uResolution;
uniform float uSize; // Controls the size of the points
uniform float uTime; // Optional: For animations or time-based effects

attribute float aScale; // Optional: Per-point scale factor
attribute vec3 color; // Add color attribute


varying vec3 vWorldPosition;
varying vec3 vColor; // Pass color to the fragment shader

void main() {
    // Transform the vertex position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Optional: Add animations or transformations here
    // Example: Move points in a circular motion
    // modelPosition.x += sin(uTime + position.y) * 0.1;
    // modelPosition.y += cos(uTime + position.x) * 0.1;

    // Project the position into screen space
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    // Point size
    gl_PointSize = uSize * uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Pass data to the fragment shader
    vColor = color; // Pass the vertex color to the fragment shader
}