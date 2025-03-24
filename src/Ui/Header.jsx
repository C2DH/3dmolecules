import { Link } from 'react-router-dom'
import Logo3dStories from '../Svg/Logo3dStories'
import MenuCloseButton from './MenuCloseButton'
import { useMediaQuery } from 'react-responsive'
import QrCode from './QrCode'

const Header = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' })
  return (
    <>
      <header
        className="Header fixed z-20 flex justify-between p-5 md:p-10 pointer-events-none"
        style={{ width: '100%' }}
      >
        <div className="flex items-center">
          <Link to="/" aria-label="Link to homepage">
            <Logo3dStories width={isBigScreen ? 55 : 45} />
          </Link>
          <QrCode relative={true} />
        </div>
        <MenuCloseButton />
      </header>
    </>
  )
}

export default Header
