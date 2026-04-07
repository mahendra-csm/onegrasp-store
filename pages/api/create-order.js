const Razorpay = require("razorpay");
const PRODUCTS = require("../../lib/products");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { productId } = req.body;
    const product = PRODUCTS[productId];

    if (!product) {
      return res.status(400).json({ error: "Invalid product" });
    }

    const order = await razorpay.orders.create({
      amount: product.price * 100, // Razorpay needs amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { productId },
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      productName: product.name,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
}
