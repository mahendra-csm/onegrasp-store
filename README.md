# OneGrasp Store

Digital product store built with Next.js + Razorpay + Hostinger SMTP.

---

## Setup Instructions

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Add your PDFs
Place your 2 PDF files inside `public/pdfs/`:
```
public/
  pdfs/
    research-guide.pdf       ← Student Research Programme Guide
    research-topics.pdf      ← Student Research Topics
```

### Step 3 — Configure environment variables
Edit `.env.local` and fill in your actual values:
```
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX

SMTP_HOST=mail.hostinger.com
SMTP_PORT=465
SMTP_USER=support@onegrasp.com
SMTP_PASS=YOUR_EMAIL_PASSWORD
```

### Step 4 — Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Deploy to Vercel

1. Push this project to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. In Vercel dashboard → Settings → Environment Variables → Add all the variables from `.env.local`
4. Deploy ✅

> **Note:** The PDFs in `public/pdfs/` are committed to the repo so Vercel can serve them. Make sure they are added before pushing.

---

## File Structure
```
onegrasp-store/
├── pages/
│   ├── index.js              ← Landing page (2 products)
│   ├── success.js            ← Thank you page
│   └── api/
│       ├── create-order.js   ← Creates Razorpay order
│       └── verify-payment.js ← Verifies payment + sends email
├── lib/
│   └── products.js           ← Product config (name, price, pdf filename)
├── public/
│   └── pdfs/
│       ├── research-guide.pdf     ← ADD YOUR PDF HERE
│       └── research-topics.pdf    ← ADD YOUR PDF HERE
├── styles/
│   └── globals.css
├── .env.local                ← Your secrets (never commit this)
├── .env.example              ← Template for env variables
└── package.json
```

---

## To change prices or product details
Edit `lib/products.js`.

## Support
support@onegrasp.com
