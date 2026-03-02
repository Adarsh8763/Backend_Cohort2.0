import { createContext, useState } from "react";
import {login, register, getMe} from "./services/auth.api"

export const AuthContext = createContext()  //Creates an empty container to hold global data

// AuthProvider is a wrapper element
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)  //Since in starting no user is logged in that's why null
    const [loading, setLoading] = useState(false)

    const handleLogin = async (username, password) => {
        setLoading(true)

        try{
            const response = await login (username, password)
            setUser(response.user)
            return response
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {

        setLoading(true)

        try{
            const response = await register(username, email, password)
            setUser(response.user)
            return response
        }catch(err){

        }finally{
            setLoading(false)
        }
    }

    return(
        // Provider => fills the AuthContext container with value
        // Niche pura code ka mtlb => iske andar jo bhi children h wo wrap ho gya <AuthContext.Provider> andar and wo ab ke gloablly availabel chizo ko direct use kr skta h
        <AuthContext.Provider value = {{user, loading, handleLogin, handleRegister}}>
            {children}    
        </AuthContext.Provider>
    )
}