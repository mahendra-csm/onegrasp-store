import { requireAdmin } from "../../../lib/auth";
import { newId, normalizeCode, updateDb, errorMessage } from "../../../lib/storage";

function parseCoupon(body, db) {
  const code = normalizeCode(body.code);
  if (!/^[A-Z0-9_-]{4,40}$/.test(code)) {
    return { error: "Code must be 4–40 characters: letters, numbers, - or _" };
  }
  const maxUses = body.maxUses === "" || body.maxUses == null ? null : parseInt(body.maxUses, 10);
  if (maxUses !== null && (!Number.isFinite(maxUses) || maxUses < 1)) return { error: "Max uses must be 1 or more (or blank for unlimited)" };

  let expiresAt = null;
  if (body.expiresOn) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.expiresOn)) return { error: "Invalid expiry date" };
    expiresAt = `${body.expiresOn}T23:59:59+05:30`;
  }

  const folderIds = Array.isArray(body.folderIds)
    ? body.folderIds.filter((id) => db.folders.some((f) => f.id === id))
    : [];

  return {
    value: {
      code,
      maxUses,
      expiresAt,
      folderIds,
      active: body.active !== false,
      note: String(body.note || "").trim().slice(0, 200),
    },
  };
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    if (req.method === "POST" || req.method === "PUT") {
      const result = await updateDb((db) => {
        const parsed = parseCoupon(req.body || {}, db);
        if (parsed.error) return { status: 400, error: parsed.error };
        const clash = db.coupons.find((c) => c.code === parsed.value.code && c.id !== req.body.id);
        if (clash) return { status: 409, error: "A coupon with this code already exists" };

        if (req.method === "POST") {
          const c = { id: newId(), uses: 0, createdAt: new Date().toISOString(), ...parsed.value };
          db.coupons.push(c);
          return { status: 200, coupon: c };
        }
        const c = db.coupons.find((x) => x.id === req.body.id);
        if (!c) return { status: 404, error: "Coupon not found" };
        Object.assign(c, parsed.value);
        if (req.body.resetUses) c.uses = 0;
        return { status: 200, coupon: c };
      });
      return res.status(result.status).json(result.error ? { error: result.error } : result.coupon);
    }

    if (req.method === "PATCH") {
      const c = await updateDb((db) => {
        const x = db.coupons.find((y) => y.id === req.body?.id);
        if (x) x.active = !!req.body.active;
        return x;
      });
      return c ? res.status(200).json(c) : res.status(404).json({ error: "Coupon not found" });
    }

    if (req.method === "DELETE") {
      await updateDb((db) => { db.coupons = db.coupons.filter((c) => c.id !== req.query.id); });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("Coupons API error:", e);
    res.status(500).json({ error: errorMessage(e) });
  }
}
