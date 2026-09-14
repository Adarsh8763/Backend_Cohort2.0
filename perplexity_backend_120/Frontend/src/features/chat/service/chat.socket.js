import { io } from "socket.io-client"

export const initializeSocketconnection = () => {
    const socket = io("https://backend-cohort2-0-3-lx0x.onrender.com", {
        withCredentials: true
    })

    socket.on("connect", ()=>{
        console.log("Connected to socket.io server")
    })
}