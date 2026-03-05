import { useState } from "react"
import { createContext } from "react"
import { getFeed, likePost, unlikePost, createPost } from "./services/post.api"

export const PostContext = createContext()

export const PostProvider = ({children}) => {

  const [loading, setLoading] = useState(false)
  const [feed, setFeed] = useState(null)

  const handleGetFeed = async () => {
    setLoading(true)
    try{
      const response = await getFeed()
      setFeed(response.feed.reverse())
      return response
    }catch(err){
      throw err
    }finally{
      setLoading(false)
    }
  }

  const handleLikePost = async (postId) => {
    try{
      const response = await likePost(postId)
      await handleGetFeed()
      return response
    }catch(err){
      throw err
    }
  }

  const handleUnlikePost = async (postId) => {
    try{
      const response = await unlikePost(postId)
      await handleGetFeed()
      return response
    }catch(err){
      throw err
    }
  }

  const handleCreatePost = async (imgFile, caption) => {
    setLoading(true)

    try{
      const response = await createPost(imgFile, caption)
      await handleGetFeed()
    }catch(err){
      throw err
    }finally{
      setFeed(false)
    }
  }

  return (
    <PostContext.Provider value={{loading, feed, handleGetFeed, handleLikePost, handleUnlikePost, handleCreatePost}}>
        {children}
    </PostContext.Provider>
  )
}

export default PostProvider
