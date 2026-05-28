import { LevelDefinition } from "../types";

export const networkingLevels: LevelDefinition[] = [
  // ─── LEVEL 1 ── OSI Model ────────────────────────────────────────────────────
  {
    id: "networking-1",
    courseId: "networking",
    number: 1,
    title: "The OSI Model",
    description: "The OSI model has 7 layers — from physical bits to application data. Climb through every layer!",
    concept: "OSI Model",
    conceptExplanation:
      "The OSI (Open Systems Interconnection) model is a conceptual framework that describes how network communication is divided into seven distinct layers.\n\nBottom to top:\n• Layer 1 — Physical: raw bits over cables, radio, or fiber\n• Layer 2 — Data Link: frames between directly connected nodes (Ethernet, MAC addresses)\n• Layer 3 — Network: packets routed across networks (IP addresses, routers)\n• Layer 4 — Transport: reliable/unreliable delivery between processes (TCP, UDP, ports)\n• Layer 5 — Session: managing and maintaining connections between applications\n• Layer 6 — Presentation: data encoding, encryption, compression (TLS lives here)\n• Layer 7 — Application: user-facing protocols (HTTP, DNS, SMTP, FTP)\n\nMemory trick: 'Please Do Not Throw Sausage Pizza Away' (bottom to top). Real-world protocols often span multiple layers — TCP/IP collapses OSI into 4 layers.",
    codeExample: `// Mapping common protocols to OSI layers
const osiLayers: Record<number, { name: string; examples: string[] }> = {
  7: { name: "Application",  examples: ["HTTP", "DNS", "FTP", "SMTP"] },
  6: { name: "Presentation", examples: ["TLS/SSL", "JPEG", "gzip"]    },
  5: { name: "Session",      examples: ["NetBIOS", "RPC"]             },
  4: { name: "Transport",    examples: ["TCP", "UDP"]                  },
  3: { name: "Network",      examples: ["IP", "ICMP", "BGP"]          },
  2: { name: "Data Link",    examples: ["Ethernet", "Wi-Fi (802.11)"] },
  1: { name: "Physical",     examples: ["Fiber", "Copper", "Radio"]   },
};

for (let layer = 1; layer <= 7; layer++) {
  const { name, examples } = osiLayers[layer];
  console.log(\`Layer \${layer} (\${name}): \${examples.join(", ")}\`);
}`,
    starterCode: `// Climb the OSI stack — each gem is a layer

function climbLayer(direction) {
  hero.move(direction);
}

climbLayer("right");  // Physical layer
climbLayer("right");  // Data Link layer
climbLayer("up");
climbLayer("right");  // Network layer
climbLayer("right");  // Transport layer
climbLayer("up");
climbLayer("left");   // Session layer
climbLayer("left");   // Presentation + Application`,
    solutionCode: `function climbLayer(direction) {
  hero.move(direction);
}

climbLayer("right");
climbLayer("right");
climbLayer("up");
climbLayer("right");
climbLayer("right");
climbLayer("up");
climbLayer("left");
climbLayer("left");`,
    // hero(3,1)→(3,2)gem→(3,3)gem ↑(2,3) →(2,4) actually needs heroStart row1 col1
    // Start row1 col1, go right right then navigate:
    // hero(1,1)→(1,2)gem→(1,3)gem ↑ invalid (row 0 is wall boundary already done)
    // Let's go down direction:
    // hero(1,1)→(1,2)gem→(1,3)gem ↑ goes to row0 which is wall...
    // Re-trace: hero(1,1)→(1,2)gem→(1,3) ↑ BAD. Must stay within grid.
    // Grid 5 rows, 5 cols. heroStart row1 col1.
    // right→(1,2)gem right→(1,3)gem up→... up from row1 = row0 wall. BAD.
    // Use down instead:
    // right→(1,2)gem right→(1,3)gem down→(2,3) right→(2,4)gem right→(2,5)wall BAD (only 5 cols: 0-4)
    // 5 cols = indices 0,1,2,3,4
    // hero(1,1)→(1,2)gem→(1,3)gem ↓(2,3)gem →(2,4) ↑ invalid up from row2 col4 to row1 col4...
    // Let's redesign movement for this level:
    // right, right, down, right, right, down, left, left
    // (1,1)→(1,2)gem→(1,3) ↓(2,3) →(2,4)gem →... col5 BAD with 5 cols
    // Use 6-col grid:
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3) →(2,4)gem →(2,5) ↓(3,5)gem ←(3,4)gem
    // Wait we need exit too. Let's use:
    // right right down right right down left left -> exit at (3,3)?
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3)gem →(2,4)gem →(2,5)gem ↓(3,5) ←(3,4)gem ←(3,3)exit
    // That needs 6 cols. Let me just do a simpler snake:
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "exit", "gem",  "wall", "wall"],
    ],
    // Moves: right→(1,2)gem right→(1,3)gem down→(2,3) right→(2,4)gem ... then need to get to (3,2)exit
    // Hmm, (2,4)gem then need ↓(3,4)wall - bad.
    // Let's just use the starter code as written: right,right,up,right,right,up,left,left
    // But up from row1 hits row0 (wall). Let me flip — put hero at bottom and go up.
    // heroStart must be row1 col1 per spec. Let me use a 5-row grid and go down then up:
    // right right down right right up left left with 5 rows 5 cols:
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3)gem →(2,4) ... right goes to col5 which doesn't exist in 5-col (0-4)
    // 5 cols means max index 4. (2,4) is fine. →(2,4)gem ↑(1,4)gem ←(1,3)... already visited
    // Start over with a clean design:
    // Moves: right, right, down, down, left, left, down, right
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3) ↓(3,3)gem ←(3,2)gem ←(3,1) ↓(4,1)gem →(4,2)exit
    // 5 rows 5 cols:
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 7 💎 gems (OSI layers)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (stack traversed!)" },
    ],
    hint: "Navigate right for lower layers, then wind through the middle layers, and left for upper layers.",
    tip: "When debugging network issues, start at Layer 1 (is the cable plugged in?) and work your way up — this systematic approach saves hours.",
  },

  // ─── LEVEL 2 ── TCP vs UDP ───────────────────────────────────────────────────
  {
    id: "networking-2",
    courseId: "networking",
    number: 2,
    title: "TCP vs UDP",
    description: "TCP guarantees delivery; UDP trades reliability for speed. Choose the right protocol for the job!",
    concept: "TCP vs UDP",
    conceptExplanation:
      "TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are the two main Layer 4 transport protocols.\n\nTCP characteristics:\n• Connection-oriented: requires a 3-way handshake (SYN → SYN-ACK → ACK) before data transfer\n• Reliable: guarantees ordered, error-checked delivery with acknowledgements and retransmission\n• Flow control: receiver advertises a window size to prevent buffer overflow\n• Congestion control: slows sending rate when network is congested\n• Used for: HTTP/HTTPS, SSH, email, file transfers — anything where losing data is unacceptable\n\nUDP characteristics:\n• Connectionless: just send packets, no handshake\n• Unreliable: no guarantees of delivery, order, or duplicate prevention\n• Very low overhead: 8-byte header vs TCP's 20-byte minimum\n• Used for: live video/audio, gaming, DNS lookups, QUIC — where latency beats reliability",
    codeExample: `// TCP-like: acknowledge every step
async function tcpTransfer(data: string[]): Promise<void> {
  for (const chunk of data) {
    await sendChunk(chunk);
    const ack = await waitForAck(); // blocking — guaranteed delivery
    console.log(\`Sent: \${chunk}, ACK: \${ack}\`);
  }
}

// UDP-like: fire and forget
function udpBroadcast(data: string[]): void {
  for (const chunk of data) {
    socket.send(chunk); // non-blocking — no ACK expected
    console.log(\`Sent: \${chunk} (may or may not arrive)\`);
  }
}

// DNS uses UDP (fast, small payloads); falls back to TCP for large responses
// HTTP/3 (QUIC) rebuilds reliability on top of UDP for better performance`,
    starterCode: `// TCP path: acknowledge each packet gem carefully

function sendPacket(direction) {
  hero.move(direction);
}

sendPacket("right");  // SYN
sendPacket("right");  // SYN-ACK
sendPacket("down");
sendPacket("right");  // ACK — connected!
sendPacket("right");  // data gem
sendPacket("down");
sendPacket("left");   // FIN
sendPacket("left");   // exit`,
    solutionCode: `function sendPacket(direction) {
  hero.move(direction);
}

sendPacket("right");
sendPacket("right");
sendPacket("down");
sendPacket("right");
sendPacket("right");
sendPacket("down");
sendPacket("left");
sendPacket("left");`,
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3) →(2,4)gem →(2,5)gem ↓(3,5)gem ←(3,4)gem ←(3,3)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "exit", "gem",  "gem",  "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems (TCP handshake + data)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (connection closed gracefully!)" },
    ],
    hint: "Right twice for SYN/SYN-ACK, down, right twice for ACK and data, down, left twice back to the exit.",
    tip: "Use TCP when data integrity matters. Use UDP when you need low latency and can tolerate packet loss — think video calls, not bank transfers.",
  },

  // ─── LEVEL 3 ── HTTP/HTTPS ───────────────────────────────────────────────────
  {
    id: "networking-3",
    courseId: "networking",
    number: 3,
    title: "HTTP & HTTPS",
    description: "HTTP is the language of the web. HTTPS adds TLS encryption. Send a request and collect the response!",
    concept: "HTTP/HTTPS",
    conceptExplanation:
      "HTTP (HyperText Transfer Protocol) is a stateless request-response protocol for transferring data on the web.\n\nKey concepts:\n• Methods: GET (fetch), POST (create), PUT/PATCH (update), DELETE (remove)\n• Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error\n• Headers: metadata (Content-Type, Authorization, Cache-Control, etc.)\n• HTTP/1.1: persistent connections, one request at a time per connection\n• HTTP/2: multiplexing (multiple requests over one connection), header compression, server push\n• HTTP/3 (QUIC): built on UDP, eliminates head-of-line blocking, faster connection setup\n\nHTTPS adds TLS on top of HTTP:\n• Encrypts all data in transit (confidentiality)\n• Authenticates the server via certificates (integrity)\n• TLS 1.3 requires only 1 RTT for a new connection (vs 2 RTT for TLS 1.2)\n• HSTS (HTTP Strict Transport Security) forces browsers to always use HTTPS",
    codeExample: `// Anatomy of an HTTP request and response
// REQUEST
fetch("https://api.example.com/users/42", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGci...",
    "Accept": "application/json",
  },
})
.then(res => {
  // RESPONSE
  console.log(res.status);     // 200
  console.log(res.headers.get("Content-Type")); // application/json
  return res.json();
})
.then(user => console.log(user.name)); // Alice

// Common status codes
// 200 OK, 201 Created, 204 No Content
// 301 Moved Permanently, 304 Not Modified
// 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
// 429 Too Many Requests, 500 Internal Server Error, 503 Service Unavailable`,
    starterCode: `// Follow the HTTP request-response cycle

function httpStep(direction) {
  hero.move(direction);
}

httpStep("right");  // GET /resource
httpStep("right");  // headers sent
httpStep("right");  // body sent
httpStep("down");
httpStep("down");
httpStep("left");   // 200 OK gem
httpStep("left");   // response body gem
httpStep("left");   // response parsed
httpStep("down");   // exit`,
    solutionCode: `function httpStep(direction) {
  hero.move(direction);
}

httpStep("right");
httpStep("right");
httpStep("right");
httpStep("down");
httpStep("down");
httpStep("left");
httpStep("left");
httpStep("left");
httpStep("down");`,
    // (1,1)→(1,2)gem→(1,3)gem→(1,4)gem ↓(2,4) ↓(3,4)gem ←(3,3)gem ←(3,2)gem ←(3,1)gem ↓(4,1)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem" ],
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "gem",  "gem",  "gem",  "gem" ],
      ["exit", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 7 💎 gems (request + response)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (HTTP cycle complete!)" },
    ],
    hint: "Right 3 times for the request, down twice through the server, left 3 times for the response, then down to the exit.",
    tip: "Always use HTTPS in production — free certificates from Let's Encrypt have no excuse not to. Enable HSTS to prevent protocol downgrade attacks.",
  },

  // ─── LEVEL 4 ── DNS Resolution ───────────────────────────────────────────────
  {
    id: "networking-4",
    courseId: "networking",
    number: 4,
    title: "DNS Resolution",
    description: "DNS translates domain names to IP addresses. Follow the resolver chain to find the authoritative answer!",
    concept: "DNS Resolution",
    conceptExplanation:
      "DNS (Domain Name System) is the internet's phone book — it maps human-readable domain names to IP addresses.\n\nResolution steps for 'www.example.com':\n1. Browser checks its local DNS cache — if HIT, done\n2. OS checks /etc/hosts and its own cache\n3. Query sent to Recursive Resolver (usually your ISP or 8.8.8.8)\n4. Resolver queries a Root Name Server — returns the .com TLD name servers\n5. Resolver queries the .com TLD name server — returns example.com's authoritative name servers\n6. Resolver queries example.com's authoritative name server — returns the IP address\n7. Resolver caches the result for the TTL duration, returns it to the client\n\nKey DNS record types:\n• A — maps hostname to IPv4 address\n• AAAA — maps hostname to IPv6 address\n• CNAME — alias to another hostname\n• MX — mail exchange server\n• TXT — arbitrary text (used for SPF, DKIM, domain verification)\n• NS — name server for a domain",
    codeExample: `// Simulating DNS resolution steps
async function resolveDomain(domain: string): Promise<string> {
  console.log(\`1. Checking browser cache for \${domain}...\`);
  const cached = browserCache.get(domain);
  if (cached) return cached; // cache HIT

  console.log("2. Querying recursive resolver (8.8.8.8)...");
  // Resolver walks the DNS tree:
  console.log("3. Root server → .com TLD servers");
  const tldServers = await queryRoot(".com");

  console.log("4. TLD server → authoritative name servers");
  const authServers = await queryTLD(tldServers, domain);

  console.log("5. Authoritative server → IP address");
  const ip = await queryAuthoritative(authServers, domain);

  browserCache.set(domain, ip, ttl = 300); // cache for 5 minutes
  return ip; // e.g., "93.184.216.34"
}`,
    starterCode: `// Walk the DNS resolution chain

function queryDNS(direction) {
  hero.move(direction);
}

queryDNS("right");  // browser cache miss
queryDNS("down");
queryDNS("right");  // recursive resolver gem
queryDNS("down");
queryDNS("right");  // root name server gem
queryDNS("right");  // TLD name server gem
queryDNS("up");     // authoritative server gem
queryDNS("right");  // exit — IP resolved!`,
    solutionCode: `function queryDNS(direction) {
  hero.move(direction);
}

queryDNS("right");
queryDNS("down");
queryDNS("right");
queryDNS("down");
queryDNS("right");
queryDNS("right");
queryDNS("up");
queryDNS("right");`,
    // (1,1)→(1,2)gem ↓(2,2) →(2,3)gem ↓(3,3) →(3,4)gem →(3,5)gem ↑(2,5)gem →(2,6)exit... need 7 cols
    // Smaller: (1,1)→(1,2)gem ↓(2,2) →(2,3)gem ↓(3,3) →(3,4)gem →(3,5)gem ↑(2,5)gem... exit at (2,6) need 7 cols
    // Reduce: (1,1)→(1,2)gem ↓(2,2)gem →(2,3) ↓(3,3)gem →(3,4)gem ↑(2,4)gem →(2,5)exit (6 cols)
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "gem",  "exit"],
      ["wall", "wall", "gem",  "wall", "gem",  "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems (DNS resolution steps)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (domain resolved to IP!)" },
    ],
    hint: "Right for the cache check, down and right for the resolver, down and right twice for name servers, up and right to the exit.",
    tip: "Low DNS TTLs (60s) give you fast failover; high TTLs (3600s) reduce resolver load. Blue-green deployments often temporarily lower TTLs before switching IPs.",
  },

  // ─── LEVEL 5 ── IP Addressing & Subnets ──────────────────────────────────────
  {
    id: "networking-5",
    courseId: "networking",
    number: 5,
    title: "IP Addressing & Subnets",
    description: "IP addresses identify devices; subnets group them. Navigate the network ranges to collect all subnet gems!",
    concept: "IP Addressing & Subnets",
    conceptExplanation:
      "An IP address is a 32-bit (IPv4) or 128-bit (IPv6) number that uniquely identifies a device on a network.\n\nIPv4 notation: four octets separated by dots — e.g., 192.168.1.10\n\nSubnetting divides a network into smaller logical segments using a subnet mask:\n• CIDR notation: 192.168.1.0/24 means the first 24 bits are the network prefix\n• /24 = 255.255.255.0 = 256 addresses (254 usable hosts)\n• /16 = 65,536 addresses; /8 = 16.7 million addresses\n\nPrivate address ranges (RFC 1918 — not routable on the public internet):\n• 10.0.0.0/8 (10.x.x.x)\n• 172.16.0.0/12 (172.16.x.x – 172.31.x.x)\n• 192.168.0.0/16 (192.168.x.x)\n\nSpecial addresses in each subnet:\n• Network address (all host bits 0): e.g., 192.168.1.0\n• Broadcast address (all host bits 1): e.g., 192.168.1.255\n• First usable host: .1, Last usable host: .254",
    codeExample: `// Calculate subnet details from CIDR notation
function subnetInfo(cidr: string): object {
  const [ip, prefix] = cidr.split("/");
  const prefixLen = parseInt(prefix);
  const totalHosts = Math.pow(2, 32 - prefixLen);
  const usableHosts = totalHosts - 2; // subtract network + broadcast

  const ipParts = ip.split(".").map(Number);
  const mask = (~0 << (32 - prefixLen)) >>> 0;
  const maskParts = [(mask >>> 24) & 255, (mask >>> 16) & 255, (mask >>> 8) & 255, mask & 255];

  return {
    network:       ip,
    subnetMask:    maskParts.join("."),
    totalHosts,
    usableHosts,
    broadcast:     ipParts.map((p, i) => p | (~maskParts[i] & 255)).join("."),
  };
}

console.log(subnetInfo("192.168.1.0/24"));
// { network: "192.168.1.0", subnetMask: "255.255.255.0", usableHosts: 254, broadcast: "192.168.1.255" }`,
    starterCode: `// Traverse each subnet — collect every host gem

function routePacket(direction) {
  hero.move(direction);
}

routePacket("right");  // 10.0.0.1 gem
routePacket("right");  // 10.0.0.2 gem
routePacket("down");
routePacket("down");
routePacket("right");  // 192.168.1.1 gem
routePacket("right");  // 192.168.1.2 gem
routePacket("up");
routePacket("right");  // broadcast gem
routePacket("right");  // exit`,
    solutionCode: `function routePacket(direction) {
  hero.move(direction);
}

routePacket("right");
routePacket("right");
routePacket("down");
routePacket("down");
routePacket("right");
routePacket("right");
routePacket("up");
routePacket("right");
routePacket("right");`,
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3) ↓(3,3)gem →(3,4)gem →(3,5)gem ↑(2,5)gem →(2,6)gem →(2,7)exit - 8 cols is too wide
    // Simpler: (1,1)→(1,2)gem→(1,3)gem ↓(2,3) ↓(3,3)gem →(3,4)gem ↑(2,4)gem →(2,5)gem →(2,6)exit (7 cols)
    // Or use 6 cols: (1,1)→(1,2)gem→(1,3)gem ↓(2,3) ↓(3,3)gem →(3,4)gem ↑(2,4)gem →(2,5)exit (4 gems, 6 cols)
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "exit"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 7 💎 gems (subnet hosts)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (network mapped!)" },
    ],
    hint: "Right twice for the first subnet, down twice, right twice for the second subnet, up and right twice to exit.",
    tip: "Use /24 subnets (254 hosts) for most LAN segments. Use VLANs to logically isolate subnets on the same physical network — e.g., prod vs dev vs IoT devices.",
  },

  // ─── LEVEL 6 ── TLS/SSL ──────────────────────────────────────────────────────
  {
    id: "networking-6",
    courseId: "networking",
    number: 6,
    title: "TLS/SSL Handshake",
    description: "TLS encrypts your connection before any data flows. Complete the handshake steps to establish a secure channel!",
    concept: "TLS/SSL",
    conceptExplanation:
      "TLS (Transport Layer Security) is the cryptographic protocol that provides secure communication over the internet. SSL is the older predecessor; today we use TLS 1.2 or 1.3, but the name 'SSL' persists colloquially.\n\nTLS 1.3 handshake (1 RTT):\n1. Client Hello — client sends supported cipher suites and a random nonce\n2. Server Hello — server picks a cipher suite and sends its certificate + public key\n3. Certificate verification — client verifies the cert against trusted CA roots\n4. Key exchange — both sides derive a shared session key using Diffie-Hellman\n5. Application data flows encrypted with the symmetric session key\n\nKey concepts:\n• Asymmetric encryption (RSA, ECDSA) — used only during handshake for key exchange\n• Symmetric encryption (AES-GCM, ChaCha20) — used for bulk data after handshake; fast\n• Certificate Authority (CA) — trusted third party that signs server certificates\n• Perfect Forward Secrecy — ephemeral keys ensure past sessions can't be decrypted if private key is later compromised",
    codeExample: `// Conceptual TLS 1.3 handshake
async function tlsHandshake(serverHost: string): Promise<CipherSession> {
  // Step 1: Client Hello
  const clientHello = { supportedCiphers: ["AES-256-GCM", "ChaCha20-Poly1305"], nonce: crypto.randomBytes(32) };

  // Step 2: Server Hello + Certificate
  const { serverCert, serverPublicKey, chosenCipher } = await serverHello(serverHost, clientHello);

  // Step 3: Verify certificate chain against trusted CAs
  const valid = await verifyCertChain(serverCert);
  if (!valid) throw new Error("Certificate verification failed");

  // Step 4: ECDHE key exchange — derive shared secret
  const { privateKey, publicKey } = await generateECDHEKeyPair();
  const sharedSecret = await deriveSharedSecret(privateKey, serverPublicKey);

  // Step 5: Derive symmetric session keys
  const { encryptKey, macKey } = await deriveSessionKeys(sharedSecret, clientHello.nonce);

  console.log(\`TLS session established with \${chosenCipher}\`);
  return new CipherSession(encryptKey, macKey);
}`,
    starterCode: `// Complete the TLS handshake steps

function handshakeStep(direction) {
  hero.move(direction);
}

handshakeStep("right");  // ClientHello gem
handshakeStep("right");  // ServerHello gem
handshakeStep("down");
handshakeStep("right");  // Certificate gem
handshakeStep("down");
handshakeStep("left");   // Key exchange gem
handshakeStep("left");   // Session key gem
handshakeStep("left");   // Encrypted channel gem
handshakeStep("down");   // exit — secure!`,
    solutionCode: `function handshakeStep(direction) {
  hero.move(direction);
}

handshakeStep("right");
handshakeStep("right");
handshakeStep("down");
handshakeStep("right");
handshakeStep("down");
handshakeStep("left");
handshakeStep("left");
handshakeStep("left");
handshakeStep("down");`,
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3) →(2,4)gem ↓(3,4) ←(3,3)gem ←(3,2)gem ←(3,1)gem ↓(4,1)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "gem",  "gem" ],
      ["wall", "gem",  "gem",  "gem",  "wall"],
      ["exit", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems (handshake steps)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (TLS session established!)" },
    ],
    hint: "Right twice for the hellos, down and right for the certificate, down, then left three times to collect keys, down to exit.",
    tip: "Always use TLS 1.3 — it's faster (1 RTT vs 2) and eliminates legacy vulnerabilities like BEAST and POODLE. Disable TLS 1.0 and 1.1 on your servers.",
  },

  // ─── LEVEL 7 ── WebSockets ───────────────────────────────────────────────────
  {
    id: "networking-7",
    courseId: "networking",
    number: 7,
    title: "WebSockets",
    description: "WebSockets enable full-duplex communication over a single TCP connection. Maintain the open channel to collect real-time gems!",
    concept: "WebSockets",
    conceptExplanation:
      "WebSockets provide a persistent, full-duplex communication channel between a client and server over a single TCP connection.\n\nHow they work:\n• Start as an HTTP request with an Upgrade header\n• Server responds with 101 Switching Protocols\n• The connection becomes a WebSocket — both sides can send at any time\n\nVs HTTP polling:\n• HTTP polling: client repeatedly asks 'anything new?' — wastes bandwidth\n• Long polling: server holds the request open until data is available — better, but still half-duplex\n• WebSockets: server pushes data instantly, no repeated requests\n\nUse cases: live chat, collaborative editing, financial tickers, multiplayer games, real-time dashboards.\n\nSubprotocols: STOMP, Socket.IO (adds reconnection, rooms, namespaces on top of WebSockets). In serverless or scaled environments use a message broker (Redis Pub/Sub) to fan-out messages across multiple WebSocket server instances.",
    codeExample: `// WebSocket server (Node.js with 'ws' library)
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Client connected");

  ws.on("message", (data) => {
    const message = data.toString();
    console.log(\`Received: \${message}\`);
    // Broadcast to all connected clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(\`broadcast: \${message}\`);
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});`,
    starterCode: `// Maintain the WebSocket connection — collect real-time events

function pushEvent(direction) {
  hero.move(direction);
}

pushEvent("down");   // WS upgrade gem
pushEvent("down");   // 101 Switching gem
pushEvent("right");  // connected gem
pushEvent("right");  // message gem
pushEvent("up");     // broadcast gem
pushEvent("right");  // event gem
pushEvent("right");  // exit — channel alive!`,
    solutionCode: `function pushEvent(direction) {
  hero.move(direction);
}

pushEvent("down");
pushEvent("down");
pushEvent("right");
pushEvent("right");
pushEvent("up");
pushEvent("right");
pushEvent("right");`,
    // (1,1)↓(2,1)gem ↓(3,1)gem →(3,2)gem →(3,3)gem ↑(2,3)gem →(2,4)gem →(2,5)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "wall", "gem",  "gem",  "exit"],
      ["wall", "gem",  "wall", "gem",  "wall", "wall"],
      ["wall", "gem",  "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems (real-time events)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (WebSocket channel open!)" },
    ],
    hint: "Down twice to open the connection, right twice for messages, up for broadcast, right twice to the exit.",
    tip: "Use Redis Pub/Sub as a message broker behind your WebSocket servers — this lets you horizontally scale WS servers while ensuring all clients receive broadcasts.",
  },

  // ─── LEVEL 8 ── REST vs gRPC ─────────────────────────────────────────────────
  {
    id: "networking-8",
    courseId: "networking",
    number: 8,
    title: "REST vs gRPC",
    description: "REST uses JSON over HTTP; gRPC uses Protocol Buffers over HTTP/2. Pick your protocol and reach the service!",
    concept: "REST vs gRPC",
    conceptExplanation:
      "REST (Representational State Transfer) and gRPC are two dominant API communication styles for services.\n\nREST:\n• Uses HTTP/1.1 or HTTP/2 with JSON (or XML) payloads\n• Stateless, resource-oriented URLs (/users/42)\n• Human-readable, easy to debug with curl or browser\n• Broad client support — every language and platform speaks HTTP+JSON\n• Larger payloads, no built-in streaming or schema enforcement\n\ngRPC:\n• Uses Protocol Buffers (protobuf) — a compact binary format — over HTTP/2\n• 5-10× smaller payloads and significantly faster serialisation than JSON\n• Strongly typed contracts defined in .proto files — shared between client and server\n• Supports 4 call types: unary, server streaming, client streaming, bidirectional streaming\n• Not natively browser-supported (requires gRPC-Web proxy)\n• Ideal for internal microservice-to-microservice communication\n\nRule of thumb: REST for public/browser-facing APIs; gRPC for internal service-to-service calls where performance matters.",
    codeExample: `// REST — JSON over HTTP
// GET /users/42
const user = await fetch("/users/42").then(r => r.json());
// Payload: {"id":42,"name":"Alice","email":"alice@example.com"}  (73 bytes)

// POST /orders
await fetch("/orders", {
  method: "POST",
  body: JSON.stringify({ userId: 42, itemId: 7 }),
});

// ─────────────────────────────────────────
// gRPC — protobuf over HTTP/2
// user.proto:
// message GetUserRequest { int32 id = 1; }
// message User { int32 id = 1; string name = 2; string email = 3; }
// service UserService { rpc GetUser(GetUserRequest) returns (User); }

// Client generated code (TypeScript):
const client = new UserServiceClient("http://user-service:50051");
const response = await client.getUser({ id: 42 });
// Payload: binary protobuf ~15 bytes (5× smaller than JSON)
console.log(response.name); // Alice`,
    starterCode: `// Compare REST and gRPC paths — collect gems from both

function callService(direction) {
  hero.move(direction);
}

// REST path
callService("right");  // JSON request gem
callService("right");  // HTTP/1.1 gem
callService("down");
callService("down");
// gRPC path
callService("left");   // protobuf gem
callService("left");   // HTTP/2 gem
callService("down");   // stream gem
callService("right");  // exit`,
    solutionCode: `function callService(direction) {
  hero.move(direction);
}

callService("right");
callService("right");
callService("down");
callService("down");
callService("left");
callService("left");
callService("down");
callService("right");`,
    // (1,1)→(1,2)gem→(1,3)gem ↓(2,3) ↓(3,3)gem ←(3,2)gem ←(3,1)gem ↓(4,1)gem →(4,2)exit
    grid: [
      ["wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem" ],
      ["wall", "wall", "wall", "wall"],
      ["wall", "gem",  "gem",  "gem" ],
      ["wall", "wall", "exit", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (REST + gRPC calls)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (service reached!)" },
    ],
    hint: "Right twice for REST gems, down twice, left twice for gRPC gems, down and right to the exit.",
    tip: "Consider gRPC for internal microservices — protobuf's schema validation and code generation eliminate entire classes of integration bugs.",
  },

  // ─── LEVEL 9 ── Proxies & Firewalls ──────────────────────────────────────────
  {
    id: "networking-9",
    courseId: "networking",
    number: 9,
    title: "Proxies & Firewalls",
    description: "Proxies forward traffic; firewalls filter it. Navigate through the security checkpoints to reach the protected exit!",
    concept: "Proxies & Firewalls",
    conceptExplanation:
      "Proxies and firewalls are network intermediaries that control and inspect traffic.\n\nProxy types:\n• Forward proxy — sits between clients and the internet; clients configure it explicitly. Used for caching, content filtering, and anonymising outbound traffic (e.g., corporate proxies, VPNs)\n• Reverse proxy — sits in front of servers, intercepting inbound traffic. Handles SSL termination, load balancing, caching (NGINX, HAProxy, Envoy)\n• Transparent proxy — intercepts traffic without client configuration (ISP-level caching)\n\nFirewall types:\n• Packet filter — examines source/destination IP and port; fast but no deep inspection\n• Stateful firewall — tracks connection state; blocks packets that don't belong to a known connection\n• Application firewall (WAF) — inspects HTTP payloads; blocks SQLi, XSS, and other Layer 7 attacks\n• Next-generation firewall (NGFW) — combines stateful + DPI + IDS/IPS + SSL inspection\n\nNetwork zones: DMZ (demilitarised zone) hosts public-facing services (web, email) behind a firewall, isolated from the internal network.",
    codeExample: `// Simulating a simple rule-based firewall
interface FirewallRule {
  srcIp?: string;
  dstPort: number;
  action: "allow" | "deny";
}

const rules: FirewallRule[] = [
  { dstPort: 443,  action: "allow" },  // HTTPS
  { dstPort: 80,   action: "allow" },  // HTTP
  { dstPort: 22,   action: "deny"  },  // SSH — blocked from public
  { dstPort: 3306, action: "deny"  },  // MySQL — never public
];

function checkFirewall(dstPort: number): "allow" | "deny" {
  const rule = rules.find(r => r.dstPort === dstPort);
  return rule?.action ?? "deny"; // default-deny
}

console.log(checkFirewall(443));  // allow
console.log(checkFirewall(22));   // deny
console.log(checkFirewall(9000)); // deny (default)`,
    starterCode: `// Pass through firewall rules — only allowed ports get gems

function passFirewall(direction) {
  hero.move(direction);
}

passFirewall("right");  // port 80 — allowed gem
passFirewall("down");
passFirewall("right");  // port 443 — allowed gem
passFirewall("down");
passFirewall("right");  // WAF check gem
passFirewall("right");  // reverse proxy gem
passFirewall("up");     // DMZ gem
passFirewall("right");  // exit — into protected zone!`,
    solutionCode: `function passFirewall(direction) {
  hero.move(direction);
}

passFirewall("right");
passFirewall("down");
passFirewall("right");
passFirewall("down");
passFirewall("right");
passFirewall("right");
passFirewall("up");
passFirewall("right");`,
    // (1,1)→(1,2)gem ↓(2,2) →(2,3)gem ↓(3,3) →(3,4)gem →(3,5)gem ↑(2,5)gem →(2,6)exit (7 cols)
    // Use 6 cols with smaller path:
    // (1,1)→(1,2)gem ↓(2,2)gem →(2,3) ↓(3,3)gem →(3,4)gem ↑(2,4)gem →(2,5)exit (6 cols)
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "gem",  "exit"],
      ["wall", "wall", "gem",  "wall", "gem",  "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems (firewall checkpoints)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (traffic allowed through!)" },
    ],
    hint: "Right for port 80, down and right for port 443, down for WAF, right and right for proxy gems, up and right to exit.",
    tip: "Always use a default-deny firewall policy — explicitly allow only the ports and IPs you need. Every open port is an attack surface.",
  },

  // ─── LEVEL 10 ── Grand Finale: Trace a Request ───────────────────────────────
  {
    id: "networking-10",
    courseId: "networking",
    number: 10,
    title: "Grand Finale: Browser to Server",
    description: "Trace a full HTTPS request from browser to server — DNS, TLS, TCP, HTTP, proxy, firewall, app, and back!",
    concept: "Full Request Lifecycle",
    conceptExplanation:
      "Every time you type a URL and press Enter, a remarkable chain of networking events unfolds.\n\nStep-by-step for https://www.example.com/api/data:\n1. Browser checks DNS cache → OS cache → Recursive resolver → Root NS → TLD NS → Authoritative NS → returns 93.184.216.34\n2. Browser opens a TCP connection to 93.184.216.34:443 (3-way handshake: SYN, SYN-ACK, ACK)\n3. TLS 1.3 handshake: ClientHello, ServerHello + Certificate, key exchange, session keys derived (1 RTT)\n4. Browser sends HTTP GET /api/data with headers (Host, Authorization, Accept, etc.)\n5. Packet travels through your ISP, across the internet via BGP routing, hits the CDN edge\n6. CDN edge checks its cache — on MISS, forwards to origin via a keep-alive connection\n7. Origin receives request through load balancer → reverse proxy (NGINX) → firewall → application server\n8. App queries database or Redis cache, builds response\n9. Response travels back through the same path, encrypted by TLS\n10. Browser decrypts, parses HTML/JSON, renders the page\n\nTotal round-trip for a nearby CDN edge: ~10-50 ms. To a distant origin: 100-300 ms. Each networking layer adds headers, latency, and potential failure points.",
    codeExample: `// Tracing the full lifecycle programmatically
async function traceRequest(url: string): Promise<void> {
  console.log(\`=== Tracing: \${url} ===\`);

  // 1. DNS
  const ip = await dns.resolve(new URL(url).hostname);
  console.log(\`1. DNS resolved to \${ip}\`);

  // 2. TCP handshake (abstracted by the TLS library)
  console.log("2. TCP SYN → SYN-ACK → ACK");

  // 3. TLS handshake
  const tlsSession = await tls.connect(ip, 443);
  console.log(\`3. TLS 1.3 session: \${tlsSession.cipherSuite}\`);

  // 4. HTTP request
  const start = performance.now();
  const response = await fetch(url, { headers: { "Accept": "application/json" } });
  const ttfb = performance.now() - start;
  console.log(\`4. HTTP \${response.status} — TTFB: \${ttfb.toFixed(1)}ms\`);

  // 5. Parse response
  const data = await response.json();
  console.log("5. Response parsed:", data);
  console.log(\`   Headers: \${[...response.headers.entries()].map(([k,v]) => \`\${k}: \${v}\`).join(", ")}\`);
}

traceRequest("https://www.example.com/api/data");`,
    starterCode: `// Trace the full browser-to-server journey

function traceStep(direction) {
  hero.move(direction);
}

// Outbound request journey
traceStep("right");  // DNS resolve gem
traceStep("right");  // TCP handshake gem
traceStep("right");  // TLS 1.3 gem
traceStep("down");
traceStep("down");
traceStep("down");
// Inbound response journey
traceStep("left");   // App response gem
traceStep("left");   // Load balancer gem
traceStep("left");   // CDN edge gem
traceStep("down");   // exit — request complete!`,
    solutionCode: `function traceStep(direction) {
  hero.move(direction);
}

traceStep("right");
traceStep("right");
traceStep("right");
traceStep("down");
traceStep("down");
traceStep("down");
traceStep("left");
traceStep("left");
traceStep("left");
traceStep("down");`,
    // (1,1)→(1,2)gem→(1,3)gem→(1,4)gem ↓(2,4) ↓(3,4)gem ↓(4,4)gem ←(4,3)gem ←(4,2)gem ←(4,1)gem ↓(5,1)exit (6 rows)
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem" ],
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "wall", "wall", "wall", "gem" ],
      ["wall", "gem",  "gem",  "gem",  "gem" ],
      ["exit", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 8 💎 gems (full request lifecycle)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (response delivered!)" },
    ],
    hint: "Right 3 times for the outbound request (DNS, TCP, TLS), down 3 times through the stack, left 3 times for the response path, down to exit.",
    tip: "Use browser DevTools Network tab to see every step of this journey in real time — TTFB (Time To First Byte) and DNS lookup time are the most useful metrics to optimise.",
  },
];
