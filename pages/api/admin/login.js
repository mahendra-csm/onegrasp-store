import { ADMIN_COOKIE, safeEqual, setCookie, signToken, sleep } from "../../../lib/auth";

const SESSION_HOURS = 12;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "OneGrasp@3070";

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

  const token = signToken({ role: "admin", exp: Date.now() + SESSION_HOURS * 3600 * 1000 });
  setCookie(res, ADMIN_COOKIE, token, SESSION_HOURS * 3600);
  res.status(200).json({ ok: true });
}
