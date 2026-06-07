// Canonical per-layer architectural node sequences.
// Each node: { id, label, sub, terms[] }
// terms[] = which JARGON term keys map to this architectural position.
// Empty terms[] = structural endpoint (Internet, Your App, etc.) — never dimmed.
export const LAYER_FLOWS = {
  network: [
    { id: "internet",  label: "Internet",        sub: "traffic origin",     terms: [] },
    { id: "ddos",      label: "DDoS Shield",     sub: "L3/L4 scrubbing",   terms: ["DDoS Protection"] },
    { id: "waf_bot",   label: "WAF + Bot",       sub: "L7 filter",         terms: ["WAF", "Bot Management"] },
    { id: "dns_tls",   label: "DNS + TLS",       sub: "resolve & encrypt",  terms: ["DNS Security / DNSSEC", "TLS/mTLS"] },
    { id: "apigw",     label: "API Gateway",     sub: "auth & rate limit",  terms: ["API Gateway Security"] },
    { id: "sase",      label: "SASE / ZTNA",     sub: "remote access",      terms: ["SASE", "SSE", "SWG", "CASB", "ZTNA", "FWaaS", "SD-WAN"] },
    { id: "ids_ndr",   label: "IPS / NDR / DLP", sub: "detect & inspect",   terms: ["IPS / IDS", "NDR", "Network DLP"] },
    { id: "app",       label: "Enterprise App",  sub: "Web · API · DB",     terms: [] },
  ],
  client: [
    { id: "device",    label: "Device",          sub: "iOS / Android / Mac", terms: [] },
    { id: "mdm",       label: "MDM / UEM",       sub: "policy enforce",     terms: ["MDM / UEM"] },
    { id: "edr_mtd",   label: "EDR / MTD",       sub: "threat detect",      terms: ["EDR", "Mobile Threat Defense"] },
    { id: "ztna",      label: "ZTNA Client",     sub: "per-app tunnel",     terms: ["ZTNA (Client)"] },
    { id: "corp",      label: "Enterprise Services", sub: "Web · API · Intranet", terms: [] },
  ],
  aws: [
    { id: "iac",       label: "IaC / Code",      sub: "Terraform · Helm",   terms: ["IaC Security", "Secrets Management"] },
    { id: "cicd",      label: "CI / CD",         sub: "build · push",       terms: [] },
    { id: "posture",   label: "Cloud Posture",   sub: "AWS account",        terms: ["CSPM", "CNAPP", "CIEM"] },
    { id: "k8s",       label: "K8s Cluster",     sub: "EKS",                terms: ["KSPM", "Container Runtime Security", "Service Mesh Security"] },
    { id: "workload",  label: "EC2 / Lambda",    sub: "your workloads",     terms: ["CWPP"] },
    { id: "data",      label: "DB / S3",         sub: "your data",          terms: [] },
  ],
  devsecops: [
    { id: "ide",       label: "IDE / Commit",    sub: "developer writes",   terms: ["SAST", "Secret Scanning"] },
    { id: "pr",        label: "Pull Request",    sub: "code review",        terms: [] },
    { id: "ci",        label: "CI Pipeline",     sub: "GitHub Actions",     terms: ["SCA", "Container Image Scanning", "SBOM", "Supply Chain Security"] },
    { id: "staging",   label: "Staging App",     sub: "deploy to test",     terms: ["DAST"] },
    { id: "prod",      label: "Production",      sub: "K8s / EC2",          terms: [] },
  ],
  identity: [
    { id: "user",      label: "User / Machine",  sub: "human or service",   terms: [] },
    { id: "mfa",       label: "MFA",             sub: "2nd factor",         terms: ["MFA / Passwordless"] },
    { id: "iam",       label: "IAM / PAM",       sub: "who gets what",      terms: ["IAM / PAM"] },
    { id: "nhi",       label: "Non-Human ID",    sub: "service accounts",   terms: ["Non-Human Identity"] },
    { id: "pki",       label: "PKI / Certs",     sub: "TLS lifecycle",      terms: ["PKI / Cert Management"] },
    { id: "sspm",      label: "SaaS Posture",    sub: "your SaaS apps",     terms: ["SSPM"] },
    { id: "app",       label: "Enterprise Resource", sub: "App · DB · API",  terms: [] },
  ],
  siem: [
    { id: "sources",   label: "All Sources",     sub: "logs · events",      terms: [] },
    { id: "ti",        label: "Threat Intel",    sub: "IOCs · TTPs",        terms: ["Threat Intelligence"] },
    { id: "siem_ueba", label: "SIEM / UEBA",     sub: "correlate · alert",  terms: ["SIEM", "UEBA"] },
    { id: "soar",      label: "SOAR",            sub: "auto-respond",       terms: ["SOAR"] },
    { id: "xdr",       label: "XDR",             sub: "cross-signal",       terms: ["XDR"] },
    { id: "asm",       label: "ASM",             sub: "external surface",   terms: ["Attack Surface Management"] },
    { id: "soc",       label: "SOC Response",    sub: "triage · hunt",      terms: [] },
  ],
};
