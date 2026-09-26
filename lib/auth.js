import crypto from "crypto";

export const ADMIN_COOKIE = "og_admin";
export const ACCESS_COOKIE = "og_rw";

function secret() {
  const s = process.env.SESSION_SECRET || process.env.BLOB_READ_WRITE_TOKEN;
  if (!s || s.length < 16) throw new Error("Set SESSION_SECRET (or BLOB_READ_WRITE_TOKEN) — at least 16 characters");
  return s;
}

function mac(body) {
  return crypto.createHmac("sha256", secret()).update(body).digest("base64url");
}

export function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${mac(body)}`;
}

export function verifyToken(token) {
  if (typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig || !safeEqual(sig, mac(body))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function setCookie(res, name, value, maxAgeSec) {
  const parts = [`${name}=${value}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAgeSec}`];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  const prev = res.getHeader("Set-Cookie");
  res.setHeader("Set-Cookie", [...(Array.isArray(prev) ? prev : prev ? [prev] : []), parts.join("; ")]);
}

export function isAdmin(req) {
  const p = verifyToken(req.cookies?.[ADMIN_COOKIE]);
  return !!p && p.role === "admin";
}

export function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  res.status(401).json({ error: "Not authorised" });
  return false;
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
