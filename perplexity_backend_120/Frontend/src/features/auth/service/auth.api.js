import axios from "axios"

const api = axios.create({
    baseURL: "https://backend-cohort2-0-3-lx0x.onrender.com/api/auth",
    withCredentials: true
})

export async function register(username, email, password){
    const response = await api.post("/register", {
        username: username,
        email: email,
        password: password
    })
    return response.data
}

export async function login (email, password){
    const response = await api.post("/login", {
        email: email,
        password: password
    })
    return response.data
}

export async function getMe(){
    const response = await api.get("/get-me")
    return response.data
}

export async function logout(){
    const response = await api.post("/logout")
    return response.data
}

export async function resendVerificationEmail(email){
    const response = await api.post("/resend-verification-email", {
        email: email
    })
    return response.data
}