import { useState, useRef, useEffect } from "react";
import { ARCH_FLOWS } from "./data/flows";
import { JARGON, LAYER_KEYS } from "./data/jargon";
import { LAYER_FLOWS } from "./data/layerFlows";

// ─── THEME ─────────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#080c18", panel: "#0c1222", card: "#0f1628", border: "#1a2540",
    text: "#dce8f5", muted: "#9ab4cc", dim: "#1e2d45", subtext: "#a8c4dc",
    tableRow: "#0c1525", tableBorder: "#162035",
  },
  light: {
    bg: "#f0f4f9", panel: "#ffffff", card: "#ffffff", border: "#d1dce8",
    text: "#0f1c2e", muted: "#2e4a68", dim: "#dde6f0", subtext: "#1e3a58",
    tableRow: "#f7fafd", tableBorder: "#e2eaf3",
  },
};

// Derived from JARGON — single source of truth, no manual color duplication
const LAYERS = LAYER_KEYS.map(key => ({
  key,
  label: JARGON[key].label,
  color: JARGON[key].color,
}));

// Computed once — JARGON is a static module-level constant
const TOTAL_TERMS = Object.values(JARGON).reduce((a, l) => a + l.terms.length, 0);

// Shared badge styles
const BADGE = {
  oss:     { fontSize: 12, padding: "2px 7px", background: "rgba(16,185,129,0.1)",  border: "1px solid rgba(16,185,129,0.25)",  borderRadius: 3, color: "#10b981" },
  public:  { fontSize: 12, padding: "2px 7px", background: "rgba(0,112,243,0.08)",  border: "1px solid rgba(0,112,243,0.2)",    borderRadius: 3, color: "#60a5fa" },
  private: { fontSize: 12, padding: "2px 7px", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",   borderRadius: 3, color: "#a78bfa" },
};

const VENDOR_ITEM = {
  oss:     { display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", marginBottom: 6, background: "rgba(16,185,129,0.06)",  border: "1px solid rgba(16,185,129,0.18)",  borderRadius: 5, color: "#10b981", textDecoration: "none", fontSize: 14 },
  public:  { fontSize: 14, padding: "6px 12px", background: "rgba(0,112,243,0.07)",  border: "1px solid rgba(0,112,243,0.18)",  borderRadius: 5, color: "#2563eb" },
  private: { fontSize: 14, padding: "6px 12px", background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 5, color: "#7c3aed" },
};

// Keyboard activation for div-as-button elements
const onKey = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
};

// Responsive width hook
function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ─── FULL LAYER FLOW DIAGRAM ───────────────────────────────────────────────────
// Each stage is a container box. Tool-bearing stages show their terms as sub-boxes inside.
// Endpoint stages (Internet, Your App, etc.) are compact and never dimmed.
function LayerFlowDiagram({ layerKey, layerData, activeTerm, color, theme, onSelectTerm }) {
  const T = THEMES[theme];
  const nodes = LAYER_FLOWS[layerKey];
  if (!nodes) return null;

  const activeTermKey = activeTerm?.term ?? null;

  const termObjFor = (termKey) =>
    layerData?.terms.find(t => t.term === termKey) ?? null;

  return (
    <div style={{ marginTop: 14, overflowX: "auto", paddingBottom: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: "max-content" }}>
        {nodes.map((node, i) => {
          const isEndpoint        = node.terms.length === 0;
          const isContainerActive = !!activeTermKey && node.terms.includes(activeTermKey);
          const isDimmed          = !!activeTermKey && !isContainerActive && !isEndpoint;

          return (
            <div key={node.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>

              {isEndpoint ? (
                <div style={{
                  padding: "10px 14px", borderRadius: 8, textAlign: "center",
                  border: `1px solid ${T.border}`, background: T.tableRow,
                  minWidth: 82,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.muted }}>{node.label}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{node.sub}</div>
                </div>
              ) : (
                <div style={{
                  padding: "10px 12px", borderRadius: 10, minWidth: 130,
                  border: `2px solid ${isContainerActive ? color : isDimmed ? T.dim : T.border}`,
                  background: isContainerActive ? `${color}14` : isDimmed ? "transparent" : T.card,
                  boxShadow: isContainerActive ? `0 0 16px ${color}28` : "none",
                  opacity: isDimmed ? 0.28 : 1,
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: isContainerActive ? color : T.text }}>
                    {node.label}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 1, marginBottom: 7 }}>
                    {node.sub}
                  </div>
                  <div style={{ height: 1, background: isContainerActive ? `${color}35` : T.dim, marginBottom: 7 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {node.terms.map(termKey => {
                      const isTermActive = activeTermKey === termKey;
                      const termObj = termObjFor(termKey);
                      return (
                        <div
                          key={termKey}
                          role="button" tabIndex={0}
                          onClick={() => termObj && onSelectTerm(isTermActive ? null : termObj)}
                          onKeyDown={onKey(() => termObj && onSelectTerm(isTermActive ? null : termObj))}
                          style={{
                            padding: "4px 9px", borderRadius: 4, fontSize: 12,
                            background: isTermActive ? `${color}22` : `${color}08`,
                            border: `1px solid ${isTermActive ? color : `${color}28`}`,
                            color: isTermActive ? color : T.subtext,
                            fontWeight: isTermActive ? 700 : 400,
                            cursor: "pointer", outline: "none",
                            transition: "all 0.15s",
                          }}>
                          {termKey}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {i < nodes.length - 1 && (
                <div style={{ padding: "0 5px", flexShrink: 0, opacity: isDimmed ? 0.12 : 0.45 }}>
                  <span style={{ fontSize: 18, color: T.muted }}>→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PER-TERM FLOW DIAGRAM (detail panel) ─────────────────────────────────────
function FlowDiagram({ term, color, theme }) {
  const T = THEMES[theme];
  const flow = ARCH_FLOWS[term];
  if (!flow) return null;

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 13, color: T.muted, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>
        Where it fits in your architecture
      </div>
      <div style={{ display: "flex", alignItems: "center", overflowX: "auto", gap: 0, paddingBottom: 6 }}>
        {flow.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              padding: "11px 16px", borderRadius: 8,
              border: `2px solid ${step.hi ? color : T.border}`,
              background: step.hi ? `${color}18` : T.tableRow,
              boxShadow: step.hi ? `0 0 16px ${color}30` : "none",
              minWidth: 120, textAlign: "center",
            }}>
              <div style={{ fontSize: 15, fontWeight: step.hi ? 700 : 500, color: step.hi ? color : T.text, lineHeight: 1.3 }}>
                {step.label}
              </div>
              <div style={{ fontSize: 13, color: step.hi ? `${color}cc` : T.muted, marginTop: 4 }}>
                {step.sub}
              </div>
            </div>
            {i < flow.steps.length - 1 && (
              <div style={{ padding: "0 6px", flexShrink: 0 }}>
                <div style={{ fontSize: 20, color: T.muted, lineHeight: 1 }}>→</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 14, color: T.muted, fontStyle: "italic" }}>{flow.desc}</div>
    </div>
  );
}

// ─── HOME MAP ─────────────────────────────────────────────────────────────────
// Full-architecture overview: all 6 layers stacked top-to-bottom, each with its
// interactive flow diagram. Clicking any term navigates straight into that layer.
function HomeMap({ theme, isMobile, onSelectLayer, onSelectTerm }) {
  const T = THEMES[theme];

  return (
    <div style={{ overflowY: "auto", height: "100%", padding: isMobile ? "16px 12px" : "28px 36px" }}>

      {/* Header */}
      <div style={{ marginBottom: 28, borderBottom: `1px solid ${T.border}`, paddingBottom: 20 }}>
        <div style={{ fontSize: isMobile ? 22 : 30, fontWeight: 700, color: T.text, letterSpacing: -0.5, marginBottom: 8 }}>
          Enterprise Security Architecture
        </div>
        <div style={{ fontSize: 15, color: T.muted, lineHeight: 1.8 }}>
          Every security layer mapped to where it sits in your stack.
          Click any term to explore its vendors, OSS tools, and flow.
        </div>
      </div>

      {/* Layer bands */}
      {LAYER_KEYS.map((key, i) => {
        const layer = JARGON[key];
        return (
          <div key={key}>
            {/* Layer band */}
            <div style={{
              borderRadius: 14,
              border: `1px solid ${layer.color}28`,
              borderLeft: `4px solid ${layer.color}`,
              background: `${layer.color}06`,
              padding: isMobile ? "14px 14px" : "18px 22px",
              transition: "box-shadow 0.2s",
            }}>
              {/* Clickable layer header */}
              <div
                role="button" tabIndex={0}
                onClick={() => onSelectLayer(key)}
                onKeyDown={onKey(() => onSelectLayer(key))}
                style={{
                  display: "flex", alignItems: "baseline", gap: 10,
                  cursor: "pointer", outline: "none", marginBottom: 2,
                }}>
                <div style={{ fontSize: isMobile ? 16 : 19, fontWeight: 700, color: layer.color }}>
                  {layer.label}
                </div>
                <div style={{ fontSize: 13, color: T.muted, flex: 1 }}>
                  {layer.subtitle}
                </div>
                <div style={{ fontSize: 13, color: layer.color, opacity: 0.75, whiteSpace: "nowrap", flexShrink: 0 }}>
                  {layer.terms.length} terms →
                </div>
              </div>

              {/* Flow diagram — all terms clickable, none dimmed */}
              <LayerFlowDiagram
                layerKey={key}
                layerData={layer}
                activeTerm={null}
                color={layer.color}
                theme={theme}
                onSelectTerm={(termObj) => {
                  onSelectLayer(key);
                  onSelectTerm(termObj);
                }}
              />
            </div>

            {/* Connector arrow between layers */}
            {i < LAYER_KEYS.length - 1 && (
              <div style={{ textAlign: "center", padding: "8px 0", userSelect: "none" }}>
                <span style={{ fontSize: 22, color: T.dim }}>↓</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Footer */}
      <div style={{ marginTop: 28, paddingTop: 16, borderTop: `1px solid ${T.border}`, fontSize: 13, color: T.muted, textAlign: "center" }}>
        {TOTAL_TERMS} terms · {LAYER_KEYS.length} layers · Click any layer name to drill in
      </div>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("light");
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeTerm, setActiveTerm] = useState(null);
  const detailRef = useRef(null);
  const width = useWindowWidth();
  const isMobile = width < 640;

  useEffect(() => {
    if (activeTerm) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeTerm]);

  const T = THEMES[theme];
  const layerData = activeLayer ? JARGON[activeLayer] : null;
  const layerColor = layerData?.color ?? "#0070f3";

  const selectLayer = (key) => {
    setActiveLayer(prev => prev === key ? null : key);
    setActiveTerm(null);
  };

  return (
    <div style={{
      fontFamily: "'IBM Plex Mono','Fira Code','Courier New',monospace",
      background: T.bg, height: "100%", overflow: "hidden",
      color: T.text, display: "flex", flexDirection: "column",
      transition: "background 0.2s, color 0.2s",
    }}>

      {/* ── TOP BAR ── */}
      <div style={{
        background: T.panel, borderBottom: `1px solid ${T.border}`,
        padding: "14px 22px", display: "flex", alignItems: "center",
        gap: 16, flexWrap: "wrap", flexShrink: 0,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            role="button" tabIndex={0}
            onClick={() => { setActiveLayer(null); setActiveTerm(null); }}
            onKeyDown={onKey(() => { setActiveLayer(null); setActiveTerm(null); })}
            style={{ fontSize: isMobile ? 17 : 21, fontWeight: 700, color: T.text, letterSpacing: -0.3, cursor: "pointer", outline: "none", display: "inline-block" }}>
            Security Landscape
          </div>
        </div>

        {!isMobile && (
          <div style={{ fontSize: 14, color: T.muted }}>
            {Object.keys(JARGON).length} layers · <span style={{ color: "#0070f3" }}>{TOTAL_TERMS} terms</span>
          </div>
        )}

        <button
          onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
          style={{ padding: "7px 16px", fontSize: 14, cursor: "pointer", borderRadius: 20, border: `1px solid ${T.border}`, background: T.card, color: T.muted, display: "flex", alignItems: "center", gap: 6 }}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

      </div>

      {/* ── MAP VIEW ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: isMobile ? "column" : "row" }}>

          {/* SIDEBAR */}
          <div style={{
            width: isMobile ? "100%" : 230,
            borderRight: isMobile ? "none" : `1px solid ${T.border}`,
            borderBottom: isMobile ? `1px solid ${T.border}` : "none",
            background: T.panel, flexShrink: 0,
            display: "flex", flexDirection: isMobile ? "row" : "column",
            overflowX: isMobile ? "auto" : "hidden",
            overflowY: isMobile ? "hidden" : "auto",
          }}>
            {!isMobile && (
              <div style={{ padding: "13px 16px 6px", fontSize: 12, color: T.muted, letterSpacing: 2, textTransform: "uppercase" }}>
                Security Layers
              </div>
            )}
            {LAYERS.map(l => {
              const isActive = activeLayer === l.key;
              const data = JARGON[l.key];
              return (
                <div key={l.key}
                  role="button" tabIndex={0}
                  onClick={() => selectLayer(l.key)}
                  onKeyDown={onKey(() => selectLayer(l.key))}
                  style={{
                    padding: "12px 16px", cursor: "pointer",
                    flexShrink: isMobile ? 0 : undefined,
                    borderLeft: !isMobile ? `3px solid ${isActive ? l.color : "transparent"}` : "none",
                    borderBottom: isMobile ? `3px solid ${isActive ? l.color : "transparent"}` : "none",
                    background: isActive ? `${l.color}12` : "transparent",
                    transition: "all 0.12s", marginBottom: isMobile ? 0 : 1, outline: "none",
                  }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: isActive ? l.color : T.text, whiteSpace: isMobile ? "nowrap" : undefined }}>
                    {l.label}
                  </div>
                  {!isMobile && (
                    <>
                      <div style={{ fontSize: 13, color: T.muted, marginTop: 3 }}>{data.subtitle}</div>
                      <div style={{ fontSize: 13, color: l.color, marginTop: 4, opacity: 0.8 }}>{data.terms.length} terms</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {!activeLayer && (
              <HomeMap
                theme={theme}
                isMobile={isMobile}
                onSelectLayer={(key) => { setActiveLayer(key); setActiveTerm(null); }}
                onSelectTerm={setActiveTerm}
              />
            )}

            {activeLayer && layerData && (
              <>
                {/* Layer header */}
                <div style={{ padding: "16px 22px", borderBottom: `1px solid ${T.border}`, background: `${layerColor}08` }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: layerColor }}>{layerData.label}</div>
                  <div style={{ fontSize: 14, color: T.muted, marginTop: 6, lineHeight: 1.7, maxWidth: 760 }}>
                    <span style={{ color: "#f59e0b", fontWeight: 600 }}>⚠ My take: </span>{layerData.critique}
                  </div>
                  {layerData.missing?.length > 0 && (
                    <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: T.muted }}>ALSO IN THIS SPACE:</span>
                      {layerData.missing.map(m => (
                        <span key={m} style={{ fontSize: 12, padding: "3px 8px", border: `1px dashed ${T.dim}`, borderRadius: 3, color: T.muted }}>{m}</span>
                      ))}
                    </div>
                  )}

                  {/* Full layer architecture flow — highlights active term's node, dims others */}
                  <LayerFlowDiagram
                    layerKey={activeLayer}
                    layerData={layerData}
                    activeTerm={activeTerm}
                    color={layerColor}
                    theme={theme}
                    onSelectTerm={setActiveTerm}
                  />
                </div>

                {/* Terms grid */}
                <div style={{ padding: "16px 22px", display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? 170 : 210}px, 1fr))`, gap: 12 }}>
                  {layerData.terms.map(item => {
                    const isActive = activeTerm?.term === item.term;
                    return (
                      <div key={item.term}
                        role="button" tabIndex={0}
                        onClick={() => setActiveTerm(isActive ? null : item)}
                        onKeyDown={onKey(() => setActiveTerm(isActive ? null : item))}
                        style={{
                          padding: "13px 14px",
                          background: isActive ? `${layerColor}16` : T.card,
                          border: `1px solid ${isActive ? layerColor : T.border}`,
                          borderRadius: 8, cursor: "pointer", transition: "all 0.12s",
                          borderTop: `2px solid ${isActive ? layerColor : T.dim}`,
                          outline: "none",
                        }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: isActive ? layerColor : T.text, marginBottom: 5 }}>
                          {item.term}
                        </div>
                        <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5, marginBottom: 10 }}>
                          {item.full}
                        </div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {item.oss.length > 0 && <span style={BADGE.oss}>OSS ✓</span>}
                          <span style={BADGE.public}>{item.publicCos.length} public</span>
                          <span style={BADGE.private}>{item.privateCos.length} private</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── DETAIL PANEL ── */}
                {activeTerm && (
                  <div ref={detailRef} style={{ margin: "0 22px 28px", background: T.card, border: `1px solid ${T.border}`, borderTop: `3px solid ${layerColor}`, borderRadius: 10, overflow: "hidden" }}>

                    <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: `${layerColor}08` }}>
                      <div>
                        <div style={{ fontSize: 12, color: layerColor, letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>{layerData.label}</div>
                        <div style={{ fontSize: 26, fontWeight: 700, color: T.text }}>{activeTerm.term}</div>
                        <div style={{ fontSize: 14, color: T.muted, marginTop: 3 }}>{activeTerm.full}</div>
                      </div>
                      <button
                        aria-label="Close"
                        onClick={() => setActiveTerm(null)}
                        style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 4, color: T.muted, cursor: "pointer", padding: "5px 12px", fontSize: 16 }}>
                        ✕
                      </button>
                    </div>

                    <div style={{ padding: "16px 20px 0", borderBottom: `1px solid ${T.border}` }}>
                      <p style={{ fontSize: 15, color: T.text, lineHeight: 1.85, margin: 0, paddingBottom: 16 }}>
                        {activeTerm.desc}
                      </p>
                    </div>

                    <div style={{ padding: "18px 20px", borderBottom: `1px solid ${T.border}`, background: theme === "light" ? "#f7fafd" : "#080e1c" }}>
                      <FlowDiagram term={activeTerm.term} color={layerColor} theme={theme} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", padding: "16px 20px", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 12, color: "#10b981", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>🟢 Open Source</div>
                        {activeTerm.oss.length === 0
                          ? <div style={{ fontSize: 14, color: T.muted }}>No notable OSS in this space</div>
                          : activeTerm.oss.map(o => (
                            <a key={o.name} href={o.url} target="_blank" rel="noreferrer" style={VENDOR_ITEM.oss}>
                              ↗ {o.name}
                            </a>
                          ))}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#2563eb", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>🏛 Public Companies</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {activeTerm.publicCos.map(c => (
                            <span key={c} style={VENDOR_ITEM.public}>{c}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#7c3aed", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>🦄 Private / Startup</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {activeTerm.privateCos.map(c => (
                            <span key={c} style={VENDOR_ITEM.private}>{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
      </div>
    </div>
  );
}
