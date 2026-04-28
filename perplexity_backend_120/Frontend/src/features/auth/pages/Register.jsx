import { useState } from "react";
import "../style/form.scss";
import FormGroup from "../components/FormGroup";
import "../../shared/button.scss"
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, Navigate } from "react-router";
import { useSelector } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    await handleRegister(username, email, password)
    navigate('/')
  }

  if(!loading && user){
    return <Navigate to="/" replace />
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup type="text" name="username" value={username} placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}} />
          <FormGroup type="text" name="email" value={email} placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
          <FormGroup type="text" name="password" value={password} placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} />
          <button className="button primary-button">Register</button>
        </form>
        <p>Already have an account? <Link className="toggleAuthForm" to="/login">Login</Link> </p>
      </div>
    </main>
  )
}

export default Register
