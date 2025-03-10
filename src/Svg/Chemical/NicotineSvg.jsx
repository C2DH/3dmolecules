const NicotineSvg = ({ width = 200, strokeWidth = 1, className }) => {
  const ratio = 172.51 / 140.56
  const height = width / ratio

  return (
    <div className={`NicotineSvg SVG ${className} flex`} style={{ height: height + 'px', width: width + 'px' }}>
      <svg
        id="NicotineSvg"
        data-name="Trifluoroacetic Acid"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 172.51 140.56"
      >
        <path
          fill="var(--nitrogen)"
          d="M38.31 37.65v1.28h-.1l-.85-1.28-3.05-4.61h-1.38v8.04h1.28v-5.84h.08l.88 1.31 3.04 4.54h1.38v-8.04h-1.28v4.61Zm119.81 46.99v5.89h-.1l-.85-1.28-3.05-4.61h-1.38v8.04h1.28v-5.84h.08l.88 1.31 3.04 4.54h1.38v-8.04h-1.28Z"
        />
        <path fill="none" strokeWidth={strokeWidth} stroke="var(--carbon)" d="m44.1.12-3.63 15.01" />
        <path
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--nitrogen)"
          d="m40.48 15.13-3.56 15.01M30.04 38.92l-14.76 6.11"
        />
        <path
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--carbon)"
          d="m61.98 65.39-.06-.38M64.14 65.39v-.7M66.37 65.39l-.06-1.08M68.6 65.39l-.13-1.4M70.82 65.39l-.13-1.78M73.05 65.39l-.19-2.1M75.28 65.39l-.19-2.48M77.5 65.39l-.25-2.8M79.73 65.39l-.25-3.18M81.96 65.39l-.32-3.5M84.12 65.39l-.25-3.88M86.35 65.39l-.32-4.2M88.57 65.39l-.32-4.58M90.8 65.39l-.38-4.9M93.02 65.39l-.38-5.28M95.25 65.39l-.45-5.6M103.78 61.95l17.56 25.64"
        />
        <path
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--nitrogen)"
          d="m134.69 92.23 16.09-1.27M159.19 83.96l6.55-13.68M154.1 81.55l5.85-12.21"
        />
        <path
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--carbon)"
          d="m159.95 69.33 5.85-12.28M148.18 31.42l-31.04 2.42M15.29 45.03.53 51.07 3.46 88.6l36.58 8.84 19.72-32.06-9.61-11.26"
        />
        <path fill="none" strokeWidth={strokeWidth} stroke="var(--nitrogen)" d="m50.15 54.13-9.54-11.2" />
        <path
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--carbon)"
          d="m165.74 70.29 6.55-13.68-21.31-31.04-37.53 2.93-16.22 33.97 21.31 30.98 16.16-1.21"
        />
      </svg>
    </div>
  )
}

export default NicotineSvg
