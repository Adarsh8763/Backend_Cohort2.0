import "../nav.scss"
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const navigate = useNavigate()

  return (
    <div className="nav-bar">
        <p> <b>Insta</b></p>
        <button onClick={()=>{navigate('/create-post')}} className='button primary-button'>New Post</button>
    </div>
  )
}

export default Nav
