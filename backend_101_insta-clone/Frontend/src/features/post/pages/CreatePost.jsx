import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import '../style/createpost.scss'
import '../../shared/button.scss'
import { usePost } from '../hooks/usePost'

const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const postImgInputFieldRef = useRef(null)

    const navigate = useNavigate()

    const { handleCreatePost, loading } = usePost()

    async function handleSubmit(e){
        e.preventDefault()

        const file = postImgInputFieldRef.current.files[0]
        await handleCreatePost(file, caption)

        navigate("/")
    }
    if(loading){
        return (
            <main className="create-post-page">
                <div className="form-container">
                  <div className="form-header">
                    <p className="brand">Insta<span>.</span></p>
                    <p className="subtitle">Uploading your post…</p>
                  </div>
                </div>
            </main>
        )
    }

  return (
    <main className="create-post-page">
        <div className="form-container">
            <div className="form-header">
              <p className="brand">Insta<span>.</span></p>
              <p className="subtitle">Share a new moment with the world.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label className="postImg-label" htmlFor="postImg">
                  📷 &nbsp;Choose a photo
                </label>
                <input ref={postImgInputFieldRef} hidden type="file" name="postImg" id="postImg"/>
                <input value={caption} onChange={(e)=>{setCaption(e.target.value)}} type="text" name="caption" placeholder="Write a caption…"/>
                <button className="button primary-button">Share Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
