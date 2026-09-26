import { ACCESS_COOKIE, verifyToken } from "./auth";
import { couponUsable, loadDb } from "./storage";

// Resolves the visitor's coupon from their access cookie; re-checked on every request so
// disabling or deleting a coupon in the admin panel revokes access immediately.
export async function getAccess(req) {
  const token = verifyToken(req.cookies?.[ACCESS_COOKIE]);
  if (!token) return null;
  const db = await loadDb();
  const coupon = db.coupons.find((c) => c.id === token.cid);
  if (!couponUsable(coupon)) return null;
  return { db, coupon };
}
