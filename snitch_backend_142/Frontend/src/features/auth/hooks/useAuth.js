import { setUser, setLoading, setError } from "../state/auth.slice.js"
import { register } from "../service/auth.service.js"
import { useDispatch } from "react-redux"


export function useAuth() {

    const dispatch = useDispatch()

    async function handleRegister({ fullname, email, password, contact, isSeller }) {
        try{
            dispatch(setLoading(true))
            const data = await register({ fullname, email, password, contact, isSeller })
            dispatch(setUser(data.user))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Registeration failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister
    }
}
