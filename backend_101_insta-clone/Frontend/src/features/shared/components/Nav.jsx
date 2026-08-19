import "../nav.scss"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

const Nav = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="nav-bar">
      <p className="nav-brand">Insta<span>.</span></p>
      <div className="nav-actions">
        <button onClick={() => { navigate('/create-post') }} className='button primary-button'>+ New Post</button>
        {user && (
          <div className="nav-avatar" onClick={() => navigate('/profile')} title="Edit profile">
            <img src={user.profileImg} alt={user.username} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Nav
