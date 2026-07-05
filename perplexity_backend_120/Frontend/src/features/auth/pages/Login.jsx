import { useState } from "react";
import "../style/form.scss";
import FormGroup from "../components/FormGroup";
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
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-mark">P</div>
            <span className="auth-logo-name">Perplexity</span>
          </div>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your research</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormGroup
            id="email"
            type="text"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <FormGroup
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link className="toggleAuthForm" to="/register">Create account</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;

