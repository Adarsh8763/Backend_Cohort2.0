import { useState } from "react";
import "../style/posts.scss";
import Post from "../components/Post"
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import Nav from "../../shared/components/Nav"

const Feed = () => {

  const {loading, feed, handleGetFeed, handleLikePost, handleUnlikePost} = usePost()

  useEffect(() => {
    handleGetFeed()
  },[])

  if (loading){
    return(
      <main>
        <h1>Feed is loading...</h1>
      </main>
    )
  }
  if(!feed){
    return (
      <main>
        <h1>No Feed is there in DB or U haven't logged in yet</h1>
      </main>
    )
  }

  return (
    <main className="feed-page">
      <Nav/>
      <div className="feed">
        <div className="posts">
          {feed.map(post=>{
            return <Post user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
