import './ComponentAnnotation.css'

const ComponentAnnotation = ({ pathname }) => {
  return (
    <div className="ComponentAnnotation fixed flex flex-wrap sm:justify-center justify-around flex-row bottom-10 w-full fluorine-color">
      {pathname === '/trifluoroacetic_acid' ? (
        <>
          <div className="flex items-center fluorine-color mr-0 sm:mr-5">
            <span className="fluorine-color-bg "></span>
            <p>Fluorine</p>
          </div>
          <div className="flex items-center carbon-color mr-0 sm:mr-5">
            <span className="carbon-color-bg "></span>
            <p>Carbon</p>
          </div>
          <div className="flex items-center oxygen-color mr-0 sm:mr-5">
            <span className="oxygen-color-bg "></span>
            <p>Oxygen</p>
          </div>
          <div className="flex items-center hydrogen-color">
            <span className="hydrogen-color-bg "></span>
            <p>Hydrogen</p>
          </div>
        </>
      ) : null}
      {pathname === '/caffeine' ? (
        <>
          <div className="flex items-center nitrogen-color mr-0 sm:mr-5">
            <span className="nitrogen-color-bg "></span>
            <p>Nitrogen</p>
          </div>
          <div className="flex items-center carbon-color mr-0 sm:mr-5">
            <span className="carbon-color-bg "></span>
            <p>Carbon</p>
          </div>
          <div className="flex items-center oxygen-color mr-0 sm:mr-5">
            <span className="oxygen-color-bg "></span>
            <p>Oxygen</p>
          </div>
          <div className="flex items-center hydrogen-color">
            <span className="hydrogen-color-bg "></span>
            <p>Hydrogen</p>
          </div>
        </>
      ) : null}
      {pathname === '/nicotine' ? (
        <>
          <div className="flex items-center nitrogen-color mr-0 sm:mr-5">
            <span className="nitrogen-color-bg "></span>
            <p>Nitrogen</p>
          </div>
          <div className="flex items-center carbon-color mr-0 sm:mr-5">
            <span className="carbon-color-bg "></span>
            <p>Carbon</p>
          </div>
          <div className="flex items-center hydrogen-color">
            <span className="hydrogen-color-bg "></span>
            <p>Hydrogen</p>
          </div>
        </>
      ) : null}
      {pathname === '/ddt' ? (
        <>
          <div className="flex items-center chlorine-color mr-0 sm:mr-5">
            <span className="chlorine-color-bg "></span>
            <p>Chlorine</p>
          </div>
          <div className="flex items-center carbon-color mr-0 sm:mr-5">
            <span className="carbon-color-bg "></span>
            <p>Carbon</p>
          </div>
          <div className="flex items-center hydrogen-color">
            <span className="hydrogen-color-bg "></span>
            <p>Hydrogen</p>
          </div>
        </>
      ) : null}
      {pathname === '/bisphenol_s' ? (
        <>
          <div className="flex items-center sulfur-color mr-0 sm:mr-5">
            <span className="sulfur-color-bg "></span>
            <p>Sulfur</p>
          </div>
          <div className="flex items-center carbon-color mr-0 sm:mr-5">
            <span className="carbon-color-bg "></span>
            <p>Carbon</p>
          </div>
          <div className="flex items-center oxygen-color mr-0 sm:mr-5">
            <span className="oxygen-color-bg "></span>
            <p>Oxygen</p>
          </div>
          <div className="flex items-center hydrogen-color">
            <span className="hydrogen-color-bg "></span>
            <p>Hydrogen</p>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ComponentAnnotation
