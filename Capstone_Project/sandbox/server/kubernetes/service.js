import { k8sCoreV1Api } from "./config.js"

export async function createService(sandboxId) {
    const serviceManifest = {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                app: "sanbox",
                sandboxId: sandboxId
            }
        },
        spec: {
            selector: {
                sandboxId: sandboxId
            },
            type: "ClusterIP",
            ports: [
                {
                    port: 80,
                    targetPort: 5173,
                    name: "http",
                    protocol: "TCP"
                },
                {
                    port: 3000,
                    targetPort: 3000,
                    name: "agent-http",
                    protocol: "TCP"
                }
            ]
        }
    }

    const response = await k8sCoreV1Api.createNamespacedService({
        namespace: "default",
        body: serviceManifest
    });

    return response
}