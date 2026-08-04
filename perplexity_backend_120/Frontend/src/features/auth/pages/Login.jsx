import { useState, useEffect } from "react";
import "../style/form.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate, useLocation } from "react-router"
import { useAuth } from "../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { clearError, setError } from "../auth.slice";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  const error = useSelector(state => state.auth.error)

  const { handleLogin } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Message passed from Register (on success or user-already-exists redirect)
  const infoMessage = location.state?.message || null

  useEffect(() => {
    dispatch(clearError())
    return () => { dispatch(clearError()) }
  }, [])


  function validate() {
    if (!email.trim()) return "Email is required."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address (e.g. user@example.com)."
    if (!password) return "Password is required."
    return null
  }

  async function handleSubmit(e){
    e.preventDefault()
    dispatch(clearError())

    const validationError = validate()
    if (validationError) {
      dispatch(setError(validationError))
      return
    }

    await handleLogin(email, password)
  }

  if(!loading && user){
    return <Navigate to="/" replace />
  }
  
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-mark">V</div>
            <span className="auth-logo-name">Vasuk AI</span>
          </div>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your research</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {infoMessage && (
            <div className="auth-info" role="status">
              <svg className="auth-info-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>{infoMessage}</span>
            </div>
          )}
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
          {error && (
            <div className="auth-error" role="alert">
              <svg className="auth-error-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
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
