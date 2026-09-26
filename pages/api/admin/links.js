import { requireAdmin } from "../../../lib/auth";
import { cleanUrl, errorMessage, newId, updateDb } from "../../../lib/storage";

function parseLink(body) {
  const title = String(body?.title || "").trim().slice(0, 150);
  const url = cleanUrl(body?.url);
  if (!title) return { error: "Please enter a title for the link" };
  if (!url) return { error: "Please enter a full web address starting with https://" };
  return { value: { title, url } };
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    if (req.method === "POST") {
      const parsed = parseLink(req.body);
      if (parsed.error) return res.status(400).json({ error: parsed.error });
      const link = await updateDb((db) => {
        if (!db.folders.some((f) => f.id === req.body.folderId)) return null;
        const l = { id: newId(), folderId: req.body.folderId, ...parsed.value, createdAt: new Date().toISOString() };
        db.links.push(l);
        return l;
      });
      return link ? res.status(200).json(link) : res.status(404).json({ error: "Folder not found" });
    }

    if (req.method === "PUT") {
      const parsed = parseLink(req.body);
      if (parsed.error) return res.status(400).json({ error: parsed.error });
      const link = await updateDb((db) => {
        const l = db.links.find((x) => x.id === req.body.id);
        if (l) Object.assign(l, parsed.value);
        return l;
      });
      return link ? res.status(200).json(link) : res.status(404).json({ error: "Link not found" });
    }

    if (req.method === "DELETE") {
      await updateDb((db) => { db.links = db.links.filter((l) => l.id !== req.query.id); });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("Links API error:", e);
    res.status(500).json({ error: errorMessage(e) });
  }
}
