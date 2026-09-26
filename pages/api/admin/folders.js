import { requireAdmin } from "../../../lib/auth";
import { deleteStoredFiles, newId, updateDb } from "../../../lib/storage";

const cleanName = (n) => String(n || "").trim().slice(0, 120);

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    if (req.method === "POST") {
      const name = cleanName(req.body?.name);
      if (!name) return res.status(400).json({ error: "Folder name is required" });
      const folder = await updateDb((db) => {
        const f = { id: newId(), name, createdAt: new Date().toISOString() };
        db.folders.push(f);
        return f;
      });
      return res.status(200).json(folder);
    }

    if (req.method === "PUT") {
      const name = cleanName(req.body?.name);
      if (!name) return res.status(400).json({ error: "Folder name is required" });
      const ok = await updateDb((db) => {
        const f = db.folders.find((x) => x.id === req.body?.id);
        if (f) f.name = name;
        return !!f;
      });
      return ok ? res.status(200).json({ ok }) : res.status(404).json({ error: "Folder not found" });
    }

    if (req.method === "DELETE") {
      const id = req.query.id;
      const removed = await updateDb((db) => {
        const files = db.files.filter((f) => f.folderId === id);
        db.files = db.files.filter((f) => f.folderId !== id);
        db.folders = db.folders.filter((f) => f.id !== id);
        db.coupons.forEach((c) => { if (c.folderIds) c.folderIds = c.folderIds.filter((x) => x !== id); });
        return files;
      });
      await deleteStoredFiles(removed);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("Folders API error:", e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
