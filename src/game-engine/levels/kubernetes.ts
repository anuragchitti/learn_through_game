import { LevelDefinition } from "../types";

export const kubernetesLevels: LevelDefinition[] = [
  {
    id: "kubernetes-1",
    courseId: "kubernetes",
    number: 1,
    title: "What is Kubernetes?",
    description: "Kubernetes (K8s) is a container orchestration system for automating deployment, scaling, and management.",
    concept: "Kubernetes Overview",
    conceptExplanation:
      "Kubernetes (K8s) automates the deployment, scaling, and operation of containerized applications.\n\nWhy Kubernetes?\n• Run Docker containers at scale across many machines\n• Auto-restart crashed containers\n• Auto-scale based on load\n• Rolling updates with zero downtime\n• Service discovery and load balancing\n• Secret and config management\n\nKey concepts:\n• Cluster — a set of machines (nodes) running K8s\n• Node — a single machine (VM or bare metal)\n• Pod — smallest deployable unit; one or more containers\n• Service — stable network endpoint to reach pods\n• Deployment — desired state for running pods\n• Namespace — virtual cluster within a cluster\n\nUsed by: Netflix, Google, Airbnb, Spotify",
    codeExample: `# Check cluster status
kubectl cluster-info
kubectl get nodes

# Get all resources
kubectl get pods
kubectl get services
kubectl get deployments

# Describe a resource
kubectl describe pod my-pod-abc123

# Apply a config file
kubectl apply -f deployment.yaml

# See logs
kubectl logs my-pod-abc123

# Execute command in pod
kubectl exec -it my-pod-abc123 -- bash`,
    starterCode: `// Kubernetes: orchestrate containers at scale
const k8sOps = [
  { op: "get nodes",       dir: "right" },
  { op: "get pods",        dir: "right" },
  { op: "get services",    dir: "right" },
  { op: "apply config",    dir: "down" },
  { op: "check status",    dir: "right" },
];

for (const op of k8sOps) {
  hero.move(op.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const k8sOps = [
  { op: "get nodes",    dir: "right" },
  { op: "get pods",     dir: "right" },
  { op: "get services", dir: "right" },
  { op: "apply config", dir: "down" },
  { op: "check status", dir: "right" },
];

for (const op of k8sOps) {
  hero.move(op.dir);
}
hero.move("right");
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), right, down, down to exit.",
    tip: "Kubernetes is complex — start with managed K8s (GKE, EKS, AKS) rather than running your own cluster.",
  },

  {
    id: "kubernetes-2",
    courseId: "kubernetes",
    number: 2,
    title: "Pods",
    description: "A Pod is the smallest deployable unit in Kubernetes — one or more containers.",
    concept: "Pods",
    conceptExplanation:
      "Pods are the basic building block of Kubernetes.\n\nKey facts:\n• A pod contains one or more containers\n• Containers in a pod share network and storage\n• Pods are ephemeral — they can die and be replaced\n• Never create pods directly in production — use Deployments\n\nPod spec (YAML):\napiVersion: v1\nkind: Pod\nmetadata:\n  name: my-app\n  labels:\n    app: my-app\nspec:\n  containers:\n    - name: app\n      image: my-app:1.0\n      ports:\n        - containerPort: 3000\n      resources:\n        requests: { cpu: 100m, memory: 128Mi }\n        limits:   { cpu: 500m, memory: 512Mi }\n      env:\n        - name: NODE_ENV\n          value: production",
    codeExample: `# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
    version: "1.0"
spec:
  containers:
    - name: app
      image: my-app:1.0
      ports:
        - containerPort: 3000
      env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
      resources:
        requests:
          cpu: "100m"
          memory: "128Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"

# Apply and check
kubectl apply -f pod.yaml
kubectl get pods -w  # watch status`,
    starterCode: `// Pod: one unit = one or more containers
const podSpec = {
  containers: ["app", "sidecar"],
  env: ["DATABASE_URL", "NODE_ENV"],
  resources: ["cpu", "memory"],
};

for (const c of podSpec.containers) {
  hero.move("right");
}
hero.move("down");
for (const e of podSpec.env) {
  hero.move("right");
}`,
    solutionCode: `const podSpec = {
  containers: ["app", "sidecar"],
  env: ["DATABASE_URL", "NODE_ENV"],
};

for (const c of podSpec.containers) {
  hero.move("right");
}
hero.move("down");
for (const e of podSpec.env) {
  hero.move("right");
}`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "2 containers → right×2 (gems), down, 2 env vars → right×2 (gems+exit).",
    tip: "Set resource requests and limits on every container — without them, a noisy pod can crash your node.",
  },

  {
    id: "kubernetes-3",
    courseId: "kubernetes",
    number: 3,
    title: "Deployments",
    description: "Deployments manage the desired state of your pods — how many, which image, rollout strategy.",
    concept: "Deployments & ReplicaSets",
    conceptExplanation:
      "A Deployment manages ReplicaSets which manage Pods.\n\nKey capabilities:\n• Desired replica count — K8s keeps this many pods running\n• Rolling update — update pods gradually without downtime\n• Rollback — revert to previous deployment version\n• Self-healing — restart crashed pods automatically\n\nDeployment YAML:\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1       # allow 1 extra pod during update\n      maxUnavailable: 0 # never go below 3 during update\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n        - name: app\n          image: my-app:2.0",
    codeExample: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:2.0
          ports:
            - containerPort: 3000

# Commands
kubectl apply -f deployment.yaml
kubectl rollout status deployment/my-app
kubectl rollout undo deployment/my-app  # rollback`,
    starterCode: `// Deployment: manage N replicas
function deploy(replicas, steps) {
  // Scale to desired replicas
  for (let i = 0; i < replicas; i++) {
    hero.move("right");
  }
  hero.move("down");
  // Rolling update steps
  for (const step of steps) {
    hero.move(step.dir);
  }
}

deploy(3, [{ dir: "right" }, { dir: "right" }]);`,
    solutionCode: `function deploy(replicas, steps) {
  for (let i = 0; i < replicas; i++) {
    hero.move("right");
  }
  hero.move("down");
  for (const step of steps) {
    hero.move(step.dir);
  }
}

deploy(3, [{ dir: "right" }, { dir: "right" }]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "3 replicas → right×3 (gems), down, rolling update → right×2 (gems+exit).",
    tip: "Set maxUnavailable: 0 in your rolling update strategy to ensure zero-downtime deploys.",
  },

  {
    id: "kubernetes-4",
    courseId: "kubernetes",
    number: 4,
    title: "Services",
    description: "Services give pods a stable network endpoint — even as pods come and go.",
    concept: "Kubernetes Services",
    conceptExplanation:
      "Pods have dynamic IPs — they change every restart. Services provide a stable endpoint.\n\nService types:\n• ClusterIP (default) — internal IP only, within cluster\n• NodePort — exposes on each node's IP at a static port\n• LoadBalancer — provisions cloud load balancer (ELB, etc.)\n• ExternalName — maps to an external DNS name\n\nService YAML:\napiVersion: v1\nkind: Service\nmetadata:\n  name: my-app-svc\nspec:\n  selector:\n    app: my-app  # matches pod labels\n  ports:\n    - port: 80\n      targetPort: 3000\n  type: ClusterIP\n\nDNS: other pods reach this service at:\nmy-app-svc.namespace.svc.cluster.local",
    codeExample: `# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
  namespace: production
spec:
  selector:
    app: my-app
  ports:
    - name: http
      port: 80
      targetPort: 3000
    - name: metrics
      port: 9090
      targetPort: 9090
  type: ClusterIP

---
# LoadBalancer for external traffic
apiVersion: v1
kind: Service
metadata:
  name: my-app-lb
spec:
  selector:
    app: my-app
  ports:
    - port: 443
      targetPort: 3000
  type: LoadBalancer`,
    starterCode: `// Service: stable endpoint for pods
const serviceTypes = [
  { type: "ClusterIP",    dir: "right" }, // internal
  { type: "NodePort",     dir: "right" }, // node exposed
  { type: "LoadBalancer", dir: "down" },  // cloud LB
  { type: "ExternalName", dir: "right" }, // external DNS
];

for (const svc of serviceTypes) {
  hero.move(svc.dir);
}
hero.move("right");`,
    solutionCode: `const serviceTypes = [
  { type: "ClusterIP",    dir: "right" },
  { type: "NodePort",     dir: "right" },
  { type: "LoadBalancer", dir: "down" },
  { type: "ExternalName", dir: "right" },
];

for (const svc of serviceTypes) {
  hero.move(svc.dir);
}
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems+exit).",
    tip: "Use ClusterIP for internal services, LoadBalancer for external. Avoid NodePort in production.",
  },

  {
    id: "kubernetes-5",
    courseId: "kubernetes",
    number: 5,
    title: "ConfigMaps & Secrets",
    description: "Store configuration and sensitive data separately from your container image.",
    concept: "Configuration Management",
    conceptExplanation:
      "Never bake config or secrets into images. K8s provides two mechanisms:\n\nConfigMap — non-sensitive config:\n• Environment variables\n• Config files mounted as volumes\n• Command-line arguments\n\nSecret — sensitive data (base64 encoded):\n• Passwords, API keys, TLS certs\n• Stored in etcd (encrypt etcd at rest in production!)\n• Referenced as env vars or volumes\n\nCreating:\nkubectl create configmap app-config --from-file=config.json\nkubectl create secret generic db-secret --from-literal=password=secret123\n\nBest practice for secrets:\n• Use external secret managers (AWS Secrets Manager, Vault)\n• Never commit secrets to git\n• Enable etcd encryption at rest",
    codeExample: `# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  NODE_ENV: production
  LOG_LEVEL: info
  MAX_CONNECTIONS: "100"

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  password: c2VjcmV0MTIz  # base64: secret123
  url: cG9zdGdyZXM6Ly8...

# Use in pod:
env:
  - name: NODE_ENV
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: NODE_ENV
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-secret
        key: password`,
    starterCode: `// ConfigMap: non-sensitive config
// Secret: sensitive data
function applyConfig(configs, secrets) {
  for (const c of configs) {
    hero.move("right"); // configmap env var
  }
  hero.move("down");
  for (const s of secrets) {
    hero.move("right"); // secret ref
  }
  hero.move("down");
}

applyConfig(
  ["NODE_ENV", "LOG_LEVEL", "MAX_CONN"],
  ["DB_PASSWORD", "API_KEY"]
);`,
    solutionCode: `function applyConfig(configs, secrets) {
  for (const c of configs) {
    hero.move("right");
  }
  hero.move("down");
  for (const s of secrets) {
    hero.move("right");
  }
  hero.move("down");
}

applyConfig(
  ["NODE_ENV", "LOG_LEVEL", "MAX_CONN"],
  ["DB_PASSWORD", "API_KEY"]
);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "3 configs → right×3 (gems), down, 2 secrets → right×2 (gems), down, down to exit.",
    tip: "Use Sealed Secrets or External Secrets Operator to safely store encrypted secrets in git.",
  },

  {
    id: "kubernetes-6",
    courseId: "kubernetes",
    number: 6,
    title: "Ingress",
    description: "Ingress routes external HTTP/S traffic to services inside the cluster.",
    concept: "Ingress & Ingress Controllers",
    conceptExplanation:
      "Ingress manages external HTTP/HTTPS access to services.\n\nWithout Ingress: one LoadBalancer per service = expensive.\nWith Ingress: one LoadBalancer for all services, routed by rules.\n\nIngress requires an Ingress Controller (nginx, Traefik, etc.).\n\nExample routing:\n• api.myapp.com → api-service:80\n• myapp.com → frontend-service:80\n• myapp.com/admin → admin-service:80\n\nFeatures:\n• TLS termination (HTTPS)\n• Path-based routing\n• Host-based routing\n• Rate limiting\n• Auth middleware\n\nInstall nginx ingress controller:\nkubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.0/deploy/static/provider/cloud/deploy.yaml",
    codeExample: `# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - myapp.com
        - api.myapp.com
      secretName: myapp-tls
  rules:
    - host: myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-svc
                port: { number: 80 }
    - host: api.myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api-svc
                port: { number: 80 }`,
    starterCode: `// Ingress: route external traffic to services
const routes = [
  { host: "myapp.com",     svc: "frontend", dir: "right" },
  { host: "api.myapp.com", svc: "api",      dir: "right" },
  { host: "tls/https",     svc: "cert",     dir: "down" },
  { host: "path /admin",   svc: "admin",    dir: "right" },
];

for (const route of routes) {
  hero.move(route.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const routes = [
  { host: "myapp.com",     svc: "frontend", dir: "right" },
  { host: "api.myapp.com", svc: "api",      dir: "right" },
  { host: "tls/https",     svc: "cert",     dir: "down" },
  { host: "path /admin",   svc: "admin",    dir: "right" },
];

for (const route of routes) {
  hero.move(route.dir);
}
hero.move("right");
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), right, down, down to exit.",
    tip: "Use cert-manager with Let's Encrypt for free automatic TLS certificates in your Ingress.",
  },

  {
    id: "kubernetes-7",
    courseId: "kubernetes",
    number: 7,
    title: "Horizontal Pod Autoscaler",
    description: "HPA automatically scales the number of pods based on CPU, memory, or custom metrics.",
    concept: "Autoscaling",
    conceptExplanation:
      "Kubernetes can scale your application automatically:\n\n1. HPA (Horizontal Pod Autoscaler):\n   • Adds/removes pod replicas\n   • Based on CPU, memory, or custom metrics\n   • Requires metrics-server installed\n\n2. VPA (Vertical Pod Autoscaler):\n   • Adjusts CPU/memory requests for pods\n\n3. Cluster Autoscaler:\n   • Adds/removes nodes from the cluster\n\nHPA example:\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: my-app\n  minReplicas: 2\n  maxReplicas: 20\n  metrics:\n    - type: Resource\n      resource:\n        name: cpu\n        target:\n          type: Utilization\n          averageUtilization: 70",
    codeExample: `# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80

# Quick HPA
kubectl autoscale deployment my-app --cpu-percent=70 --min=2 --max=20
kubectl get hpa  # watch scaling`,
    starterCode: `// HPA: scale pods based on metrics
function autoscale(currentLoad, minReplicas, maxReplicas) {
  let replicas = minReplicas;
  // Scale up if high load
  while (replicas < maxReplicas && currentLoad > 70) {
    replicas++;
    hero.move("right");
    currentLoad -= 20; // each pod reduces load
  }
  hero.move("down");
  // Hold steady
  for (let i = 0; i < replicas - minReplicas; i++) {
    hero.move("right");
  }
}

autoscale(130, 2, 5);`,
    solutionCode: `function autoscale(currentLoad, minReplicas, maxReplicas) {
  let replicas = minReplicas;
  while (replicas < maxReplicas && currentLoad > 70) {
    replicas++;
    hero.move("right");
    currentLoad -= 20;
  }
  hero.move("down");
  for (let i = 0; i < replicas - minReplicas; i++) {
    hero.move("right");
  }
}

autoscale(130, 2, 5);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Load 130: scale up 3 times → right×3 (gems), down, steady → right×2 (gems+exit).",
    tip: "Always set minReplicas ≥ 2 for production — a single pod means any restart causes downtime.",
  },

  {
    id: "kubernetes-8",
    courseId: "kubernetes",
    number: 8,
    title: "Namespaces & RBAC",
    description: "Namespaces partition a cluster; RBAC controls who can do what.",
    concept: "Namespaces & Access Control",
    conceptExplanation:
      "Namespaces provide virtual clusters within a physical cluster.\n\nDefault namespaces:\n• default — where resources go if not specified\n• kube-system — Kubernetes internals\n• kube-public — readable by all users\n\nBest practice: one namespace per environment/team\n• production, staging, development\n• team-frontend, team-backend\n\nRBAC (Role-Based Access Control):\n• Role — permissions within a namespace\n• ClusterRole — cluster-wide permissions\n• RoleBinding — grants a Role to a user/SA\n• ServiceAccount — identity for pods\n\nExample: give a CI/CD bot permission to deploy:\n1. Create ServiceAccount ci-bot\n2. Create Role with deploy permissions\n3. Bind the role to the service account",
    codeExample: `# Create namespace
kubectl create namespace production

# Apply to specific namespace
kubectl apply -f app.yaml -n production

# RBAC: role that allows deployments
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: deployer
rules:
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get","list","create","update","patch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: deployer-binding
  namespace: production
subjects:
  - kind: ServiceAccount
    name: ci-bot
    namespace: production
roleRef:
  kind: Role
  name: deployer
  apiGroup: rbac.authorization.k8s.io`,
    starterCode: `// Namespaces + RBAC: isolate and control access
const nsSetup = [
  { step: "create ns production",  dir: "right" },
  { step: "create ns staging",     dir: "right" },
  { step: "create ServiceAccount", dir: "down" },
  { step: "create Role",           dir: "right" },
  { step: "create RoleBinding",    dir: "right" },
];

for (const s of nsSetup) {
  hero.move(s.dir);
}
hero.move("down");`,
    solutionCode: `const nsSetup = [
  { step: "create ns production",  dir: "right" },
  { step: "create ns staging",     dir: "right" },
  { step: "create ServiceAccount", dir: "down" },
  { step: "create Role",           dir: "right" },
  { step: "create RoleBinding",    dir: "right" },
];

for (const s of nsSetup) {
  hero.move(s.dir);
}
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Apply the principle of least privilege — give service accounts only the permissions they need, nothing more.",
  },

  {
    id: "kubernetes-9",
    courseId: "kubernetes",
    number: 9,
    title: "Persistent Storage",
    description: "Pods are ephemeral — use PersistentVolumes to store data that survives pod restarts.",
    concept: "PV, PVC & StorageClass",
    conceptExplanation:
      "Containers are ephemeral — data dies with the pod. PersistentVolumes survive.\n\nConcepts:\n• PersistentVolume (PV) — actual storage (disk, NFS, cloud)\n• PersistentVolumeClaim (PVC) — request for storage\n• StorageClass — defines the storage type (auto-provision)\n\nFlow:\n1. Admin creates PV (or cloud StorageClass auto-provisions)\n2. Dev creates PVC requesting size/access mode\n3. K8s binds PVC to PV\n4. Pod mounts the PVC as a volume\n\nAccess modes:\n• ReadWriteOnce (RWO) — one node read+write\n• ReadOnlyMany (ROX) — many nodes read-only\n• ReadWriteMany (RWX) — many nodes read+write\n\nUse cases: databases (PostgreSQL, MongoDB), file uploads, ML model storage",
    codeExample: `# pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: standard
  resources:
    requests:
      storage: 20Gi

---
# Use PVC in a pod
spec:
  containers:
    - name: postgres
      image: postgres:16
      volumeMounts:
        - name: pgdata
          mountPath: /var/lib/postgresql/data
  volumes:
    - name: pgdata
      persistentVolumeClaim:
        claimName: postgres-pvc`,
    starterCode: `// PVC: claim storage for pods
function setupStorage(steps) {
  for (const step of steps) {
    hero.move(step.dir);
  }
}

setupStorage([
  { step: "create StorageClass", dir: "right" },
  { step: "create PVC 20Gi",    dir: "right" },
  { step: "bind to PV",         dir: "right" },
  { step: "mount in pod",       dir: "down" },
  { step: "write data",         dir: "right" },
  { step: "pod restarts",       dir: "right" },
  { step: "data persists",      dir: "down" },
]);`,
    solutionCode: `function setupStorage(steps) {
  for (const step of steps) {
    hero.move(step.dir);
  }
}

setupStorage([
  { step: "create StorageClass", dir: "right" },
  { step: "create PVC 20Gi",    dir: "right" },
  { step: "bind to PV",         dir: "right" },
  { step: "mount in pod",       dir: "down" },
  { step: "write data",         dir: "right" },
  { step: "pod restarts",       dir: "right" },
  { step: "data persists",      dir: "down" },
]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), down, down to exit.",
    tip: "For databases in K8s, use StatefulSets instead of Deployments — they provide stable network identities and ordered scaling.",
  },

  {
    id: "kubernetes-10",
    courseId: "kubernetes",
    number: 10,
    title: "Grand Finale",
    description: "Deploy a full production app with Deployment, Service, Ingress, HPA, ConfigMap, and PVC.",
    concept: "Production K8s",
    conceptExplanation:
      "A complete production Kubernetes deployment includes:\n\n1. Namespace per environment\n2. Deployment with rolling update strategy\n3. HPA for autoscaling\n4. Service (ClusterIP for internal, LoadBalancer for external)\n5. Ingress with TLS and routing rules\n6. ConfigMap for app config\n7. Secrets for credentials (external secret manager in production)\n8. PVC for stateful data (if needed)\n9. ResourceQuotas on namespaces\n10. Network Policies for pod-to-pod firewall\n\nHelm — Kubernetes package manager:\n• Package K8s manifests as charts\n• helm install my-app ./chart\n• helm upgrade / rollback\n\nTools: k9s (terminal UI), Lens (GUI), ArgoCD (GitOps), Flux",
    codeExample: `# Full production deployment script
kubectl apply -f namespace.yaml          # ns production
kubectl apply -f configmap.yaml          # app config
kubectl apply -f secret.yaml             # credentials
kubectl apply -f pvc.yaml                # storage
kubectl apply -f deployment.yaml         # app pods
kubectl apply -f service.yaml            # ClusterIP
kubectl apply -f ingress.yaml            # HTTPS routing
kubectl apply -f hpa.yaml                # autoscaling
kubectl apply -f network-policy.yaml     # firewall

# Verify
kubectl -n production get all
kubectl -n production get ingress
kubectl -n production get hpa

# Watch rollout
kubectl -n production rollout status deployment/my-app`,
    starterCode: `// Grand finale: full K8s production deploy
const deployment = [
  { resource: "namespace",   dir: "right" },
  { resource: "configmap",   dir: "right" },
  { resource: "deployment",  dir: "down" },
  { resource: "service",     dir: "right" },
  { resource: "ingress",     dir: "right" },
  { resource: "hpa",         dir: "down" },
  { resource: "verify",      dir: "right" },
];

for (const d of deployment) {
  hero.move(d.dir);
}`,
    solutionCode: `const deployment = [
  { resource: "namespace",  dir: "right" },
  { resource: "configmap",  dir: "right" },
  { resource: "deployment", dir: "down" },
  { resource: "service",    dir: "right" },
  { resource: "ingress",    dir: "right" },
  { resource: "hpa",        dir: "down" },
  { resource: "verify",     dir: "right" },
];

for (const d of deployment) {
  hero.move(d.dir);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "ns+cm: right×2 (gems), deploy: down, svc+ingress: right×2 (gems), hpa: down, verify: right (gem), down to exit.",
    tip: "Use Helm to manage K8s deployments — it keeps your manifests DRY and makes upgrades and rollbacks trivial.",
  },
];
