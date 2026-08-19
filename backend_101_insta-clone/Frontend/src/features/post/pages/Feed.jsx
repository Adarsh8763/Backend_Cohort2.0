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
      <main className="feed-page">
        <Nav/>
        <div className="feed">
          <p style={{color: 'var(--text-muted)', marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem'}}>Loading feed…</p>
        </div>
      </main>
    )
  }
  if(!feed){
    return (
      <main className="feed-page">
        <Nav/>
        <div className="feed">
          <p style={{color: 'var(--text-muted)', marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem'}}>No posts yet — log in or create one!</p>
        </div>
      </main>
    )
  }

  return (
    <main className="feed-page">
      <Nav/>
      <div className="feed">
        <div className="posts">
          {feed.map(post=>{
            return <Post key={post._id} user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
