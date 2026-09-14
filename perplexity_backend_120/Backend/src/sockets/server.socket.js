import { Server } from "socket.io"

let io
export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "https://backend-cohort2-0-3-lx0x.onrender.com",
            credentials: true
        }
    })

    console.log("Socket.io server is running")

    io.on("connection", (socket) => {
        console.log("New connection created")
    })
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.io is not initialized")
    }
    return io
}