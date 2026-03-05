import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import '../style/createpost.scss'
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
            <main>
                <h1>Creating Post</h1>
            </main>
        )
    }

  return (
    <main className="create-post-page">
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label className="postImg-label" htmlFor="postImg">Select Image</label>
                <input ref={postImgInputFieldRef} hidden type="file" name="postImg" id="postImg"/>
                <input value={caption} onChange={(e)=>{setCaption(e.target.value)}} type="text" name="caption"/>
                <button className="button primary-button">Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
