import TrifluoroaceticAcidSvg from '../Svg/Chemical/TrifluoroaceticAcidSvg'
import CaffeineSvg from '../Svg/Chemical/CaffeineSvg'
import NicotineSvg from '../Svg/Chemical/NicotineSvg'
import BisphenolSSvg from '../Svg/Chemical/BisphenolSSvg'
import DDTSvg from '../Svg/Chemical/DdtSvg'

const TwoDFormula = ({ pathname }) => {
  return (
    <>
      <div className="ChemicalSvg flex justify-center opacity-50 w-full fixed top-10 z-1">
        {pathname === '/trifluoroacetic_acid' ? <TrifluoroaceticAcidSvg width={200} /> : null}
        {pathname === '/caffeine' ? <CaffeineSvg width={220} /> : null}
        {pathname === '/nicotine' ? <NicotineSvg width={240} /> : null}
        {pathname === '/bisphenol_s' ? <BisphenolSSvg width={320} /> : null}
        {pathname === '/ddt' ? <DDTSvg width={260} /> : null}
      </div>
    </>
  )
}

export default TwoDFormula
