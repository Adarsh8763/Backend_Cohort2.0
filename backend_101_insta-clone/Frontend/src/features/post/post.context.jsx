import { useState } from "react"
import { createContext } from "react"
import { getFeed } from "./services/post.api"


export const PostContext = createContext()

export const PostProvider = ({children}) => {

  const [loading, setLoading] = useState(false)
  const [feed, seFeed] = useState(null)

  const handleGetFeed = async () => {
    setLoading(true)
    try{
      const response = await getFeed()
      seFeed(response.feed)
      return response
    }catch(err){
      throw err
    }finally{
      setLoading(false)
    }
  }

  return (
    <PostContext.Provider value={{loading, feed, handleGetFeed}}>
        {children}
    </PostContext.Provider>
  )
}

export default PostProvider
