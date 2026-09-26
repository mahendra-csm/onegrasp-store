import { getAccess } from "../../../lib/access";
import { folderAllowed } from "../../../lib/storage";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  res.setHeader("Cache-Control", "private, no-store");

  const access = await getAccess(req);
  if (!access) return res.status(401).json({ error: "Coupon required" });

  const { db, coupon } = access;
  const folders = db.folders
    .filter((f) => folderAllowed(coupon, f.id))
    .map((f) => ({
      id: f.id,
      name: f.name,
      files: db.files
        .filter((x) => x.folderId === f.id)
        .map(({ id, name, size, uploadedAt }) => ({ id, name, size, uploadedAt })),
      links: db.links
        .filter((l) => l.folderId === f.id)
        .map(({ id, title, url }) => ({ id, title, url })),
    }));

  res.status(200).json({ folders });
}
