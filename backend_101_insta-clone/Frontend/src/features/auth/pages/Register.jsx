import React, {useState} from 'react'
import '../style/form.scss'
import {Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  function onSubmitHandler(e){
    e.preventDefault()

    handleRegister(username, email, password)
    .then(res=>{
      console.log(res)
      
      if(res){
        navigate('/')
      }
    })
    
    setUsername("")
    setPassword("")
    setEmail("")
  }
  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={onSubmitHandler}>
          <input onChange= {(e)=> {setUsername(e.target.value)}} type="text" name='username' value={username} placeholder='Enter username'/>
          <input onChange= {(e)=> {setEmail(e.target.value)}} type="text" name='email' value={email} placeholder='Enter email'/>
          <input onChange={(e)=>{setPassword(e.target.value)}} type="text" name='password' value={password} placeholder='Enter password'/>
          <button>Register</button>
          <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link> </p>
        </form>
        </div>
      </main>
    </div>
  )
}

export default Register
