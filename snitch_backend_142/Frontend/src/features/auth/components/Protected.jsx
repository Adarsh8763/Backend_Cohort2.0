import {useSelector} from 'react-redux'
import { Navigate } from "react-router"

const Protected = ({children, allowedRoles}) => {

    const user = useSelector(state=> state.auth.user)
    const loading = useSelector (state=>state.auth.loading)

    if(loading){
        return <div>Loading...</div>
    }
    // console.log(user)

    if(!user){
        return <Navigate to="/login"/>
    }

    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to="/"/>
    }

  return children
}

export default Protected
