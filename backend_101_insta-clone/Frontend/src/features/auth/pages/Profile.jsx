import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import "../style/form.scss"
import "../../shared/button.scss"
import "./profile.scss"

const Profile = () => {
  const { user, loading, handleUpdateProfileImg } = useAuth()
  const navigate = useNavigate()
  const imgInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [status, setStatus] = useState("") // "success" | "error" | ""

  function onFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
    setStatus("")
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!selectedFile) return

    try {
      await handleUpdateProfileImg(selectedFile)
      setStatus("success")
      setSelectedFile(null)
    } catch (err) {
      setStatus("error")
    }
  }

  const currentImg = preview || (user && user.profileImg)

  return (
    <main className="auth-page">
      <div className="form-container">
        <div className="form-header">
          <p className="brand">Insta<span>.</span></p>
          <p className="subtitle">Update your profile picture.</p>
        </div>

        <div className="profile-avatar-wrapper">
          <div className="profile-avatar" onClick={() => imgInputRef.current.click()}>
            {currentImg
              ? <img src={currentImg} alt="Profile" />
              : <span className="avatar-placeholder">+</span>
            }
            <div className="avatar-overlay">Change</div>
          </div>
          {user && <p className="profile-username">{user.username}</p>}
        </div>

        <form onSubmit={onSubmit}>
          <input
            ref={imgInputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          <label
            className="postImg-label"
            onClick={() => imgInputRef.current.click()}
            style={{ cursor: "pointer" }}
          >
            📷 &nbsp;Choose a new photo
          </label>

          {status === "success" && (
            <p className="status-msg success">✓ Profile picture updated!</p>
          )}
          {status === "error" && (
            <p className="status-msg error">Something went wrong. Try again.</p>
          )}

          <button
            className="button primary-button"
            disabled={!selectedFile || loading}
          >
            {loading ? "Uploading…" : "Save Changes"}
          </button>
        </form>

        <p className="form-footer">
          <span
            onClick={() => navigate("/")}
            className="toggleAuthForm"
            style={{ cursor: "pointer" }}
          >
            ← Back to Feed
          </span>
        </p>
      </div>
    </main>
  )
}

export default Profile
