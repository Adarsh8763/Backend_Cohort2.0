import { useDispatch } from "react-redux";
import { register, login, getMe, logout, resendVerificationEmail } from "../service/auth.api"
import { setUser, setLoading, setError } from "../auth.slice"
import { useEffect } from "react";


export function useAuth(){

    const dispatch = useDispatch()

    async function handleRegister(email, username, password){
        try{
            dispatch(setLoading(true))
            const data = await register(email, username, password)
        }catch(err){
            dispatch(setError((err.response?.data?.message) || "Registration failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin(email, password){
        try{ 
            dispatch(setLoading(true))
            const data = await login(email, password)
            dispatch(setUser(data.user))
            console.log(data.user)
        }catch(err){
            dispatch(setError((err.response?.data?.message) || "Login failed"))
        }finally{
            dispatch(setLoading(false))
        }

    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(err){
            dispatch(setUser(null))
            dispatch(setError((err.response?.data?.message) || "Hydration failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogout(){
        try{
            dispatch(setLoading(true))
            await logout()
            dispatch(setUser(null))
        }catch(err){
            dispatch(setError((err.response?.data?.message) || "Logout failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleResendVerificationEmail(email){
        try{
            dispatch(setLoading(true))
            await resendVerificationEmail(email)
        }catch(err){
            dispatch(setError((err.response?.data?.message) || "Resend Verification Email failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        handleGetMe()
    },[])

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
        handleResendVerificationEmail
    }
}