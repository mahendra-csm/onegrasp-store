const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require("path");
const PRODUCTS = require("../../lib/products");

// Must disable body parser to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Step 1: Read raw body (needed for signature verification)
    const rawBody = await getRawBody(req);

    // Step 2: Verify Razorpay webhook signature
    const receivedSignature = req.headers["x-razorpay-signature"];
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (receivedSignature !== expectedSignature) {
      console.error("Webhook signature mismatch — rejecting request");
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Step 3: Parse event
    const event = JSON.parse(rawBody.toString());
    console.log("Webhook event received:", event.event);

    // Step 4: Only handle payment.captured
    if (event.event !== "payment.captured") {
      return res.status(200).json({ status: "ignored" });
    }

    const payment = event.payload.payment.entity;
    const email = payment.email;
    const productId = payment.notes?.productId;
    const paymentId = payment.id;

    console.log(`Payment captured: ${paymentId} | Product: ${productId} | Email: ${email}`);

    if (!email || !productId) {
      console.error("Missing email or productId in webhook payload", { email, productId });
      return res.status(400).json({ error: "Missing email or productId" });
    }

    // Step 5: Get product info
    const product = PRODUCTS[productId];
    if (!product) {
      console.error("Unknown productId in webhook:", productId);
      return res.status(400).json({ error: "Unknown product" });
    }

    // Step 6: Setup Nodemailer (Hostinger SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Step 7: Build PDF path
    const pdfPath = path.join(process.cwd(), "public", "pdfs", product.pdf);

    // Step 8: Send email with PDF attachment
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
            <p style="color:#94A3B8;font-size:0.8rem;margin:32px 0 0;">
              Payment ID: ${paymentId}
            </p>
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

    console.log(`PDF email sent to ${email} for product ${productId}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
