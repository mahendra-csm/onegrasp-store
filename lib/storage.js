import crypto from "crypto";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { Readable } from "stream";
import { put, get, del, issueSignedToken, presignUrl, BlobNotFoundError } from "@vercel/blob";

// Vercel Blob when connected — either a read-write token, or a store ID with Vercel's OIDC login
// (newer stores). Otherwise a local ./data folder (dev / self-hosted). Vercel's filesystem is
// read-only, so without Blob nothing can be saved there ("none").
export function storageMode() {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return "blob";
  return process.env.VERCEL ? "none" : "local";
}

export const blobUploadMode = () => (process.env.BLOB_READ_WRITE_TOKEN ? "token" : "presigned");

export class StorageNotConfigured extends Error {
  constructor() {
    super("File storage is not connected. In Vercel, open your project → Storage → create a Blob store, connect it to this project, then redeploy.");
    this.expose = true;
  }
}

export const errorMessage = (e) => (e && e.expose ? e.message : "Something went wrong");

const LOCAL_DIR = path.join(process.cwd(), "data");
const LOCAL_FILES = path.join(LOCAL_DIR, "files");
const DB_BLOB = "onegrasp/db.json";
const empty = () => ({ folders: [], files: [], links: [], coupons: [] });

// Only plain web links, so an admin-entered URL can never run script in a student's browser.
export function cleanUrl(raw) {
  try {
    const u = new URL(String(raw || "").trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export const newId = () => crypto.randomBytes(8).toString("hex");

export async function loadDb() {
  if (storageMode() === "none") return empty();
  if (storageMode() === "blob") {
    try {
      const r = await get(DB_BLOB, { access: "private", useCache: false });
      if (!r || !r.stream) return empty();
      return { ...empty(), ...JSON.parse(await new Response(r.stream).text()) };
    } catch (e) {
      if (e instanceof BlobNotFoundError) return empty();
      throw e;
    }
  }
  try {
    return { ...empty(), ...JSON.parse(await fsp.readFile(path.join(LOCAL_DIR, "db.json"), "utf8")) };
  } catch (e) {
    if (e.code === "ENOENT") return empty();
    throw e;
  }
}

export async function saveDb(db) {
  if (storageMode() === "none") throw new StorageNotConfigured();
  const json = JSON.stringify(db, null, 2);
  if (storageMode() === "blob") {
    await put(DB_BLOB, json, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }
  await fsp.mkdir(LOCAL_DIR, { recursive: true });
  const tmp = path.join(LOCAL_DIR, `db.${process.pid}.tmp`);
  await fsp.writeFile(tmp, json);
  await fsp.rename(tmp, path.join(LOCAL_DIR, "db.json"));
}

export async function updateDb(fn) {
  const db = await loadDb();
  const result = await fn(db);
  await saveDb(db);
  return result;
}

export function localFilePath(fileId) {
  if (!/^[a-f0-9]{16}$/.test(fileId)) throw new Error("Bad file id");
  return path.join(LOCAL_FILES, fileId);
}

export async function writeLocalFile(fileId, readable, maxBytes) {
  await fsp.mkdir(LOCAL_FILES, { recursive: true });
  const dest = localFilePath(fileId);
  let size = 0;
  await new Promise((resolve, reject) => {
    const out = fs.createWriteStream(dest);
    readable.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) readable.destroy(new Error("File too large"));
    });
    readable.on("error", (e) => { out.destroy(); reject(e); });
    out.on("error", reject);
    out.on("finish", resolve);
    readable.pipe(out);
  }).catch(async (e) => {
    await fsp.rm(dest, { force: true });
    throw e;
  });
  return size;
}

export async function deleteStoredFiles(files) {
  const blobUrls = files.filter((f) => f.url).map((f) => f.url);
  if (blobUrls.length) await del(blobUrls);
  await Promise.all(files.filter((f) => !f.url).map((f) => fsp.rm(localFilePath(f.id), { force: true })));
}

function contentDisposition(name) {
  const ascii = name.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_");
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`;
}

export async function sendFile(res, file) {
  res.setHeader("Cache-Control", "private, no-store");

  if (file.url) {
    try {
      const validUntil = Date.now() + 5 * 60 * 1000;
      const token = await issueSignedToken({ pathname: file.pathname, operations: ["get"], validUntil });
      const { presignedUrl } = await presignUrl(token, {
        operation: "get",
        pathname: file.pathname,
        access: "private",
        validUntil,
      });
      return res.redirect(302, presignedUrl);
    } catch (e) {
      console.error("Presign failed, streaming instead:", e.message);
    }
    const r = await get(file.url, { access: "private" });
    if (!r || !r.stream) return res.status(404).json({ error: "File not found" });
    res.setHeader("Content-Type", file.contentType || "application/octet-stream");
    res.setHeader("Content-Disposition", contentDisposition(file.name));
    return Readable.fromWeb(r.stream).pipe(res);
  }

  const p = localFilePath(file.id);
  if (!fs.existsSync(p)) return res.status(404).json({ error: "File not found" });
  res.setHeader("Content-Type", file.contentType || "application/octet-stream");
  res.setHeader("Content-Disposition", contentDisposition(file.name));
  res.setHeader("Content-Length", fs.statSync(p).size);
  fs.createReadStream(p).pipe(res);
}

// ── Coupon helpers ──

export const normalizeCode = (c) => String(c || "").trim().toUpperCase();

export function couponUsable(c) {
  if (!c || !c.active) return false;
  if (c.expiresAt && Date.parse(c.expiresAt) < Date.now()) return false;
  return true;
}

export const folderAllowed = (coupon, folderId) =>
  !coupon.folderIds || coupon.folderIds.length === 0 || coupon.folderIds.includes(folderId);
