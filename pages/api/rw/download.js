import { getAccess } from "../../../lib/access";
import { folderAllowed, sendFile } from "../../../lib/storage";

export const config = { api: { responseLimit: false } };

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const access = await getAccess(req);
  if (!access) return res.status(401).json({ error: "Your access has expired. Please enter your coupon again." });

  const file = access.db.files.find((f) => f.id === req.query.id);
  if (!file || !folderAllowed(access.coupon, file.folderId)) return res.status(404).json({ error: "File not found" });

  await sendFile(res, file);
}
