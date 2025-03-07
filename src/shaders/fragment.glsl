uniform vec3 uColor; // Uniform color for all points
uniform float uAlpha; // Uniform alpha (transparency) for all points
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;


varying vec3 vWorldPosition;
varying vec3 vColor; // Receive color from the vertex shader

void main() {
    // Set the color of the point
    vec3 finalColor = uColor * vColor; // Combine uniform color with vertex color

    // Optional: Create a circular point (instead of square)
    vec2 coord = gl_PointCoord - vec2(0.5); // Center the coordinate system
    float distanceFromCenter = length(coord);
    if (distanceFromCenter > 0.5) {
        discard; // Discard fragments outside the circle
    }

    float depth = length(vWorldPosition - cameraPosition);
    float fogFactor = smoothstep(fogNear, fogFar, depth);

    // Output the final color with transparency
    gl_FragColor = vec4(finalColor, uAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}