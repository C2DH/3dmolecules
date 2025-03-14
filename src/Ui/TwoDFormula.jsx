import TrifluoroaceticAcidSvg from '../Svg/Chemical/TrifluoroaceticAcidSvg'
import CaffeineSvg from '../Svg/Chemical/CaffeineSvg'
import NicotineSvg from '../Svg/Chemical/NicotineSvg'
import BisphenolSSvg from '../Svg/Chemical/BisphenolSSvg'
import DDTSvg from '../Svg/Chemical/DdtSvg'
import { useMediaQuery } from 'react-responsive'

const TwoDFormula = ({ pathname }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  return (
    <>
      <div className="ChemicalSvg flex justify-center opacity-50 w-full fixed top-10 z-1">
        {pathname === '/trifluoroacetic_acid' ? <TrifluoroaceticAcidSvg width={isBigScreen ? 200 : 130} /> : null}
        {pathname === '/caffeine' ? <CaffeineSvg width={isBigScreen ? 220 : 140} /> : null}
        {pathname === '/nicotine' ? <NicotineSvg width={isBigScreen ? 240 : 150} /> : null}
        {pathname === '/bisphenol_s' ? <BisphenolSSvg width={isBigScreen ? 320 : 190} /> : null}
        {pathname === '/ddt' ? <DDTSvg width={isBigScreen ? 260 : 160} /> : null}
      </div>
    </>
  )
}

export default TwoDFormula
