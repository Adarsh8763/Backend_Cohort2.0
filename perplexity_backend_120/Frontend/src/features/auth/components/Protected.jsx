import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useSelector } from "react-redux"
import "../../chat/styles/Chat.scss"

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading){
      return (
        <div className="app-loading">
          <div className="app-spinner" aria-label="Loading" />
        </div>
      )
    }

    if(!user){
      return <Navigate to="/login"/>
    }
  return children
}

export default Protected
