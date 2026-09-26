import { requireAdmin } from "../../../lib/auth";
import { loadDb, storageMode } from "../../../lib/storage";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!requireAdmin(req, res)) return;
  const db = await loadDb();
  res.status(200).json({ storage: storageMode(), ...db });
}
