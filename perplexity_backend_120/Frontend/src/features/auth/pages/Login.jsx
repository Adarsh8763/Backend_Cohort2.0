import { useState } from "react";
import "../style/form.scss";
import FormGroup from "../components/FormGroup";
import "../../shared/button.scss"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { handleLogin } = useAuth()
  const navigate = useNavigate()
  
  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin(email, password)
    navigate("/")
  }

  if(!loading && user){
    return <Navigate to="/" replace />
  }
  
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup type="text" name="email" value={email} placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
          <FormGroup type="text" name="password" value={password} placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} />
          <button className="button primary-button">Login</button>
        </form>
        <p>Don't have an account? <Link className="toggleAuthForm" to="/register">Register</Link> </p>
      </div>
    </main>
  );
};

export default Login;
