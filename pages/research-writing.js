import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { RW_BATCH, RW_TITLE, formatSize } from "../lib/format";

const FolderIcon = ({ size = 28, color = "#DB3433" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const FileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DB3433" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
        <PageHero
          crumbs={
            <>
              <Link href="/">Home</Link><span>/</span>
              <Link href="/#products">Toolkit</Link><span>/</span>
              {openFolder ? (
                <><button onClick={() => setOpenId(null)}>{RW_TITLE}</button><span>/</span><strong>{openFolder.name}</strong></>
              ) : (
                <strong>{RW_TITLE}</strong>
              )}
            </>
          }
          kicker={`${RW_BATCH} batch`}
          title={<>Research <em>Writing</em></>}
          subtitle="Programme materials, templates and resources — unlocked with your coupon code."
        />

        <div style={s.wrap}>
          {status === "loading" && <p style={s.muted}>Loading…</p>}

          {status === "locked" && (
            <form onSubmit={redeem} style={s.lockCard}>
              <div style={s.lockIcon}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#DB3433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DB3433" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
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
  main: { background: "#FFFFFF", minHeight: "70vh" },
  wrap: { maxWidth: "1240px", margin: "0 auto", padding: "32px 16px 56px" },
  muted: { fontFamily: font, color: "#6B7280", textAlign: "center", fontSize: "0.9rem" },

  lockCard: {
    maxWidth: 460, margin: "0 auto", background: "#FFFFFF", borderRadius: 28,
    border: "1px solid #E7E7EA", boxShadow: "0 30px 60px -30px rgba(14,14,17,0.25)",
    padding: "36px 28px", textAlign: "center",
  },
  lockIcon: {
    width: 60, height: 60, borderRadius: 16, background: "#FEF2F2",
    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
  },
  lockTitle: { fontFamily: font, fontSize: "1.25rem", fontWeight: 800, color: "#1F2937", marginBottom: 8 },
  lockSub: { fontFamily: font, fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.6, marginBottom: 20 },
  codeInput: {
    width: "100%", padding: "14px 16px", borderRadius: 16, border: "1.5px solid #E7E7EA",
    fontSize: "1rem", fontFamily: font, fontWeight: 700, letterSpacing: "0.08em",
    textAlign: "center", color: "#1F2937", background: "#FFFFFF",
  },
  error: { color: "#DB3433", fontSize: "0.8rem", fontWeight: 600, fontFamily: font, marginTop: 8 },
  help: { fontFamily: font, fontSize: "0.78rem", color: "#6B7280", marginTop: 4 },
  link: { color: "#DB3433", fontWeight: 600, textDecoration: "none" },

  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" },
  granted: { display: "flex", alignItems: "center", gap: 8, fontFamily: font, fontWeight: 600, color: "#DB3433", fontSize: "0.88rem" },
  ghostBtn: {
    background: "#FFFFFF", border: "1.5px solid #E7E7EA", borderRadius: 999, padding: "9px 16px",
    fontFamily: font, fontSize: "0.8rem", fontWeight: 600, color: "#4B5563", cursor: "pointer",
  },

  folderCard: {
    display: "flex", alignItems: "center", gap: 16, textAlign: "left", width: "100%",
    background: "#F5F5F6", border: "1px solid #E7E7EA", borderRadius: 24, padding: "24px 22px",
    cursor: "pointer", fontFamily: font,
  },
  folderIconWrap: {
    width: 52, height: 52, borderRadius: 12, background: "#FEF2F2", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  folderName: { fontWeight: 700, color: "#1F2937", fontSize: "0.95rem", overflowWrap: "anywhere" },
  folderCount: { color: "#6B7280", fontSize: "0.78rem", marginTop: 2 },

  fileCard: { background: "#FFFFFF", border: "1px solid #E7E7EA", borderRadius: 24, overflow: "hidden" },
  fileHead: { display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: "1px solid #F3F4F6", flexWrap: "wrap" },
  fileHeadTitle: { fontFamily: font, fontSize: "1.05rem", fontWeight: 800, color: "#1F2937", overflowWrap: "anywhere" },
  fileRow: { display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: "1px solid #F3F4F6" },
  fileName: { fontFamily: font, fontWeight: 600, color: "#1F2937", fontSize: "0.88rem", overflowWrap: "anywhere" },
  fileMeta: { fontFamily: font, color: "#9CA3AF", fontSize: "0.74rem", marginTop: 2 },
  dlBtn: {
    background: "#0E0E11", color: "#FFFFFF", padding: "10px 18px", borderRadius: 999, textDecoration: "none",
    fontFamily: font, fontWeight: 700, fontSize: "0.8rem", whiteSpace: "nowrap", flexShrink: 0,
  },
};
