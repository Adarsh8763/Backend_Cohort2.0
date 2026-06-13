import express from 'express'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware'


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

app.use((req, res, next) => {
    const host = req.headers.host
    const sandboxId = host.split('.')[0] // Extract sandbox ID from subdomain

    if (host.split(".")[1] === 'agent') {
        return getAgentProxy(sandboxId)(req, res, next)
    }
    else if (host.split(".")[1] === "preview") {
        return getProxy(sandboxId)(req, res, next) // "Sandbox ID ke hisab se proxy middleware lao, aur us middleware ko current request (req, res, next) ke saath execute kar do."
    }

})

export default app