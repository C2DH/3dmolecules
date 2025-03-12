uniform vec2 uResolution;
uniform float uSize; // Controls the size of the points

attribute vec3 color; // Add color attribute

varying vec3 vColor; // Pass color to the fragment shader

void main() {
    // Transform the vertex position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Point size
    gl_PointSize = uSize * uResolution.y * (1.0 / -viewPosition.z);

    // Pass data to the fragment shader
    vColor = color;
}