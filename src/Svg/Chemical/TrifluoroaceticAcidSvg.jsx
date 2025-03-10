const TrifluoroaceticAcidSvg = ({ width = 180, strokeWidth = 1, className }) => {
  const ratio = 173.1 / 131.14
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
        viewBox="0 0 173.1 131.14"
      >
        <path
          fill="var(--hydrogen)"
          d="M171.8 62.03v3.41h-4.05v-3.41h-1.29v8.04h1.29v-3.46h4.05v3.46h1.3v-8.04h-1.3z"
        />
        <path fill="none" stroke="var(--hydrogen)" strokeWidth={strokeWidth} d="m163.97 68.38-10.27 5.93" />
        <path
          d="M140.88 80.07c-.3-.62-.74-1.1-1.3-1.44-.56-.34-1.23-.51-1.99-.51s-1.42.17-1.99.51c-.56.34-1 .82-1.3 1.44-.3.62-.46 1.35-.46 2.19s.15 1.57.46 2.19c.3.62.74 1.1 1.3 1.44.56.34 1.23.51 1.99.51s1.42-.17 1.99-.51c.56-.34 1-.82 1.3-1.44.3-.62.46-1.35.46-2.19s-.15-1.57-.46-2.19Zm-1.17 3.87c-.16.42-.42.73-.76.92s-.8.29-1.36.29-1-.1-1.36-.29c-.35-.19-.61-.5-.77-.92s-.25-.98-.25-1.68.08-1.27.25-1.69.42-.73.77-.92c.35-.19.8-.29 1.36-.29s1.01.1 1.36.29.6.5.76.92.25.98.25 1.69-.08 1.26-.25 1.68ZM92.33.51C91.77.17 91.1 0 90.34 0s-1.42.17-1.99.51c-.56.34-1 .82-1.3 1.44-.3.62-.46 1.35-.46 2.19s.15 1.57.46 2.19c.3.62.74 1.1 1.3 1.44.56.34 1.23.51 1.99.51s1.42-.17 1.99-.51c.56-.34 1-.82 1.3-1.44.3-.62.46-1.35.46-2.19s-.15-1.57-.46-2.19c-.3-.62-.74-1.1-1.3-1.44Zm.13 5.31c-.16.42-.42.73-.76.92s-.8.29-1.36.29-1-.1-1.36-.29c-.35-.19-.61-.5-.77-.92s-.25-.98-.25-1.68.08-1.27.25-1.69.42-.73.77-.92c.35-.19.8-.29 1.36-.29s1.01.1 1.36.29.6.5.76.92.25.98.25 1.69-.08 1.26-.25 1.68Z"
          fill="var(--oxygen)"
        />
        <path
          d="M21.92 31.62h-.38v8.04h1.28v-3.23h4.22v-1.16h-4.22v-2.48h4.4v-1.16h-5.3Zm57.56 92.65v-1.16h-5.69v8.04h1.28v-3.23h4.22v-1.16h-4.22v-2.48h4.4ZM.38 104.09H0v8.04h1.28v-3.23H5.5v-1.16H1.28v-2.48h4.4v-1.16H.38Z"
          fill="var(--fluorine)"
        />
        <path fill="none" stroke="var(--fluorine)" strokeWidth={strokeWidth} d="m73.1 121.35-11.9-20.51" />
        <path fill="none" stroke="var(--oxygen)" strokeWidth={strokeWidth} d="m110.85 68.38 20.54 11.86" />
        <path fill="none" stroke="var(--fluorine)" strokeWidth={strokeWidth} d="m25.48 39.31 11.9 20.51" />
        <path fill="none" stroke="var(--carbon)" strokeWidth={strokeWidth} d="m37.38 59.82 23.82 41.02" />
        <path fill="none" stroke="var(--fluorine)" strokeWidth={strokeWidth} d="m8.27 104.14 20.51-11.9" />
        <path fill="none" stroke="var(--oxygen)" strokeWidth={strokeWidth} d="M87.64 10.87v23.72" />
        <path fill="none" stroke="var(--carbon)" strokeWidth={strokeWidth} d="M87.64 34.59v23.72" />
        <path fill="none" stroke="var(--oxygen)" strokeWidth={strokeWidth} d="M92.99 10.87v23.72" />
        <path fill="none" stroke="var(--carbon)" strokeWidth={strokeWidth} d="M92.99 34.59v23.72" />
        <path fill="none" stroke="var(--oxygen)" strokeWidth={strokeWidth} d="m153.7 74.31-10.27 5.93" />
        <path fill="none" stroke="var(--carbon)" strokeWidth={strokeWidth} d="m28.78 92.24 61.53-35.72 20.54 11.86" />
      </svg>
    </div>
  )
}

export default TrifluoroaceticAcidSvg
