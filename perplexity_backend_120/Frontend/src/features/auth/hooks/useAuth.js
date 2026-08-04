import { useDispatch } from "react-redux";
import { register, login, getMe, logout, resendVerificationEmail } from "../service/auth.api"
import { setUser, setLoading } from "../auth.slice"
import { useEffect } from "react";


export function useAuth(){

    const dispatch = useDispatch()

    async function handleRegister(username, email, password){
        try{
            dispatch(setLoading(true))
            const data = await register(username, email, password)
            return { success: true, status: 201 }
        }catch(err){
            const status = err.response?.status
            const message =
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg ||
                "Registration failed"
            return { success: false, status, message }
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin(email, password){
        try{ 
            dispatch(setLoading(true))
            const data = await login(email, password)
            dispatch(setUser(data.user))
            return { success: true }
        }catch(err){
            const status = err.response?.status
            const serverMsg = err.response?.data?.message
            let msg = serverMsg || "Login failed"
            if (status === 400 && serverMsg?.toLowerCase().includes("verify")) {
                msg = "Please verify your email before logging in. Check your inbox."
            } else if (status === 401) {
                msg = "Invalid credentials. Please verify your email is correct or register first."
            }
            return { success: false, error: msg }
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
            await resendVerificationEmail(email)
            return { success: true }
        }catch(err){
            const message = err.response?.data?.message || "Failed to resend verification email."
            return { success: false, message }
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