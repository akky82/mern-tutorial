import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserCog } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import ThemeComponent from './ThemeComponent'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <>
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
          <li>
            <Link to='/profile'>
              <button className='btn'>
                <FaUserCog /> Profile
              </button>
            </Link>
          </li>
          </>
        ) : (
          <>
          <li>
            <Link to='/login'>
              <button className='btn'>
                <FaSignInAlt /> Login
              </button>
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <button className='btn'>
                <FaUser /> Register
              </button>
            </Link>
          </li>
          </>
        )}
        <li>
          <ThemeComponent />
        </li>
      </ul>
    </header>
  )
}

export default Header
