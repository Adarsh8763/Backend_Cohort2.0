import { useContext } from "react";
import { PostContext } from "../post.context";


export function usePost() {
  const context = useContext(PostContext)

  return context
}