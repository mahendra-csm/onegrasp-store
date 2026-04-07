const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require("path");
const PRODUCTS = require("../../lib/products");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      email,
    } = req.body;

    // Step 1: Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    // Step 2: Get product info
    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({ error: "Invalid product" });
    }

    // Step 3: Setup Nodemailer with Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true, // true for port 465 (SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Step 4: Build PDF path
    const pdfPath = path.join(process.cwd(), "public", "pdfs", product.pdf);

    // Step 5: Send email with PDF attachment
    await transporter.sendMail({
      from: `"OneGrasp" <support@onegrasp.com>`,
      to: email,
      subject: `Your Purchase: ${product.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #4F46E5;">🎉 Thank you for your purchase!</h2>
          <p style="color: #333; font-size: 16px;">
            Hi, your purchase was successful. Please find your <strong>${product.name}</strong> attached to this email.
          </p>
          <p style="color: #333; font-size: 15px;">
            If you have any questions or issues, please reply to this email and we'll help you out.
          </p>
          <br/>
          <p style="color: #888; font-size: 13px;">— Team OneGrasp<br/>support@onegrasp.com</p>
        </div>
      `,
      attachments: [
        {
          filename: product.pdf,
          path: pdfPath,
        },
      ],
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ error: "Payment verified but email failed. Contact support@onegrasp.com" });
  }
}
