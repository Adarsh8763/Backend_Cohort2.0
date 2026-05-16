import { setUser, setLoading, setError } from "../state/auth.slice.js"
import { register, login } from "../service/auth.api.js"
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
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email, password}) {
        try{
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Log in failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin
    }
}
