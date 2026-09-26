import { requireAdmin } from "../../../lib/auth";
import { deleteStoredFiles, newId, storageMode, updateDb, errorMessage } from "../../../lib/storage";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    // Registers a file already uploaded straight to Vercel Blob from the browser.
    if (req.method === "POST") {
      if (storageMode() !== "blob") return res.status(400).json({ error: "Blob storage is not configured" });
      const { folderId, name, size, contentType, url, pathname } = req.body || {};
      let host;
      try { host = new URL(url).hostname; } catch { host = ""; }
      if (!host.endsWith(".blob.vercel-storage.com") || !String(pathname).startsWith("onegrasp/files/")) {
        return res.status(400).json({ error: "Invalid upload" });
      }
      const file = await updateDb((db) => {
        if (!db.folders.some((f) => f.id === folderId)) return null;
        const f = {
          id: newId(), folderId,
          name: String(name || "file").slice(0, 200),
          size: Number(size) || 0,
          contentType: String(contentType || "application/octet-stream"),
          url, pathname,
          uploadedAt: new Date().toISOString(),
        };
        db.files.push(f);
        return f;
      });
      return file ? res.status(200).json(file) : res.status(404).json({ error: "Folder not found" });
    }

    if (req.method === "DELETE") {
      const removed = await updateDb((db) => {
        const f = db.files.filter((x) => x.id === req.query.id);
        db.files = db.files.filter((x) => x.id !== req.query.id);
        return f;
      });
      await deleteStoredFiles(removed);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("Files API error:", e);
    res.status(500).json({ error: errorMessage(e) });
  }
}
