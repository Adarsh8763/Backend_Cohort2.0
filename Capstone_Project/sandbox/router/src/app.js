import express from 'express'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware'
import http from "http"


const app = express()

app.use(morgan('dev'))

app.get("/api/status/healthz", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.get("/api/status/readyz", (req, res) => {
    res.status(200).json({ status: "ready" })
})

const proxies = {}
const agentProxies = {}

function getProxy(sandboxId) {
    const target = `http://sandbox-service-${sandboxId}` // Jaha request forward karna hai

    if (!proxies[sandboxId]) {
        proxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true,

            onError(err, req, res) {
                console.error("PROXY ERROR:", err);
            }
        });
    }
    return proxies[sandboxId];
}

function getAgentProxy(sandboxId) {
    const target = `http://sandbox-service-${sandboxId}:3000` // Jaha request forward karna hai

    if (!agentProxies[sandboxId]) {
        agentProxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true,

            onError(err, req, res) {
                console.error("PROXY ERROR:", err);
            }
        });
    }
    return agentProxies[sandboxId];
}

app.use(async (req, res, next) => {
    const host = req.headers.host;
    const sandboxId = host.split('.')[0];

    // await refreshTTL(sandboxId);

    if (host.split('.')[1] === 'agent') {
        return getAgentProxy(sandboxId)(req, res, next);
    } else if (host.split('.')[1] === 'preview') {
        return getProxy(sandboxId)(req, res, next);
    }
});


/*
|--------------------------------------------------------------------------
| Why WebSocket Proxying?
|--------------------------------------------------------------------------
|
| Browser (Socket.IO Client)
|          ⇅ WebSocket
| Router Server (Proxy)
|          ⇅ WebSocket
| Agent Container (Socket.IO Server)
|
| The actual Socket.IO server runs inside the agent container.
| However, the browser cannot directly access the agent container
| because it is inside a Kubernetes pod and only the router service
| is publicly reachable.
|
| Therefore, the router must accept WebSocket upgrade requests and
| forward them to the correct agent container.
|
| Why WebSocket?
| - Terminal access is real-time and bidirectional.
| - User sends terminal input continuously.
| - Agent sends terminal output continuously.
| - HTTP request/response is not suitable because it closes after
|   each request.
|
| server.on("upgrade")
| - Triggered when a client requests a WebSocket connection.
| - Routes the connection to the correct sandbox/agent service.
|
| proxy.upgrade(req, socket, head)
| - Forwards the WebSocket connection from the browser to the
|   target agent container.
|
*/



// Create the HTTP server explicitly
const server = http.createServer(app);

server.on('upgrade', (req, socket, head) => {
    const host = req.headers.host;
    const sandboxId = host.split('.')[0];
    const type = host.split('.')[1];

    console.log(`WS upgrade request: ${host}, sandboxId: ${sandboxId}, type: ${type}`);
    console.log(`   URL: ${req.url}`);
    console.log(`   Headers:`, req.headers);

    socket.setMaxListeners(20);


    socket.once('error', (err) => {
        console.error(`❌ [SOCKET ERROR] ${sandboxId}:`, err.message);
    });

    socket.on('close', () => {
        console.log(`✗ [SOCKET CLOSED] ${sandboxId}`);
    });

    // WebSocket request cannot be forwarded like a normal HTTP request.
    // proxy.upgrade() forwards the WebSocket connection from the browser to the correct sandbox/agent service.

    if (type === 'agent') {
        const proxy = getAgentProxy(sandboxId)
        try {
            proxy.upgrade(req, socket, head);
            console.log(`✓ Upgrade forwarded to agent`);
        } catch (err) {
            console.error(`❌ [PROXY ERROR]`, err.message);
            socket.destroy();
        }
    } else if (type === 'preview') {
        const proxy = getProxy(sandboxId)
        try {
            proxy.upgrade(req, socket, head);
            console.log(`✓ Upgrade forwarded to preview`);
        } catch (err) {
            console.error(`❌ [PROXY ERROR]`, err.message);
            socket.destroy();
        }
    } else {
        console.error(`❌ Unknown type: ${type}, destroying socket`);
        socket.destroy();
    }
});

export default server