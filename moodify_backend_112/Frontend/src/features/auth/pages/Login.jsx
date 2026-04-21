import { useState } from "react";
import "../style/form.scss";
import FormGroup from "../components/FormGroup";
import "../../shared/button.scss"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()
  
  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin(username, password)
    navigate("/")
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup type="text" name="username" value={username} placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}} />
          <FormGroup type="text" name="password" value={password} placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} />
          <button className="button primary-button">Login</button>
        </form>
        <p>Don't have an account? <Link className="toggleAuthForm" to="/register">Register</Link> </p>
      </div>
    </main>
  );
};

export default Login;
