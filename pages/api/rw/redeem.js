import { ACCESS_COOKIE, setCookie, signToken, sleep } from "../../../lib/auth";
import { couponUsable, normalizeCode, updateDb } from "../../../lib/storage";

const ACCESS_HOURS = 12;

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    setCookie(res, ACCESS_COOKIE, "", 0);
    return res.status(200).json({ ok: true });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const code = normalizeCode(req.body?.code);
  if (!code) return res.status(400).json({ error: "Please enter a coupon code." });

  const result = await updateDb((db) => {
    const c = db.coupons.find((x) => x.code === code);
    if (!couponUsable(c)) return { error: "Invalid or expired coupon code." };
    if (c.maxUses != null && c.uses >= c.maxUses) return { error: "This coupon has reached its usage limit." };
    c.uses += 1;
    return { coupon: c };
  });

  if (result.error) {
    await sleep(600);
    return res.status(400).json({ error: result.error });
  }

  const { coupon } = result;
  let exp = Date.now() + ACCESS_HOURS * 3600 * 1000;
  if (coupon.expiresAt) exp = Math.min(exp, Date.parse(coupon.expiresAt));
  setCookie(res, ACCESS_COOKIE, signToken({ cid: coupon.id, exp }), Math.ceil((exp - Date.now()) / 1000));
  res.status(200).json({ ok: true });
}
