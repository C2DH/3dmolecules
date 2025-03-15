import './Button.css'

const Button = ({ value = '', type = 'primary', size = 'lg', className, onClick, icon }) => {
  return (
    <button onClick={onClick} className={`${type} ${size} ${className}`} type="button">
      {value}
      {icon !== undefined ? icon : null}
    </button>
  )
}

export default Button
