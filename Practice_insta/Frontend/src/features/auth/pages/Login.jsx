import '../style/form.scss'
import '../../shared/button.scss'
import {useAuth} from "../hooks/useAuth"
import { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { handleLogin, loading } = useAuth()
    const navigate = useNavigate()

    if(loading){
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

    function onSubmitHandler(e){
        e.preventDefault()

        handleLogin(username, password)
        .then(res=>{
            console.log(res)
            navigate('/')
        })

        setUsername("")
        setPassword("")
    }


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={onSubmitHandler}>
                <input value={username} onChange={(e)=>{ setUsername(e.target.value) }} type="text" name="username" placeholder="Enter username" />
                <input value={password} onChange={(e)=>{ setPassword(e.target.value) }} type="text" name="password" placeholder="Enter password" />
                <button className="button primary-button">Login</button>
            </form>
            <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
