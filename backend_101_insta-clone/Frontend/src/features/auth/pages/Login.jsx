import {useState} from 'react'
import "../style/form.scss"
import {Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin, loading } = useAuth()
  const navigate = useNavigate()

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }

  function onSubmitHandler(e){
    e.preventDefault()

    handleLogin(username, password)
    .then(res=>{
      console.log(res)
      navigate("/")
    })

    setUsername("")
    setPassword("")
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={onSubmitHandler}>
          <input onChange= {(e)=> {setUsername(e.target.value)}} type="text" name='username' value={username} placeholder='Enter username'/>
          <input onChange={(e)=>{setPassword(e.target.value)}} type="text" name='password' value={password} placeholder='Enter password'/>
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to = '/register'>Register</Link> </p>
      </div>
    </main>
  )
}

export default Login
