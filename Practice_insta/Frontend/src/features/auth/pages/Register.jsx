import '../style/form.scss'
import '../../shared/button.scss'
import {useAuth} from "../hooks/useAuth"
import { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { handleRegister, loading } = useAuth()
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

        handleRegister(username, email, password)
        .then(res=>{
            console.log(res)
            navigate("/")
        })

        setUsername("")
        setEmail("")
        setPassword("")
    }


  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={onSubmitHandler}>
                <input value={username} onChange={(e)=>{ setUsername(e.target.value) }} type="text" name="username" placeholder="Enter username" />
                <input value={email} onChange={(e)=>{ setEmail(e.target.value) }} type="text" name="email" placeholder="Enter email" />
                <input value={password} onChange={(e)=>{ setPassword(e.target.value) }} type="text" name="password" placeholder="Enter password" />
                <button className="button primary-button">Register</button>
            </form>
            <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register