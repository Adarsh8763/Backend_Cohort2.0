import { useState } from "react";
import "../style/form.scss";
import FormGroup from "../components/FormGroup";
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
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-mark">P</div>
            <span className="auth-logo-name">Perplexity</span>
          </div>
          <h1>Create your account</h1>
          <p className="auth-subtitle">Start exploring with AI-powered search</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormGroup
            id="username"
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => { setUsername(e.target.value) }}
          />
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
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link className="toggleAuthForm" to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  )
}

export default Register

