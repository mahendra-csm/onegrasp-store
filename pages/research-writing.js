import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RW_BATCH, RW_TITLE, formatSize } from "../lib/format";

const FolderIcon = ({ size = 28, color = "#D42626" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const FileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
);

export default function ResearchWriting() {
  const [status, setStatus] = useState("loading");
  const [folders, setFolders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadContent() {
    const r = await fetch("/api/rw/content");
    if (r.ok) {
      setFolders((await r.json()).folders);
      setStatus("open");
    } else {
      setStatus("locked");
    }
  }

  useEffect(() => { loadContent(); }, []);

  async function redeem(e) {
    e.preventDefault();
    if (!code.trim()) { setError("Please enter a coupon code."); return; }
    setBusy(true);
    setError("");
    const r = await fetch("/api/rw/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) { setError(data.error || "Something went wrong."); return; }
    setCode("");
    await loadContent();
  }

  async function exit() {
    await fetch("/api/rw/redeem", { method: "DELETE" });
    setFolders([]);
    setOpenId(null);
    setStatus("locked");
  }

  const openFolder = folders.find((f) => f.id === openId);

  return (
    <>
      <Head>
        <title>{`${RW_TITLE} — ${RW_BATCH} — OneGrasp`}</title>
        <meta name="description" content="Research Writing programme materials. Enter your coupon code to access and download." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main style={s.main}>
        <section style={s.banner}>
          <span style={s.bannerBadge}>{RW_BATCH} Batch</span>
          <h1 style={s.bannerTitle}>{RW_TITLE}</h1>
          <p style={s.bannerSub}>Programme materials, templates and resources — unlocked with your coupon code.</p>
        </section>

        <div style={s.breadBar}>
          <div style={s.breadInner}>
            <Link href="/" style={s.breadLink}>Home</Link>
            <span style={s.breadSep}>/</span>
            <Link href="/#products" style={s.breadLink}>Products</Link>
            <span style={s.breadSep}>/</span>
            {openFolder ? (
              <>
                <button onClick={() => setOpenId(null)} style={s.breadBtn}>{RW_TITLE}</button>
                <span style={s.breadSep}>/</span>
                <span style={s.breadCurrent}>{openFolder.name}</span>
              </>
            ) : (
              <span style={s.breadCurrent}>{RW_TITLE}</span>
            )}
          </div>
        </div>

        <div style={s.wrap}>
          {status === "loading" && <p style={s.muted}>Loading…</p>}

          {status === "locked" && (
            <form onSubmit={redeem} style={s.lockCard}>
              <div style={s.lockIcon}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 style={s.lockTitle}>Enter your coupon code</h2>
              <p style={s.lockSub}>Use the coupon code shared with you to access the {RW_TITLE} materials.</p>
              <input
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
                placeholder="e.g. RW-SEP2026"
                autoComplete="off"
                style={s.codeInput}
              />
              {error && <p style={s.error}>{error}</p>}
              <button type="submit" disabled={busy} className="og-buy-btn" style={{ marginTop: 14 }}>
                {busy ? "Checking…" : "Unlock Materials"}
              </button>
              <p style={s.help}>
                Don't have a code? Email{" "}
                <a href="mailto:support@onegrasp.com" style={s.link}>support@onegrasp.com</a>
              </p>
            </form>
          )}

          {status === "open" && (
            <>
              <div style={s.toolbar}>
                <div style={s.granted}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Access granted
                </div>
                <button onClick={exit} style={s.ghostBtn}>Use a different code</button>
              </div>

              {!openFolder && (
                folders.length === 0 ? (
                  <p style={s.muted}>No materials have been published yet. Please check back soon.</p>
                ) : (
                  <div className="og-products-grid">
                    {folders.map((f) => (
                      <button key={f.id} onClick={() => setOpenId(f.id)} className="og-folder-card" style={s.folderCard}>
                        <div style={s.folderIconWrap}><FolderIcon /></div>
                        <div style={{ minWidth: 0 }}>
                          <div style={s.folderName}>{f.name}</div>
                          <div style={s.folderCount}>{f.files.length} {f.files.length === 1 ? "file" : "files"}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )
              )}

              {openFolder && (
                <div style={s.fileCard}>
                  <div style={s.fileHead}>
                    <button onClick={() => setOpenId(null)} style={s.ghostBtn}>← All folders</button>
                    <h2 style={s.fileHeadTitle}>{openFolder.name}</h2>
                  </div>
                  {openFolder.files.length === 0 ? (
                    <p style={{ ...s.muted, padding: 24 }}>This folder is empty.</p>
                  ) : (
                    openFolder.files.map((file) => (
                      <div key={file.id} className="og-file-row" style={s.fileRow}>
                        <FileIcon />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={s.fileName}>{file.name}</div>
                          <div style={s.fileMeta}>{formatSize(file.size)} · {new Date(file.uploadedAt).toLocaleDateString("en-IN")}</div>
                        </div>
                        <a href={`/api/rw/download?id=${file.id}`} className="og-view-btn" style={s.dlBtn}>Download</a>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

const font = "'Poppins', sans-serif";

const s = {
  main: { background: "#F8F9FA", minHeight: "70vh" },
  banner: {
    background: "linear-gradient(135deg, #0F172A 0%, #7F1D1D 100%)",
    padding: "56px 20px 48px",
    textAlign: "center",
  },
  bannerBadge: {
    display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.3)", padding: "4px 14px", borderRadius: "100px",
    fontSize: "0.7rem", fontWeight: 700, fontFamily: font, marginBottom: "12px",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  bannerTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#FFFFFF",
    fontFamily: font, letterSpacing: "-0.03em", marginBottom: "10px",
  },
  bannerSub: { fontSize: "0.92rem", color: "rgba(255,255,255,0.8)", fontFamily: font, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 },

  breadBar: { background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" },
  breadInner: {
    maxWidth: "1200px", margin: "0 auto", padding: "12px 20px",
    display: "flex", alignItems: "center", gap: "8px",
    fontFamily: font, fontSize: "0.8rem", flexWrap: "wrap",
  },
  breadLink: { color: "#64748B", textDecoration: "none", fontWeight: 500 },
  breadBtn: { color: "#64748B", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: font, fontSize: "0.8rem", padding: 0 },
  breadSep: { color: "#CBD5E1" },
  breadCurrent: { color: "#0F172A", fontWeight: 600 },

  wrap: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" },
  muted: { fontFamily: font, color: "#64748B", textAlign: "center", fontSize: "0.9rem" },

  lockCard: {
    maxWidth: 440, margin: "0 auto", background: "#FFFFFF", borderRadius: 18,
    border: "1px solid #E2E8F0", boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    padding: "36px 28px", textAlign: "center",
  },
  lockIcon: {
    width: 60, height: 60, borderRadius: 16, background: "#FEF2F2",
    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
  },
  lockTitle: { fontFamily: font, fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", marginBottom: 8 },
  lockSub: { fontFamily: font, fontSize: "0.85rem", color: "#64748B", lineHeight: 1.6, marginBottom: 20 },
  codeInput: {
    width: "100%", padding: "13px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0",
    fontSize: "1rem", fontFamily: font, fontWeight: 700, letterSpacing: "0.08em",
    textAlign: "center", color: "#0F172A", background: "#F8F9FA",
  },
  error: { color: "#D42626", fontSize: "0.8rem", fontWeight: 600, fontFamily: font, marginTop: 8 },
  help: { fontFamily: font, fontSize: "0.78rem", color: "#64748B", marginTop: 4 },
  link: { color: "#D42626", fontWeight: 600, textDecoration: "none" },

  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" },
  granted: { display: "flex", alignItems: "center", gap: 8, fontFamily: font, fontWeight: 600, color: "#16a34a", fontSize: "0.88rem" },
  ghostBtn: {
    background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 9, padding: "8px 14px",
    fontFamily: font, fontSize: "0.8rem", fontWeight: 600, color: "#475569", cursor: "pointer",
  },

  folderCard: {
    display: "flex", alignItems: "center", gap: 16, textAlign: "left", width: "100%",
    background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "22px 20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)", cursor: "pointer", fontFamily: font,
  },
  folderIconWrap: {
    width: 52, height: 52, borderRadius: 12, background: "#FEF2F2", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  folderName: { fontWeight: 700, color: "#0F172A", fontSize: "0.95rem", overflowWrap: "anywhere" },
  folderCount: { color: "#64748B", fontSize: "0.78rem", marginTop: 2 },

  fileCard: { background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" },
  fileHead: { display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: "1px solid #F1F5F9", flexWrap: "wrap" },
  fileHeadTitle: { fontFamily: font, fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", overflowWrap: "anywhere" },
  fileRow: { display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: "1px solid #F1F5F9" },
  fileName: { fontFamily: font, fontWeight: 600, color: "#0F172A", fontSize: "0.88rem", overflowWrap: "anywhere" },
  fileMeta: { fontFamily: font, color: "#94A3B8", fontSize: "0.74rem", marginTop: 2 },
  dlBtn: {
    background: "#D42626", color: "#FFFFFF", padding: "9px 16px", borderRadius: 9, textDecoration: "none",
    fontFamily: font, fontWeight: 700, fontSize: "0.8rem", whiteSpace: "nowrap", flexShrink: 0,
  },
};
