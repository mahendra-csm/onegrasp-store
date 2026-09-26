import { handleUpload } from "@vercel/blob/client";
import { isAdmin } from "../../../lib/auth";

// Issues short-lived tokens so the admin's browser can upload large files straight to Vercel Blob.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!isAdmin(req)) throw new Error("Not authorised");
        if (!pathname.startsWith("onegrasp/files/")) throw new Error("Invalid path");
        return { addRandomSuffix: true, maximumSizeInBytes: 500 * 1024 * 1024 };
      },
      onUploadCompleted: async () => {},
    });
    res.status(200).json(json);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
