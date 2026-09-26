import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RW_BATCH, RW_TITLE, formatSize } from "../lib/format";

async function api(url, method = "GET", body) {
  const r = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(data.error || `Server error (${r.status}). Please try again.`), { status: r.status });
  return data;
}

function uploadLocal(folderId, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/api/admin/upload-local?folderId=${encodeURIComponent(folderId)}&name=${encodeURIComponent(file.name)}`);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve();
      let msg = "Upload failed";
      try { msg = JSON.parse(xhr.responseText).error || msg; } catch {}
      reject(new Error(msg));
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(file);
  });
}

async function uploadBlob(folderId, file, onProgress) {
  const { upload } = await import("@vercel/blob/client");
  const safe = file.name.replace(/[^\w.\-]+/g, "_");
  const blob = await upload(`onegrasp/files/${folderId}/${safe}`, file, {
    access: "private",
    handleUploadUrl: "/api/admin/blob-upload",
    multipart: file.size > 20 * 1024 * 1024,
    onUploadProgress: (p) => onProgress(Math.round(p.percentage)),
  });
  await api("/api/admin/files", "POST", {
    folderId, name: file.name, size: file.size, contentType: file.type, url: blob.url, pathname: blob.pathname,
  });
}

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return "RW-" + Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

function couponStatus(c) {
  if (!c.active) return { label: "Disabled", color: "#6B7280", bg: "#F3F4F6" };
  if (c.expiresAt && Date.parse(c.expiresAt) < Date.now()) return { label: "Expired", color: "#B45309", bg: "#FEF3C7" };
  if (c.maxUses != null && c.uses >= c.maxUses) return { label: "Used up", color: "#B45309", bg: "#FEF3C7" };
  return { label: "Active", color: "#15803D", bg: "#DCFCE7" };
}

export default function Admin() {
  const [state, setState] = useState(null);
  const [tab, setTab] = useState("materials");
  const [flash, setFlash] = useState(null);

  async function refresh() {
    try {
      setState(await api("/api/admin/state"));
    } catch (e) {
      if (e.status === 401) setState(false);
      else notify(e.message, true);
    }
  }

  function notify(msg, isError = false) {
    setFlash({ msg, isError });
    setTimeout(() => setFlash(null), 3500);
  }

  useEffect(() => { refresh(); }, []);

  async function logout() {
    await api("/api/admin/login", "DELETE");
    setState(false);
  }

  return (
    <>
      <Head>
        <title>Admin — OneGrasp</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={s.page}>
        <header style={s.header}>
          <Link href="/" style={s.logo}><img src="/images/onegrasp-logo.png" alt="OneGrasp" style={{ height: 44, width: "auto", display: "block" }} /><span style={s.adminTag}>Admin</span></Link>
          {state && <button onClick={logout} style={s.ghostBtn}>Log out</button>}
        </header>

        {state === null && <p style={s.muted}>Loading…</p>}
        {state === false && <Login onDone={refresh} />}

        {state && (
          <div style={s.wrap}>
            <div style={s.titleRow}>
              <div>
                <h1 style={s.h1}>{RW_TITLE} <span style={s.batch}>{RW_BATCH}</span></h1>
                <p style={s.sub}>Manage the folders, files and coupon codes for the <Link href="/research-writing" style={s.link}>{RW_TITLE}</Link> page.</p>
              </div>
            </div>

            {state.storage === "none" && (
              <div style={{ ...s.warn, background: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}>
                <strong>File storage is not connected yet.</strong> You can't create folders, upload files or add coupons until it is.
                In Vercel: open your project → <strong>Storage</strong> → <strong>Create Database</strong> → <strong>Blob</strong> → connect it to this project, then <strong>Deployments → ⋯ → Redeploy</strong>.
              </div>
            )}
            {state.storage === "local" && (
              <div style={s.warn}>
                <strong>Local storage mode.</strong> Files are saved in this computer's <code>data/</code> folder. This works for testing and self-hosted servers, but uploads will <strong>not</strong> persist on Vercel — set <code>BLOB_READ_WRITE_TOKEN</code> before going live.
              </div>
            )}

            <div style={s.tabs}>
              {[["materials", `Materials (${state.files.length})`], ["coupons", `Coupons (${state.coupons.length})`]].map(([k, label]) => (
                <button key={k} onClick={() => setTab(k)} style={tab === k ? s.tabOn : s.tab}>{label}</button>
              ))}
            </div>

            {tab === "materials" ? (
              <Materials state={state} refresh={refresh} notify={notify} />
            ) : (
              <Coupons state={state} refresh={refresh} notify={notify} />
            )}
          </div>
        )}

        {flash && <div style={{ ...s.flash, background: flash.isError ? "#C0292A" : "#1F2937" }}>{flash.msg}</div>}
      </div>
    </>
  );
}

function Login({ onDone }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/login", "POST", { password });
      onDone();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} style={s.loginCard}>
      <h1 style={{ ...s.h1, marginBottom: 6 }}>Admin login</h1>
      <p style={{ ...s.sub, marginBottom: 20 }}>Enter the admin password to manage materials and coupons.</p>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoFocus style={s.input} />
      {error && <p style={s.error}>{error}</p>}
      <button type="submit" disabled={busy || !password} className="og-buy-btn" style={{ marginTop: 14, marginBottom: 0 }}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

function Materials({ state, refresh, notify }) {
  const [newName, setNewName] = useState("");
  const [openId, setOpenId] = useState(null);
  const [renaming, setRenaming] = useState(null);
  const [uploads, setUploads] = useState([]);
  const fileInput = useRef(null);

  async function createFolder(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const f = await api("/api/admin/folders", "POST", { name: newName });
      setNewName("");
      setOpenId(f.id);
      await refresh();
      notify(`Folder "${f.name}" created`);
    } catch (err) { notify(err.message, true); }
  }

  async function rename(e) {
    e.preventDefault();
    try {
      await api("/api/admin/folders", "PUT", renaming);
      setRenaming(null);
      await refresh();
      notify("Folder renamed");
    } catch (err) { notify(err.message, true); }
  }

  async function deleteFolder(f, count) {
    if (!confirm(`Delete folder "${f.name}"${count ? ` and its ${count} file(s)` : ""}? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/folders?id=${f.id}`, "DELETE");
      if (openId === f.id) setOpenId(null);
      await refresh();
      notify("Folder deleted");
    } catch (err) { notify(err.message, true); }
  }

  async function deleteFile(file) {
    if (!confirm(`Delete "${file.name}"?`)) return;
    try {
      await api(`/api/admin/files?id=${file.id}`, "DELETE");
      await refresh();
      notify("File deleted");
    } catch (err) { notify(err.message, true); }
  }

  async function handleFiles(folderId, list) {
    const files = Array.from(list || []);
    if (!files.length) return;
    const doUpload = state.storage === "blob" ? uploadBlob : uploadLocal;
    setUploads(files.map((f) => ({ name: f.name, pct: 0 })));
    let failed = 0;
    for (let i = 0; i < files.length; i++) {
      try {
        await doUpload(folderId, files[i], (pct) =>
          setUploads((u) => u.map((x, j) => (j === i ? { ...x, pct } : x))));
        setUploads((u) => u.map((x, j) => (j === i ? { ...x, pct: 100, done: true } : x)));
      } catch (err) {
        failed++;
        setUploads((u) => u.map((x, j) => (j === i ? { ...x, error: err.message } : x)));
      }
    }
    await refresh();
    notify(failed ? `${failed} upload(s) failed` : `${files.length} file(s) uploaded`, !!failed);
    if (!failed) setTimeout(() => setUploads([]), 1500);
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <div style={s.panel}>
      <form onSubmit={createFolder} style={s.row}>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New folder name, e.g. Week 1 – Literature Review" style={{ ...s.input, flex: 1, minWidth: 200 }} />
        <button type="submit" disabled={!newName.trim()} style={s.primaryBtn}>+ Create folder</button>
      </form>

      {state.folders.length === 0 && <p style={{ ...s.muted, padding: "28px 0" }}>No folders yet. Create one above, then upload files into it.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        {state.folders.map((f) => {
          const files = state.files.filter((x) => x.folderId === f.id);
          const open = openId === f.id;
          return (
            <div key={f.id} style={s.folder}>
              <div style={s.folderHead}>
                {renaming?.id === f.id ? (
                  <form onSubmit={rename} style={{ ...s.row, flex: 1 }}>
                    <input value={renaming.name} onChange={(e) => setRenaming({ ...renaming, name: e.target.value })} autoFocus style={{ ...s.input, flex: 1, minWidth: 160 }} />
                    <button type="submit" style={s.primaryBtn}>Save</button>
                    <button type="button" onClick={() => setRenaming(null)} style={s.ghostBtn}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <button onClick={() => setOpenId(open ? null : f.id)} style={s.folderToggle}>
                      <span style={{ ...s.chev, transform: open ? "rotate(90deg)" : "none" }}>▶</span>
                      <span style={s.folderName}>{f.name}</span>
                      <span style={s.count}>{files.length} file{files.length === 1 ? "" : "s"}</span>
                    </button>
                    <div style={s.row}>
                      <button onClick={() => setRenaming({ id: f.id, name: f.name })} style={s.ghostBtn}>Rename</button>
                      <button onClick={() => deleteFolder(f, files.length)} style={s.dangerBtn}>Delete</button>
                    </div>
                  </>
                )}
              </div>

              {open && (
                <div style={s.folderBody}>
                  <label style={s.drop}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); handleFiles(f.id, e.dataTransfer.files); }}>
                    <input ref={fileInput} type="file" multiple style={{ display: "none" }} onChange={(e) => handleFiles(f.id, e.target.files)} />
                    <strong style={{ color: "#DB3433" }}>Click to upload</strong> or drag & drop files here (PDF, DOCX, PPTX, ZIP… up to 500 MB each)
                  </label>

                  {uploads.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      {uploads.map((u, i) => (
                        <div key={i} style={s.uploadRow}>
                          <span style={s.uploadName}>{u.name}</span>
                          {u.error ? <span style={s.errorSmall}>{u.error}</span> : (
                            <div style={s.bar}><div style={{ ...s.barFill, width: `${u.pct}%` }} /></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {files.length === 0 ? (
                    <p style={{ ...s.muted, padding: "16px 0 4px", textAlign: "left" }}>No files in this folder yet.</p>
                  ) : (
                    <div style={{ marginTop: 12 }}>
                      {files.map((file) => (
                        <div key={file.id} style={s.fileRow}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={s.fileName}>{file.name}</div>
                            <div style={s.fileMeta}>{formatSize(file.size)} · uploaded {new Date(file.uploadedAt).toLocaleString("en-IN")}</div>
                          </div>
                          <button onClick={() => deleteFile(file)} style={s.dangerBtn}>Delete</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const emptyForm = () => ({ code: randomCode(), maxUses: "", expiresOn: "", active: true, folderIds: [], note: "" });

function Coupons({ state, refresh, notify }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const formRef = useRef(null);
  const folderName = (id) => state.folders.find((f) => f.id === id)?.name || "(deleted)";

  function edit(c) {
    setEditingId(c.id);
    setForm({
      code: c.code,
      maxUses: c.maxUses ?? "",
      expiresOn: c.expiresAt ? c.expiresAt.slice(0, 10) : "",
      active: c.active,
      folderIds: c.folderIds || [],
      note: c.note || "",
      resetUses: false,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function cancel() {
    setEditingId(null);
    setForm(emptyForm());
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (editingId) await api("/api/admin/coupons", "PUT", { ...form, id: editingId });
      else await api("/api/admin/coupons", "POST", form);
      notify(editingId ? "Coupon updated" : `Coupon ${form.code.toUpperCase()} created`);
      cancel();
      await refresh();
    } catch (err) { notify(err.message, true); }
    setBusy(false);
  }

  async function toggle(c) {
    try {
      await api("/api/admin/coupons", "PATCH", { id: c.id, active: !c.active });
      await refresh();
      notify(c.active ? "Coupon disabled" : "Coupon enabled");
    } catch (err) { notify(err.message, true); }
  }

  async function remove(c) {
    if (!confirm(`Delete coupon ${c.code}? Anyone currently using it will lose access.`)) return;
    try {
      await api(`/api/admin/coupons?id=${c.id}`, "DELETE");
      if (editingId === c.id) cancel();
      await refresh();
      notify("Coupon deleted");
    } catch (err) { notify(err.message, true); }
  }

  const toggleFolder = (id) =>
    setForm((f) => ({ ...f, folderIds: f.folderIds.includes(id) ? f.folderIds.filter((x) => x !== id) : [...f.folderIds, id] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <form ref={formRef} onSubmit={save} style={s.panel}>
        <h2 style={s.h2}>{editingId ? `Edit coupon` : "Create a coupon"}</h2>
        <div className="og-admin-form">
          <label style={s.label}>Code
            <div style={s.row}>
              <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} style={{ ...s.input, flex: 1, minWidth: 140, fontWeight: 700, letterSpacing: "0.05em" }} />
              <button type="button" onClick={() => setForm({ ...form, code: randomCode() })} style={s.ghostBtn}>Generate</button>
            </div>
          </label>
          <label style={s.label}>Max uses <span style={s.hint}>(blank = unlimited)</span>
            <input type="number" min="1" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} placeholder="Unlimited" style={s.input} />
          </label>
          <label style={s.label}>Expires on <span style={s.hint}>(blank = never)</span>
            <input type="date" value={form.expiresOn} onChange={(e) => setForm({ ...form, expiresOn: e.target.value })} style={s.input} />
          </label>
          <label style={s.label}>Note <span style={s.hint}>(optional, admin only)</span>
            <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="e.g. Batch A students" style={s.input} />
          </label>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={s.labelText}>Folder access <span style={s.hint}>(none selected = all folders, including future ones)</span></div>
          {state.folders.length === 0 ? (
            <p style={{ ...s.hint, marginTop: 6 }}>No folders yet — this coupon will unlock all folders you create.</p>
          ) : (
            <div style={{ ...s.row, marginTop: 8 }}>
              {state.folders.map((f) => (
                <label key={f.id} style={form.folderIds.includes(f.id) ? s.chipOn : s.chip}>
                  <input type="checkbox" checked={form.folderIds.includes(f.id)} onChange={() => toggleFolder(f.id)} style={{ display: "none" }} />
                  {f.name}
                </label>
              ))}
            </div>
          )}
        </div>

        <div style={{ ...s.row, marginTop: 16 }}>
          <label style={s.check}><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          {editingId && (
            <label style={s.check}><input type="checkbox" checked={!!form.resetUses} onChange={(e) => setForm({ ...form, resetUses: e.target.checked })} /> Reset usage count to 0</label>
          )}
        </div>

        <div style={{ ...s.row, marginTop: 18 }}>
          <button type="submit" disabled={busy} style={s.primaryBtn}>{busy ? "Saving…" : editingId ? "Save changes" : "Create coupon"}</button>
          {editingId && <button type="button" onClick={cancel} style={s.ghostBtn}>Cancel</button>}
        </div>
      </form>

      <div style={s.panel}>
        <h2 style={s.h2}>All coupons</h2>
        {state.coupons.length === 0 ? (
          <p style={{ ...s.muted, textAlign: "left" }}>No coupons yet.</p>
        ) : (
          state.coupons.slice().reverse().map((c) => {
            const st = couponStatus(c);
            return (
              <div key={c.id} style={{ ...s.couponRow, background: editingId === c.id ? "#FEF2F2" : "transparent" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={s.row}>
                    <span style={s.code}>{c.code}</span>
                    <span style={{ ...s.status, color: st.color, background: st.bg }}>{st.label}</span>
                  </div>
                  <div style={s.fileMeta}>
                    Used {c.uses}{c.maxUses != null ? ` / ${c.maxUses}` : ""} ·{" "}
                    {c.expiresAt ? `expires ${new Date(c.expiresAt).toLocaleDateString("en-IN")}` : "no expiry"} ·{" "}
                    {c.folderIds?.length ? c.folderIds.map(folderName).join(", ") : "all folders"}
                    {c.note ? ` · ${c.note}` : ""}
                  </div>
                </div>
                <div style={s.row}>
                  <button onClick={() => navigator.clipboard?.writeText(c.code).then(() => notify("Code copied"))} style={s.ghostBtn}>Copy</button>
                  <button onClick={() => edit(c)} style={s.ghostBtn}>Edit</button>
                  <button onClick={() => toggle(c)} style={s.ghostBtn}>{c.active ? "Disable" : "Enable"}</button>
                  <button onClick={() => remove(c)} style={s.dangerBtn}>Delete</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const font = "'Poppins', sans-serif";
const btn = { borderRadius: 9, padding: "9px 14px", fontFamily: font, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" };

const s = {
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: font },
  header: {
    background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", height: 64, padding: "0 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10,
  },
  logo: { textDecoration: "none", fontSize: "1.4rem", fontWeight: 800, display: "flex", alignItems: "center" },
  adminTag: { marginLeft: 10, fontSize: "0.68rem", background: "#1F2937", color: "#FFF", padding: "3px 9px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.05em" },
  wrap: { maxWidth: 1000, margin: "0 auto", padding: "28px 16px 80px" },
  titleRow: { marginBottom: 16 },
  h1: { fontSize: "1.45rem", fontWeight: 800, color: "#1F2937", letterSpacing: "-0.02em" },
  batch: { fontSize: "0.75rem", fontWeight: 700, color: "#DB3433", background: "#FEF2F2", padding: "3px 10px", borderRadius: 100, verticalAlign: "middle" },
  h2: { fontSize: "1.02rem", fontWeight: 800, color: "#1F2937", marginBottom: 14 },
  sub: { fontSize: "0.85rem", color: "#6B7280", marginTop: 4, lineHeight: 1.6 },
  link: { color: "#DB3433", fontWeight: 600, textDecoration: "none" },
  muted: { color: "#6B7280", fontSize: "0.88rem", textAlign: "center", padding: 20 },
  warn: { background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E", borderRadius: 12, padding: "12px 16px", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: 16 },
  tabs: { display: "flex", gap: 6, marginBottom: 16, borderBottom: "1px solid #E5E7EB" },
  tab: { ...btn, background: "none", border: "none", borderBottom: "2px solid transparent", borderRadius: 0, color: "#6B7280", padding: "10px 14px", fontSize: "0.88rem" },
  tabOn: { ...btn, background: "none", border: "none", borderBottom: "2px solid #DB3433", borderRadius: 0, color: "#DB3433", padding: "10px 14px", fontSize: "0.88rem", fontWeight: 700 },
  panel: { background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 16, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" },
  row: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  input: { width: "100%", padding: "10px 12px", borderRadius: 9, border: "1.5px solid #E5E7EB", fontSize: "0.88rem", fontFamily: font, color: "#1F2937", background: "#FFFFFF" },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: "0.8rem", fontWeight: 700, color: "#1F2937" },
  labelText: { fontSize: "0.8rem", fontWeight: 700, color: "#1F2937" },
  hint: { fontWeight: 500, color: "#9CA3AF", fontSize: "0.74rem" },
  check: { display: "flex", alignItems: "center", gap: 6, fontSize: "0.83rem", color: "#1F2937", cursor: "pointer" },
  primaryBtn: { ...btn, background: "#DB3433", color: "#FFF", border: "none" },
  ghostBtn: { ...btn, background: "#FFF", color: "#4B5563", border: "1.5px solid #E5E7EB" },
  dangerBtn: { ...btn, background: "#FFF", color: "#C0292A", border: "1.5px solid #FECACA" },
  error: { color: "#DB3433", fontSize: "0.8rem", fontWeight: 600, marginTop: 8 },
  errorSmall: { color: "#DB3433", fontSize: "0.75rem", fontWeight: 600 },
  loginCard: { maxWidth: 400, margin: "80px auto", background: "#FFF", border: "1px solid #E5E7EB", borderRadius: 18, padding: "32px 26px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" },

  folder: { border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" },
  folderHead: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 14px", background: "#FFFFFF", flexWrap: "wrap" },
  folderToggle: { display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", fontFamily: font, textAlign: "left", minWidth: 0, flex: 1 },
  chev: { fontSize: "0.65rem", color: "#9CA3AF", transition: "transform 0.15s" },
  folderName: { fontWeight: 700, color: "#1F2937", fontSize: "0.92rem", overflowWrap: "anywhere" },
  count: { fontSize: "0.72rem", color: "#6B7280", background: "#F3F4F6", padding: "2px 8px", borderRadius: 100, whiteSpace: "nowrap" },
  folderBody: { padding: 14, borderTop: "1px solid #E5E7EB" },
  drop: { display: "block", border: "2px dashed #E5E7EB", borderRadius: 12, padding: "22px 16px", textAlign: "center", fontSize: "0.82rem", color: "#6B7280", cursor: "pointer", background: "#FCFCFD" },
  uploadRow: { display: "flex", alignItems: "center", gap: 12, padding: "6px 0", fontSize: "0.78rem" },
  uploadName: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#1F2937" },
  bar: { width: 140, height: 6, background: "#F3F4F6", borderRadius: 100, overflow: "hidden", flexShrink: 0 },
  barFill: { height: "100%", background: "#DB3433", transition: "width 0.2s" },
  fileRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: "1px solid #F3F4F6" },
  fileName: { fontWeight: 600, color: "#1F2937", fontSize: "0.85rem", overflowWrap: "anywhere" },
  fileMeta: { color: "#9CA3AF", fontSize: "0.74rem", marginTop: 3, lineHeight: 1.5 },

  chip: { ...btn, background: "#FFF", color: "#4B5563", border: "1.5px solid #E5E7EB", fontWeight: 500 },
  chipOn: { ...btn, background: "#FEF2F2", color: "#DB3433", border: "1.5px solid #DB3433" },
  couponRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 10px", borderTop: "1px solid #F3F4F6", flexWrap: "wrap", borderRadius: 8 },
  code: { fontWeight: 800, color: "#1F2937", letterSpacing: "0.05em", fontSize: "0.92rem" },
  status: { fontSize: "0.68rem", fontWeight: 700, padding: "2px 9px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.04em" },
  flash: { position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", color: "#FFF", padding: "11px 18px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 50, maxWidth: "calc(100% - 32px)" },
};
