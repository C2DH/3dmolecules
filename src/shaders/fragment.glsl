uniform vec3 uColor; // Uniform color for all points
uniform float uAlpha; // Uniform alpha (transparency) for all points

varying vec3 vColor; // Receive color from the vertex shader

void main() {
    // Set the color of the point
    vec3 finalColor = uColor * vColor;

    // Create a circular point with smooth edges
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distanceFromCenter = dot(coord, coord); // Squared distance
    float alpha = smoothstep(0.25, 0.24, distanceFromCenter); // Smooth edge

    // Output the final color with transparency
    gl_FragColor = vec4(finalColor, uAlpha * alpha);
}