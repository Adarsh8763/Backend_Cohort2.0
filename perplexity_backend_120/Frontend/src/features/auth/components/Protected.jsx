import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useSelector } from "react-redux"

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading){
      return <h1>Loading</h1>
    }

    if(!user){
      return <Navigate to="/login"/>
    }
  return children
}

export default Protected
