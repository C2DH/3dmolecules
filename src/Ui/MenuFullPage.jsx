import './MenuFullPage.css'
import { NavLink } from 'react-router-dom'
import { useSpring, a, config } from '@react-spring/web'
import { useEffect } from 'react'

const MenuFullPage = ({ isMenuOpen }) => {
  const [styles, api] = useSpring(() => ({
    transform: 'translateX(-100%)',
    config: config.slow,
  }))

  useEffect(() => {
    console.log('API', api.start)
    api.start({
      transform: isMenuOpen ? 'translateX(0%)' : 'translateX(-100%)',
      opacity: isMenuOpen ? 1 : 0,
    })
  }, [isMenuOpen])

  return (
    <a.section style={styles} className='MenuFullPage z-100'>
      <menu className='flex flex'>
        <ul className='flex flex-col items-center'>
          <li>
            <NavLink to='/'>A luxurious Robe à la francaise</NavLink>
          </li>
          <li>
            <NavLink to='/knight'>Knight</NavLink>
          </li>
          <li>
            <NavLink to='/riegelhauber'>Riegelhaube</NavLink>
          </li>
          <hr />
          <li>
            <NavLink to='/'>About Project</NavLink>
          </li>
        </ul>
      </menu>
    </a.section>
  )
}

export default MenuFullPage
