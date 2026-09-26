import { ADMIN_COOKIE, ADMIN_PASSWORD, safeEqual, setCookie, signToken, sleep } from "../../../lib/auth";

const SESSION_HOURS = 12;

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    setCookie(res, ADMIN_COOKIE, "", 0);
    return res.status(200).json({ ok: true });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!safeEqual(req.body?.password || "", ADMIN_PASSWORD)) {
    await sleep(800);
    return res.status(401).json({ error: "Incorrect password" });
  }

  try {
    const token = signToken({ role: "admin", exp: Date.now() + SESSION_HOURS * 3600 * 1000 });
    setCookie(res, ADMIN_COOKIE, token, SESSION_HOURS * 3600);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Admin login error:", e);
    res.status(500).json({ error: "Login failed on the server. Please try again." });
  }
}
