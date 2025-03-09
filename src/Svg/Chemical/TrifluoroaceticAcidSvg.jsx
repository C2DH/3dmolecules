const TrifluoroaceticAcidSvg = ({ width = 200, strokeWidth = 2, className }) => {
  const ratio = 261.24 / 200.59
  const height = width / ratio

  return (
    <div
      className={`TrifluoroaceticAcidSvg SVG ${className} flex`}
      style={{ height: height + 'px', width: width + 'px' }}
    >
      <svg
        id="TrifluoroaceticAcidSvg"
        data-name="Trifluoroacetic Acid"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 261.24 200.59"
      >
        <path fill="none" stroke="var(--carbon)" strokeWidth={strokeWidth} d="m53.83 93.23 38.11 65.65" />
        <path
          fill="none"
          stroke="var(--fluorine)"
          strokeWidth={strokeWidth}
          d="m91.94 158.88 17.45 30.06M35.07 60.91l18.76 32.32"
        />
        <path fill="none" stroke="var(--carbon)" strokeWidth={strokeWidth} d="m175.88 104.83-32-18.48-104.92 60.91" />
        <path fill="none" stroke="var(--oxygen)" strokeWidth={strokeWidth} d="m207.42 123.04-31.54-18.21" />
        <path fill="none" stroke="var(--fluorine)" strokeWidth={strokeWidth} d="M38.96 147.26 8.21 165.11" />
        <path fill="none" stroke="var(--hydrogen)" strokeWidth={strokeWidth} d="m252.09 105.26-15.4 8.89" />
        <path fill="none" stroke="var(--oxygen)" strokeWidth={strokeWidth} d="m236.69 114.15-15.4 8.89" />
        <path fill="none" stroke="var(--carbon)" strokeWidth={strokeWidth} d="M141.23 51.14v36.75M146.58 51.14v36.75" />
        <path fill="none" stroke="var(--oxygen)" strokeWidth={strokeWidth} d="M141.23 14.39v36.75M146.58 14.39v36.75" />
        <path
          d="M214.06 129.96c-.76 0-1.42-.17-1.99-.51-.56-.34-1-.82-1.3-1.44-.3-.62-.46-1.35-.46-2.19s.15-1.57.46-2.19c.3-.62.74-1.1 1.3-1.44.56-.34 1.23-.51 1.99-.51s1.42.17 1.99.51c.56.34 1 .82 1.3 1.44.3.62.46 1.35.46 2.19s-.15 1.57-.46 2.19c-.3.62-.74 1.1-1.3 1.44-.56.34-1.23.51-1.99.51Zm0-1.25c.56 0 1.01-.1 1.36-.29s.6-.5.76-.92.25-.98.25-1.68-.08-1.27-.25-1.69-.42-.73-.76-.92-.8-.29-1.36-.29-1 .1-1.36.29c-.35.19-.61.5-.77.92s-.25.98-.25 1.69.08 1.26.25 1.68.42.73.77.92c.35.19.8.29 1.36.29ZM143.83 8.28c-.76 0-1.42-.17-1.99-.51-.56-.34-1-.82-1.3-1.44-.3-.62-.46-1.35-.46-2.19s.15-1.57.46-2.19c.3-.62.74-1.1 1.3-1.44.56-.34 1.23-.51 1.99-.51s1.42.17 1.99.51c.56.34 1 .82 1.3 1.44.3.62.46 1.35.46 2.19s-.15 1.57-.46 2.19c-.3.62-.74 1.1-1.3 1.44-.56.34-1.23.51-1.99.51Zm0-1.25c.56 0 1.01-.1 1.36-.29s.6-.5.76-.92.25-.98.25-1.68-.08-1.27-.25-1.69-.42-.73-.76-.92-.8-.29-1.36-.29-1 .1-1.36.29c-.35.19-.61.5-.77.92s-.25.98-.25 1.69.08 1.26.25 1.68.42.73.77.92c.35.19.8.29 1.36.29Z"
          fill="var(--oxygen)"
        />
        <g fill="var(--fluorine)">
          <path d="M30.78 51.37h-.38v8.04h1.28v-3.23h4.23v-1.16h-4.23v-2.49h4.41v-1.16H30.78zM.38 163.07H0v8.04h1.28v-3.23h4.23v-1.16H1.28v-2.48h4.41v-1.17H.38zM117.1 193.72v-1.17h-5.69v8.04h1.28v-3.22h4.23v-1.17h-4.23v-2.48h4.41z" />
        </g>
        <path fill="var(--hydrogen)" d="M259.94 97.22v3.4h-4.06v-3.4h-1.28v8.04h1.28v-3.47h4.06v3.47h1.3v-8.04h-1.3z" />
      </svg>
    </div>
  )
}

export default TrifluoroaceticAcidSvg
