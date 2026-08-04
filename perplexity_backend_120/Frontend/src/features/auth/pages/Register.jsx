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
  const [localError, setLocalError] = useState(null);

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  // Password strength rules
  const passwordRules = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
    { label: "One lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
    { label: "One number (0–9)", test: (p) => /[0-9]/.test(p) },
    { label: "One special character (!@#$…)", test: (p) => /[^A-Za-z0-9]/.test(p) },
  ]

  const isPasswordWeak = password.length > 0 && !passwordRules.every(r => r.test(password))
  const showPasswordHints = password.length > 0 && isPasswordWeak

  function validate() {
    if (!username.trim()) return "Username is required."
    if (!email.trim()) return "Email is required."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address (e.g. user@example.com)."
    if (!password) return "Password is required."
    if (isPasswordWeak) return "Password does not meet the requirements listed below."
    return null
  }

  async function handleSubmit(e){
    e.preventDefault()
    setLocalError(null)

    const validationError = validate()
    if (validationError) {
      setLocalError(validationError)
      return
    }

    const result = await handleRegister(username, email, password)

    if (result?.success) {
      navigate("/login", { replace: true, state: { message: "Account created! Please verify your email before signing in." } })
      return
    }

    if (result?.status === 409) {
      navigate("/login", { replace: true, state: { message: "An account with this email/username already exists. Please sign in." } })
      return
    }

    // Any other server error
    if (!result?.success) {
      setLocalError(result?.message || "Registration failed. Please try again.")
    }
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

          {showPasswordHints && (
            <div className="password-hints" role="list" aria-label="Password requirements">
              {passwordRules.map((rule) => (
                <div
                  key={rule.label}
                  className={`password-hint-item ${rule.test(password) ? "met" : "unmet"}`}
                  role="listitem"
                >
                  <span className="hint-icon">{rule.test(password) ? "✓" : "✗"}</span>
                  <span>{rule.label}</span>
                </div>
              ))}
            </div>
          )}

          {localError && (
            <div className="auth-error" role="alert">
              <svg className="auth-error-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>{localError}</span>
            </div>
          )}
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
