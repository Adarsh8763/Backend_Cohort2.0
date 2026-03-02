import {useState} from 'react'
import "../style/form.scss"
import axios from "axios"
import {Link} from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function onSubmitHandler(e){
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    }, {withCredentials: true} )
    .then(res=>{
      console.log(res.data)
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
