import { handleUpload, handleUploadPresigned } from "@vercel/blob/client";
import { issueSignedToken } from "@vercel/blob";
import { isAdmin } from "../../../lib/auth";
import { blobUploadMode } from "../../../lib/storage";

const MAX_BYTES = 500 * 1024 * 1024;

function checkUpload(req, pathname) {
  if (!isAdmin(req)) throw new Error("Not authorised");
  if (!pathname.startsWith("onegrasp/files/")) throw new Error("Invalid path");
}

// Lets the admin's browser upload large files straight to Vercel Blob.
// Token mode uses BLOB_READ_WRITE_TOKEN; presigned mode uses Vercel OIDC + BLOB_STORE_ID.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const json =
      blobUploadMode() === "token"
        ? await handleUpload({
            body: req.body,
            request: req,
            onBeforeGenerateToken: async (pathname) => {
              checkUpload(req, pathname);
              return { addRandomSuffix: true, maximumSizeInBytes: MAX_BYTES };
            },
            onUploadCompleted: async () => {},
          })
        : await handleUploadPresigned({
            body: req.body,
            request: req,
            getSignedToken: async (pathname) => {
              checkUpload(req, pathname);
              const validUntil = Date.now() + 60 * 60 * 1000;
              const token = await issueSignedToken({ pathname, operations: ["put"], validUntil, maximumSizeInBytes: MAX_BYTES });
              return { token, urlOptions: { validUntil, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true } };
            },
          });
    res.status(200).json(json);
  } catch (e) {
    console.error("Blob upload error:", e);
    res.status(400).json({ error: e.message });
  }
}
