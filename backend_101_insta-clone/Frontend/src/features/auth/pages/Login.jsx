import { useState } from "react";
import "../style/form.scss";
import "../../shared/button.scss"
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <main className="auth-page">
        <div className="form-container">
          <div className="form-header">
            <p className="brand">Insta<span>.</span></p>
            <p className="subtitle">Signing you in…</p>
          </div>
        </div>
      </main>
    );
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    handleLogin(username, password).then((res) => {
      console.log(res);

      if(res){
        navigate("/");
      }
    });

    setUsername("");
    setPassword("");
  }

  return (
    <main className="auth-page">
      <div className="form-container">
        <div className="form-header">
          <p className="brand">Insta<span>.</span></p>
          <p className="subtitle">Welcome back — sign in to continue.</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            value={username}
            placeholder="Username"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
          />
          <button className="button primary-button">Sign In</button>
        </form>
        <p className="form-footer">
          New here?
          <Link className="toggleAuthForm" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
