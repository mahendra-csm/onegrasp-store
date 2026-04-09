const nodemailer = require("nodemailer");
const path = require("path");
const PRODUCTS = require("../../lib/products");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, productId } = req.body;

    if (!email || !productId) {
      return res.status(400).json({ error: "Missing email or productId" });
    }

    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({ error: "Invalid product" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const pdfPath = path.join(process.cwd(), "public", "pdfs", product.pdf);

    await transporter.sendMail({
      from: `"OneGrasp" <support@onegrasp.com>`,
      to: email,
      subject: `Your Purchase: ${product.name}`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:#D42626;padding:32px 40px;">
            <span style="font-size:1.6rem;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
              <span style="color:#ffcccc;">One</span>Grasp
            </span>
          </div>
          <div style="padding:40px;">
            <h2 style="color:#0F172A;font-size:1.4rem;font-weight:700;margin:0 0 16px;">
              Thank you for your purchase!
            </h2>
            <p style="color:#475569;font-size:0.95rem;line-height:1.7;margin:0 0 12px;">
              Your <strong style="color:#0F172A;">${product.name}</strong> is attached to this email as a PDF.
            </p>
            <p style="color:#475569;font-size:0.95rem;line-height:1.7;margin:0 0 24px;">
              If you don't see the attachment, check your spam/junk folder.
            </p>
            <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:16px 20px;">
              <p style="color:#64748B;font-size:0.85rem;margin:0;">
                Questions? Reply to this email or write to
                <a href="mailto:support@onegrasp.com" style="color:#D42626;font-weight:600;">support@onegrasp.com</a>
              </p>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: product.pdf,
          path: pdfPath,
        },
      ],
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Send PDF error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
