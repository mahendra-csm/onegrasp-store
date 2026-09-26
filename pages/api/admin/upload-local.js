import { requireAdmin } from "../../../lib/auth";
import { StorageNotConfigured, loadDb, newId, storageMode, updateDb, writeLocalFile } from "../../../lib/storage";

export const config = { api: { bodyParser: false } };

const MAX_BYTES = 500 * 1024 * 1024;

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).json({ error: "Method not allowed" });
  if (!requireAdmin(req, res)) return;
  if (storageMode() === "none") return res.status(503).json({ error: new StorageNotConfigured().message });
  if (storageMode() !== "local") return res.status(400).json({ error: "Use Blob upload" });

  const { folderId } = req.query;
  const name = String(req.query.name || "").trim().slice(0, 200);
  if (!name) return res.status(400).json({ error: "File name is required" });

  const db = await loadDb();
  if (!db.folders.some((f) => f.id === folderId)) return res.status(404).json({ error: "Folder not found" });

  const id = newId();
  let size;
  try {
    size = await writeLocalFile(id, req, MAX_BYTES);
  } catch (e) {
    return res.status(413).json({ error: e.message });
  }

  const file = await updateDb((d) => {
    const f = {
      id, folderId, name, size,
      contentType: String(req.headers["content-type"] || "application/octet-stream"),
      uploadedAt: new Date().toISOString(),
    };
    d.files.push(f);
    return f;
  });
  res.status(200).json(file);
}
