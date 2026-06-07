export const ARCH_FLOWS = {
  // ── NETWORK ──────────────────────────────────────────────────────────────────
  "WAF": {
    desc: "Sits at the Cloudflare edge — every HTTP/S request is inspected before reaching your origin servers.",
    steps: [
      { label: "Internet / Attacker", sub: "SQLi · XSS · path traversal" },
      { label: "WAF", sub: "Cloudflare · AWS WAF", hi: true },
      { label: "Load Balancer / Ingress", sub: "K8s ALB · Nginx" },
      { label: "API Service", sub: "Node · Python · Java" },
    ],
  },
  "DDoS Protection": {
    desc: "Absorbs volumetric and L7 floods at the network edge before they reach your infrastructure.",
    steps: [
      { label: "Attack Traffic", sub: "100 Gbps flood · botnet" },
      { label: "DDoS Scrubbing", sub: "Cloudflare anycast", hi: true },
      { label: "CDN / WAF Edge", sub: "clean traffic only" },
      { label: "VPC / Load Balancer", sub: "your origin infra" },
    ],
  },
  "Bot Management": {
    desc: "Fingerprints and challenges bots at the edge before they reach login, checkout, or API endpoints.",
    steps: [
      { label: "Browser / Mobile App", sub: "human or bot?" },
      { label: "Bot Manager", sub: "Cloudflare · DataDome", hi: true },
      { label: "Edge WAF / Rate Limiter", sub: "clean requests" },
      { label: "Login API / Checkout", sub: "protected endpoint" },
    ],
  },
  "API Gateway Security": {
    desc: "Validates JWT/OAuth, enforces rate limits, and rejects malformed requests before they reach your services.",
    steps: [
      { label: "Mobile App / Web / SDK", sub: "your clients" },
      { label: "Edge WAF", sub: "Cloudflare · DDoS filter" },
      { label: "API Gateway", sub: "Kong · AWS APIGW", hi: true },
      { label: "Microservices", sub: "Order · Payment · User" },
    ],
  },
  "DNS Security / DNSSEC": {
    desc: "Protects DNS resolution itself — before a single byte of your application is ever reached.",
    steps: [
      { label: "Browser / Client", sub: "types app.company.com" },
      { label: "DNS Resolver", sub: "DNSSEC validated", hi: true },
      { label: "CDN / WAF Edge", sub: "IP returned · connect" },
      { label: "Web Server", sub: "TLS handshake begins" },
    ],
  },
  "TLS/mTLS": {
    desc: "TLS encrypts every hop. mTLS adds mutual certificate authentication between internal services — a compromised pod can't impersonate another.",
    steps: [
      { label: "Client (Browser / App)", sub: "TLS handshake" },
      { label: "CDN / Load Balancer", sub: "TLS termination", hi: true },
      { label: "K8s Services", sub: "mTLS · Istio / Linkerd", hi: true },
      { label: "Database / Cache", sub: "RDS · Redis · encrypted at rest" },
    ],
  },
  "IPS / IDS": {
    desc: "Passively taps VPC traffic via mirroring — detects lateral movement and known attack signatures without sitting inline.",
    steps: [
      { label: "K8s Pods / EC2", sub: "running workloads" },
      { label: "VPC Traffic Mirror", sub: "passive copy · no latency" },
      { label: "IPS / IDS Engine", sub: "Suricata · Zeek", hi: true },
      { label: "SOC Alert", sub: "C2 beacon detected" },
    ],
  },
  "SASE": {
    desc: "One cloud platform replacing VPN, web proxy, and branch firewall for every remote employee.",
    steps: [
      { label: "Remote Employee", sub: "home · café · airport" },
      { label: "SASE Cloud", sub: "Zscaler · Cloudflare One", hi: true },
      { label: "Identity + Posture Check", sub: "Okta · device health" },
      { label: "Enterprise Services", sub: "private · zero exposed ports" },
    ],
  },
  "SSE": {
    desc: "All employee web and SaaS traffic is proxied through the SSE cloud for inspection and policy — not inbound app traffic.",
    steps: [
      { label: "Employee Device", sub: "browser · laptop" },
      { label: "SSE Cloud Proxy", sub: "Zscaler ZIA · Netskope", hi: true },
      { label: "Inspect + Filter", sub: "SSL decrypt · categorize" },
      { label: "Internet / SaaS Apps", sub: "Slack · Salesforce · approved" },
    ],
  },
  "SWG": {
    desc: "Every outbound web request from employees is decrypted, inspected, and re-encrypted before reaching the internet.",
    steps: [
      { label: "Employee Device", sub: "outbound HTTP/S request" },
      { label: "SWG Proxy", sub: "SSL inspect · URL filter", hi: true },
      { label: "Policy Decision", sub: "allow · block · audit" },
      { label: "Internet", sub: "approved destinations only" },
    ],
  },
  "CASB": {
    desc: "Sits between employees and SaaS — enforces DLP, blocks unauthorized sharing, and surfaces shadow IT.",
    steps: [
      { label: "Employee", sub: "uploads sensitive file" },
      { label: "CASB", sub: "Netskope · Zscaler", hi: true },
      { label: "DLP + Shadow IT Check", sub: "classify · allow · block" },
      { label: "SaaS Apps", sub: "Slack · Google Drive · Salesforce" },
    ],
  },
  "ZTNA": {
    desc: "Per-app tunnels replace VPN — device posture and identity verified before every session, not just at login.",
    steps: [
      { label: "Remote User", sub: "mobile · laptop" },
      { label: "ZTNA Agent", sub: "device posture check", hi: true },
      { label: "Identity Verified", sub: "Okta MFA passed" },
      { label: "Private App", sub: "not exposed to internet" },
    ],
  },
  "FWaaS": {
    desc: "Cloud-hosted NGFW replacing physical firewall appliances at the branch office and VPC boundary.",
    steps: [
      { label: "Branch Office / VPC", sub: "outbound traffic" },
      { label: "FWaaS Cloud", sub: "Palo Alto · FortiGate", hi: true },
      { label: "L7 Inspection", sub: "IPS · URL filter · app-ID" },
      { label: "Internet / Cloud", sub: "clean traffic exits" },
    ],
  },
  "NDR": {
    desc: "Passively taps East-West VPC traffic via mirroring — ML baselines detect lateral movement and C2 beaconing inside your network.",
    steps: [
      { label: "K8s Pods / EC2", sub: "internal East-West traffic" },
      { label: "VPC Traffic Mirror", sub: "passive tap · AWS feature" },
      { label: "NDR Engine", sub: "Zeek · Vectra AI", hi: true },
      { label: "SOC Alert", sub: "lateral movement detected" },
    ],
  },
  "Network DLP": {
    desc: "Inspects outbound traffic for sensitive data patterns — PII, credit card numbers, source code — before they leave your environment.",
    steps: [
      { label: "API Service / Employee", sub: "outbound request" },
      { label: "Network DLP", sub: "Netskope · Zscaler", hi: true },
      { label: "Pattern Match", sub: "PII · credit card · source code" },
      { label: "Blocked / Quarantined", sub: "exfil prevented" },
    ],
  },
  "SD-WAN": {
    desc: "Routes branch office traffic across the best available WAN link — reduces MPLS cost and improves resilience.",
    steps: [
      { label: "Branch Office", sub: "employees + local servers" },
      { label: "SD-WAN Edge", sub: "Fortinet · Cato Networks", hi: true },
      { label: "Best-Path Routing", sub: "MPLS · broadband · 4G LTE" },
      { label: "Enterprise HQ / Cloud", sub: "AWS · DC · SaaS" },
    ],
  },
  // ── CLIENT ───────────────────────────────────────────────────────────────────
  "MDM / UEM": {
    desc: "Every device must satisfy a policy baseline — encryption, OS version, PIN — before it can access corporate resources.",
    steps: [
      { label: "Employee Device", sub: "iOS · Android · macOS · Windows" },
      { label: "MDM / UEM Agent", sub: "Jamf · Intune", hi: true },
      { label: "Policy Enforced", sub: "encrypted · patched · compliant" },
      { label: "Corporate Resources", sub: "email · intranet · VPN" },
    ],
  },
  "EDR": {
    desc: "Kernel-level agent streams process, file, and network telemetry in real-time — fully replaces legacy AV.",
    steps: [
      { label: "Employee Laptop / Mobile", sub: "any OS" },
      { label: "EDR Agent", sub: "CrowdStrike · SentinelOne", hi: true },
      { label: "Behavioral Analysis", sub: "process · network · file I/O" },
      { label: "Blocked + SOC Alerted", sub: "device quarantined" },
    ],
  },
  "Mobile Threat Defense": {
    desc: "EDR for mobile — detects jailbreak, rogue Wi-Fi, malicious sideloads, and OS exploits at the kernel level.",
    steps: [
      { label: "iOS / Android Device", sub: "employee phone" },
      { label: "MTD Agent / SDK", sub: "Zimperium · Lookout", hi: true },
      { label: "Threat Detected", sub: "jailbreak · rogue app · MITM" },
      { label: "MDM Quarantine", sub: "corporate access revoked" },
    ],
  },
  "ZTNA (Client)": {
    desc: "Client agent verifies device health and identity before opening a per-app micro-tunnel — never full network access.",
    steps: [
      { label: "Mobile / Laptop", sub: "remote worker" },
      { label: "ZTNA Client Agent", sub: "Cloudflare · Tailscale", hi: true },
      { label: "Posture + Identity", sub: "device health · Okta MFA" },
      { label: "Internal Service", sub: "not exposed to internet" },
    ],
  },
  // ── AWS / CLOUD ──────────────────────────────────────────────────────────────
  "CSPM": {
    desc: "Reads your entire AWS account via read-only APIs — agentless — and flags every deviation from CIS/NIST benchmarks.",
    steps: [
      { label: "AWS Account", sub: "S3 · EC2 · RDS · IAM · VPC" },
      { label: "AWS Config APIs", sub: "read-only · no agents" },
      { label: "CSPM Engine", sub: "Wiz · Prowler · Prisma", hi: true },
      { label: "Findings Dashboard", sub: "open S3 · root no MFA · open SG:22" },
    ],
  },
  "CWPP": {
    desc: "eBPF agent on every EC2/EKS node intercepts syscalls in real-time — detects reverse shells, privilege escalation, crypto-mining.",
    steps: [
      { label: "EKS Pod / EC2 Instance", sub: "running workload" },
      { label: "CWPP Agent / eBPF", sub: "Falco · CrowdStrike", hi: true },
      { label: "Syscall Intercept", sub: "execve · connect · write" },
      { label: "Alert: Reverse Shell!", sub: "→ SOAR auto-isolates" },
    ],
  },
  "CNAPP": {
    desc: "Unifies posture + runtime + pipeline into one risk graph — correlates a public EC2 + critical CVE + admin IAM role into a P1.",
    steps: [
      { label: "IaC + Container Images", sub: "pre-deploy artifacts" },
      { label: "CI/CD Pipeline", sub: "build · scan · push" },
      { label: "CNAPP Platform", sub: "Wiz · Prisma Cloud", hi: true },
      { label: "AWS Runtime", sub: "K8s · EC2 · RDS · IAM" },
    ],
  },
  "KSPM": {
    desc: "Reads the K8s API server and audits every RBAC binding, pod spec, and network policy against security benchmarks.",
    steps: [
      { label: "K8s API Server", sub: "EKS cluster state" },
      { label: "KSPM Scanner", sub: "Kubescape · kube-bench", hi: true },
      { label: "Audit: RBAC · Pods · Netpol", sub: "every resource checked" },
      { label: "Remediation", sub: "remove privileged pods · enforce PSA" },
    ],
  },
  "Container Runtime Security": {
    desc: "eBPF probe at the kernel intercepts every syscall from every container — zero agent overhead, complete visibility.",
    steps: [
      { label: "K8s Worker Node", sub: "EC2 running containers" },
      { label: "eBPF Probe", sub: "Falco · Tetragon", hi: true },
      { label: "Syscall Intercept", sub: "execve · connect · write" },
      { label: "Alert: Reverse Shell!", sub: "SOAR isolates pod" },
    ],
  },
  "Service Mesh Security": {
    desc: "Sidecar proxy in every pod enforces mTLS and traffic policy — a compromised pod cannot freely call other services.",
    steps: [
      { label: "Frontend Pod", sub: "React · Next.js" },
      { label: "Envoy Sidecar", sub: "Istio · Linkerd", hi: true },
      { label: "mTLS Tunnel", sub: "mutual cert auth + encrypt" },
      { label: "API Service Pod", sub: "Node · Python · Java" },
    ],
  },
  "IaC Security": {
    desc: "Scans Terraform and Helm manifests in the CI pipeline — catches a public S3 bucket before it ever deploys.",
    steps: [
      { label: "Developer", sub: "writes Terraform / Helm" },
      { label: "PR / CI Pipeline", sub: "GitHub Actions" },
      { label: "IaC Scanner", sub: "Checkov · tfsec", hi: true },
      { label: "Deployment Blocked", sub: "public S3 · port 22 open" },
    ],
  },
  "Secrets Management": {
    desc: "Services fetch credentials at startup from a central vault — no secrets in code, env vars, or container images ever.",
    steps: [
      { label: "Backend Service", sub: "starts up · needs DB creds" },
      { label: "Secrets Manager", sub: "HashiCorp Vault · AWS SM", hi: true },
      { label: "Fetch Secret", sub: "auto-rotated · audit logged" },
      { label: "Database / Cache", sub: "RDS · Redis · connection opened" },
    ],
  },
  "CIEM": {
    desc: "Analyzes CloudTrail to find what IAM permissions are actually used vs. granted — then enforces least privilege.",
    steps: [
      { label: "AWS IAM", sub: "roles · policies · service accounts" },
      { label: "CloudTrail Analysis", sub: "what's actually called?" },
      { label: "CIEM Engine", sub: "Wiz · Ermetic · Prisma", hi: true },
      { label: "Least Privilege", sub: "847 unused permissions removed" },
    ],
  },
  // ── DEVSECOPS ────────────────────────────────────────────────────────────────
  "SAST": {
    desc: "Analyzes source code without running it — finds injection flaws, insecure crypto, and hardcoded secrets at the IDE and PR stage.",
    steps: [
      { label: "Developer IDE", sub: "writes code · real-time lint" },
      { label: "SAST Engine", sub: "Semgrep · CodeQL", hi: true },
      { label: "PR Gate / CI Block", sub: "HIGH severity = blocked" },
      { label: "Bug Fixed Pre-Deploy", sub: "no production impact" },
    ],
  },
  "SCA": {
    desc: "Scans every dependency manifest for CVEs — finds Log4Shell, Spring4Shell, and auto-generates fix PRs.",
    steps: [
      { label: "package.json / pom.xml", sub: "open-source dependencies" },
      { label: "SCA Scanner", sub: "Snyk · Dependabot", hi: true },
      { label: "CVE Database", sub: "NVD · GitHub Advisory · OSV" },
      { label: "Auto Fix PR", sub: "upgrade lodash 4.17.20 → 4.17.21" },
    ],
  },
  "Container Image Scanning": {
    desc: "Every Docker image is scanned for OS CVEs before it's pushed to ECR — CRITICAL findings block the push and deployment.",
    steps: [
      { label: "Dockerfile / Build", sub: "CI pipeline" },
      { label: "Image Scanner", sub: "Trivy · Grype · Snyk", hi: true },
      { label: "ECR Push Gate", sub: "block CRITICAL CVEs" },
      { label: "K8s Admission", sub: "only clean images deploy" },
    ],
  },
  "Secret Scanning": {
    desc: "Catches AWS keys and API tokens before they're pushed to GitHub — pre-commit hook is the last line of defence.",
    steps: [
      { label: "Developer", sub: "git commit with AWS key" },
      { label: "Pre-commit Hook", sub: "Gitleaks · TruffleHog", hi: true },
      { label: "CI Pipeline Check", sub: "GitGuardian · repo scan" },
      { label: "Blocked: Rotate Key", sub: "before it reaches GitHub" },
    ],
  },
  "DAST": {
    desc: "Attacks your staging app from outside like a real attacker — finds XSS, SQLi, and auth bypasses that static analysis misses.",
    steps: [
      { label: "Staging Environment", sub: "fully deployed app" },
      { label: "DAST Scanner", sub: "ZAP · Nuclei", hi: true },
      { label: "Active Probing", sub: "SQLi · XSS · auth bypass" },
      { label: "Findings Report", sub: "fix before production deploy" },
    ],
  },
  "SBOM": {
    desc: "A machine-readable ingredient list of every component in your build — enables instant CVE impact queries across your fleet.",
    steps: [
      { label: "Build Pipeline", sub: "compile · bundle · package" },
      { label: "SBOM Generator", sub: "Syft · CycloneDX", hi: true },
      { label: "Artifact Registry", sub: "ECR · Nexus · SBOM attached" },
      { label: "CVE Query", sub: "Log4Shell: are we affected?" },
    ],
  },
  "Supply Chain Security": {
    desc: "Cryptographically signs every build artifact — K8s admission controller rejects any image without a valid signature.",
    steps: [
      { label: "Source Code", sub: "GitHub · verified commit" },
      { label: "CI Build", sub: "GitHub Actions · provenance" },
      { label: "Image Signed", sub: "cosign · SLSA", hi: true },
      { label: "K8s Admission", sub: "verify signature · reject unsigned" },
    ],
  },
  // ── IDENTITY ─────────────────────────────────────────────────────────────────
  "IAM / PAM": {
    desc: "Okta federates all human identity via SSO. PAM vaults privileged credentials and records every admin session.",
    steps: [
      { label: "Engineer", sub: "needs production DB access" },
      { label: "Okta SSO + MFA", sub: "identity verified" },
      { label: "PAM Vault", sub: "CyberArk · Teleport", hi: true },
      { label: "RDS / K8s API", sub: "session recorded + audited" },
    ],
  },
  "MFA / Passwordless": {
    desc: "Second factor required before any app access — FIDO2 hardware keys are phishing-resistant; SMS OTP is not.",
    steps: [
      { label: "User Login", sub: "browser · mobile · SSO portal" },
      { label: "Okta / IdP", sub: "password check" },
      { label: "MFA Challenge", sub: "Okta Verify · YubiKey · FIDO2", hi: true },
      { label: "Enterprise App", sub: "frontend · backend · APIs" },
    ],
  },
  "SSPM": {
    desc: "Audits every SaaS app's security config via OAuth — finds public GitHub repos, weak Slack retention, and over-sharing in Salesforce.",
    steps: [
      { label: "Company SaaS Apps", sub: "Slack · GitHub · Salesforce" },
      { label: "OAuth API Access", sub: "read-only admin scope" },
      { label: "SSPM Engine", sub: "AppOmni · Adaptive Shield", hi: true },
      { label: "Findings", sub: "GitHub repo public · MFA disabled" },
    ],
  },
  "Non-Human Identity": {
    desc: "Machine identities outnumber humans 10:1 — NHI platforms issue short-lived tokens and rotate API keys automatically.",
    steps: [
      { label: "Backend Service", sub: "K8s pod · Lambda · CI job" },
      { label: "Service Account / Token", sub: "machine identity" },
      { label: "NHI Platform", sub: "SPIFFE/SPIRE · Aembit", hi: true },
      { label: "External API", sub: "AWS · Okta · 3rd-party SaaS" },
    ],
  },
  "PKI / Cert Management": {
    desc: "cert-manager watches every TLS cert in K8s and auto-renews before expiry — expired certs cause production outages.",
    steps: [
      { label: "K8s Service / Ingress", sub: "needs TLS cert" },
      { label: "cert-manager", sub: "watches expiry · auto-renews", hi: true },
      { label: "Certificate Authority", sub: "Let's Encrypt · internal CA" },
      { label: "Ingress / Service Mesh", sub: "cert deployed · traffic encrypted" },
    ],
  },
  // ── SIEM / MONITORING ────────────────────────────────────────────────────────
  "SIEM": {
    desc: "Normalizes and correlates logs from every layer — WAF, CloudTrail, Okta, K8s audit — into a single SOC nerve center.",
    steps: [
      { label: "All Sources", sub: "CloudTrail · WAF · Okta · K8s" },
      { label: "Log Pipeline", sub: "Cribl · Kafka · Fluentd" },
      { label: "SIEM Engine", sub: "Splunk · Sentinel", hi: true },
      { label: "Alert", sub: "root login from unknown IP · 2am" },
    ],
  },
  "SOAR": {
    desc: "Turns SIEM alerts into automated actions in seconds — block IP, suspend session, isolate host, page on-call.",
    steps: [
      { label: "SIEM Alert", sub: "high severity · correlated" },
      { label: "SOAR Playbook", sub: "Splunk SOAR · Tines", hi: true },
      { label: "Automated Actions", sub: "block IP · suspend user · isolate" },
      { label: "MTTR: minutes not hours", sub: "Cloudflare · Okta · AWS APIs" },
    ],
  },
  "XDR": {
    desc: "Stitches endpoint, cloud, network, and identity telemetry into one correlated alert — eliminates siloed detection gaps.",
    steps: [
      { label: "EDR Telemetry", sub: "endpoint · process · file" },
      { label: "Cloud + Network Logs", sub: "AWS · VPC Flow · WAF" },
      { label: "XDR Engine", sub: "CrowdStrike · Cortex XDR", hi: true },
      { label: "Unified Alert", sub: "lateral movement confirmed" },
    ],
  },
  "UEBA": {
    desc: "ML baselines normal behavior per user and entity — catches insider threats and compromised accounts that evade signature detection.",
    steps: [
      { label: "Identity Logs", sub: "Okta · AD · app logins" },
      { label: "Activity Logs", sub: "CloudTrail · app events" },
      { label: "UEBA ML Model", sub: "Securonix · Exabeam", hi: true },
      { label: "Anomaly Alert", sub: "DB dump at 2am · unusual volume" },
    ],
  },
  "Attack Surface Management": {
    desc: "Scans the internet from an attacker's vantage point — finds forgotten subdomains, open ports, and exposed admin panels.",
    steps: [
      { label: "Attacker's View", sub: "internet-facing scanner" },
      { label: "ASM Engine", sub: "Cortex Xpanse · Censys", hi: true },
      { label: "Discovered Assets", sub: "dev.company.com · port 8443 open" },
      { label: "Remediate", sub: "WAF it · shut down · patch" },
    ],
  },
  "Threat Intelligence": {
    desc: "External IOC feeds enrich every SIEM alert — turns an unknown IP into a named APT actor with documented TTPs.",
    steps: [
      { label: "External Feeds", sub: "MISP · ISAC · dark web" },
      { label: "CTI Platform", sub: "Recorded Future · OpenCTI", hi: true },
      { label: "SIEM Enrichment", sub: "this IP = APT29 C2 server" },
      { label: "Proactive Blocking", sub: "WAF rule · firewall updated" },
    ],
  },
  "AI SOC Analyst": {
    desc: "Autonomous AI agents investigate every alert like a senior analyst — pulling context from EDR, identity, cloud, and network across your entire stack, then writing investigation narratives. No pre-written playbooks needed; it reasons.",
    steps: [
      { label: "SIEM / UEBA Alert", sub: "10,000 alerts/day" },
      { label: "AI SOC Agent", sub: "Prophet · Culminate → Datadog", hi: true },
      { label: "Cross-Stack Investigation", sub: "EDR · identity · cloud · network" },
      { label: "Investigation Narrative", sub: "real threat vs noise · ranked" },
      { label: "SOAR / Human Escalation", sub: "auto-respond or page analyst" },
    ],
  },
  "CTEM": {
    desc: "Doesn't wait for alerts — continuously interrogates every tool's configuration and maps combined coverage against live threat intelligence to find gaps before attackers do.",
    steps: [
      { label: "Full Security Stack", sub: "EDR · CSPM · WAF · IAM · SIEM" },
      { label: "CTEM Platform", sub: "Nagomi · Reach · read-only APIs", hi: true },
      { label: "ATT&CK Coverage Map", sub: "which techniques are you blind to?" },
      { label: "Exposure Priority", sub: "ranked by real exploitability" },
      { label: "Remediation Plan", sub: "specific fix per tool · verified" },
    ],
  },
};
