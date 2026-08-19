import React, {useState} from 'react'
import '../style/form.scss'
import "../../shared/button.scss"
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
    <main className="auth-page">
      <div className="form-container">
        <div className="form-header">
          <p className="brand">Insta<span>.</span></p>
          <p className="subtitle">Join the community — create your account.</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <input onChange={(e)=>{setUsername(e.target.value)}} type="text" name='username' value={username} placeholder='Username'/>
          <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name='email' value={email} placeholder='Email address'/>
          <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name='password' value={password} placeholder='Password'/>
          <button className='button primary-button'>Create Account</button>
        </form>
        <p className="form-footer">Already have an account? <Link className='toggleAuthForm' to='/login'>Sign in</Link></p>
      </div>
    </main>
  )
}

export default Register
