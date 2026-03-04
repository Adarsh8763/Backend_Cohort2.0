import { useState } from "react";
import "../style/posts.scss";
import Post from "../components/Post"
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";

const Feed = () => {

  const {loading, feed, handleGetFeed} = usePost()

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
        <h1>No Feed is there in DB</h1>
      </main>
    )
  }

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed.map(post=>{
            return <Post user={post.user} post={post} />
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
