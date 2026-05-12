import axios from "axios"

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})


export async function register({fullname, email, password, contact, isSeller}){
    const response = await authApiInstance.post("/register",{
        fullname, email, password, contact, isSeller
    })
    return response.data
}