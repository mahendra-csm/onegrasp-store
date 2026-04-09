import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PRODUCTS_DATA = {
  "research-guide": {
    name: "Student Research Programme Guide",
    category: "Research Skills",
    badge: "Bestseller",
    tagline: "Your complete roadmap to academic research excellence",
    description:
      "A comprehensive, step-by-step guide designed for students at every level — from high school to PhD. Master research methodology, academic writing, and citation practices used by top researchers worldwide.",
    price: 1,
    pages: "40+",
    topicsCount: 12,
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #D42626 100%)",
    whatInside: [
      { title: "Introduction to Academic Research", desc: "Understand what research is, types of research, and how to approach it systematically." },
      { title: "Choosing the Right Research Topic", desc: "Framework for selecting a focused, relevant, and feasible research topic." },
      { title: "Literature Review Process", desc: "Step-by-step guide to reviewing existing literature, identifying gaps, and building your argument." },
      { title: "Research Methodology", desc: "Qualitative, quantitative, and mixed methods approaches explained with real examples." },
      { title: "Data Collection & Analysis", desc: "Primary and secondary data collection techniques, surveys, interviews, and analysis methods." },
      { title: "Academic Writing & Structure", desc: "How to structure your research paper, write effectively, and present findings clearly." },
      { title: "Citation Formats", desc: "APA, MLA, IEEE, Chicago — all major citation styles explained with examples." },
      { title: "Plagiarism, Ethics & Integrity", desc: "Academic integrity guidelines, how to avoid plagiarism, and ethical research practices." },
    ],
    whoFor: ["High School Students", "Undergraduate Students", "Postgraduate Students", "PhD Scholars", "Independent Researchers", "Academic Professionals"],
    highlights: ["Step-by-step methodology", "Real-world examples included", "All major citation formats", "Beginner to advanced level", "Instant PDF download"],
  },
  "research-topics": {
    name: "Student Research Topics",
    category: "Research Topics",
    badge: "Most Popular",
    tagline: "100+ handpicked research topics across every academic domain",
    description:
      "Stop wasting time searching for research topics. Get a curated collection of trending, relevant, and publishable research topics across all major academic fields — with scope descriptions to help you start instantly.",
    price: 1,
    pages: "30+",
    topicsCount: 100,
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #8B1A1A 100%)",
    whatInside: [
      { title: "Computer Science & Artificial Intelligence", desc: "Machine learning, deep learning, NLP, cybersecurity, cloud computing, and emerging tech topics." },
      { title: "Medical & Health Sciences", desc: "Clinical research, public health, biotechnology, mental health, and medical innovation topics." },
      { title: "Environmental Science", desc: "Climate change, sustainability, ecology, pollution control, and green technology topics." },
      { title: "Business & Management", desc: "Entrepreneurship, fintech, supply chain, consumer behaviour, and organisational studies." },
      { title: "Social Sciences & Psychology", desc: "Human behaviour, social media impact, cultural studies, education psychology research areas." },
      { title: "Engineering & Technology", desc: "IoT, robotics, renewable energy, smart systems, and infrastructure research topics." },
      { title: "Humanities & Arts", desc: "Literature, history, linguistics, cultural heritage, and philosophy research topics." },
      { title: "Education & EdTech", desc: "Online learning, pedagogy innovations, curriculum design, and student performance topics." },
    ],
    whoFor: ["High School Students", "Undergraduate Students", "Postgraduate Students", "PhD Scholars", "Research Assistants", "Academic Writers"],
    highlights: ["100+ curated topics", "8 major academic domains", "Scope & feasibility notes", "Trending & publishable", "Updated for 2025–26"],
  },
};

const OTHER = {
  "research-guide": "research-topics",
  "research-topics": "research-guide",
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = id ? PRODUCTS_DATA[id] : null;
  const otherId = id ? OTHER[id] : null;
  const otherProduct = otherId ? PRODUCTS_DATA[otherId] : null;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  async function handleBuy() {
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setLoading(true);

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "OneGrasp",
        description: product.name,
        order_id: orderData.orderId,
        prefill: { email },
        theme: { color: "#D42626" },
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId: id,
                email,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || "Verification failed");

            localStorage.setItem("og_success_email", email);
            router.push("/success");
          } catch (err) {
            alert("Payment done but email delivery failed. Please contact support@onegrasp.com");
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", color: "#64748B" }}>Loading…</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} — OneGrasp</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph for shareable link preview */}
        <meta property="og:title" content={`${product.name} — OneGrasp`} />
        <meta property="og:description" content={product.tagline} />
        <meta property="og:type" content="product" />
      </Head>

      <Navbar />

      <main style={s.main}>
        {/* ── Breadcrumb ── */}
        <div style={s.breadcrumbBar}>
          <div style={s.breadcrumbInner}>
            <Link href="/" style={s.breadLink}>Home</Link>
            <span style={s.breadSep}>/</span>
            <Link href="/#products" style={s.breadLink}>Products</Link>
            <span style={s.breadSep}>/</span>
            <span style={s.breadCurrent}>{product.name}</span>
          </div>
        </div>

        <div style={s.pageInner}>
          {/* ── LEFT: Product Info ── */}
          <div style={s.leftCol}>
            {/* Product Hero Card */}
            <div style={s.heroCard}>
              <div style={{ ...s.heroBanner, background: product.gradient }}>
                <span style={s.heroBadge}>{product.badge}</span>
                <div style={s.heroBannerCenter}>
                  <span style={s.heroCategoryTag}>{product.category}</span>
                  <h1 style={s.heroName}>{product.name}</h1>
                  <p style={s.heroTagline}>{product.tagline}</p>
                </div>
              </div>
              <div style={s.heroCardBody}>
                <p style={s.heroDesc}>{product.description}</p>
                <div style={s.metaRow}>
                  <div style={s.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                    </svg>
                    <div>
                      <div style={s.metaVal}>{product.pages}</div>
                      <div style={s.metaLbl}>Pages</div>
                    </div>
                  </div>
                  <div style={s.metaDivider} />
                  <div style={s.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <div>
                      <div style={s.metaVal}>{product.topicsCount}+</div>
                      <div style={s.metaLbl}>{id === "research-guide" ? "Sections" : "Topics"}</div>
                    </div>
                  </div>
                  <div style={s.metaDivider} />
                  <div style={s.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <div>
                      <div style={s.metaVal}>PDF</div>
                      <div style={s.metaLbl}>Format</div>
                    </div>
                  </div>
                  <div style={s.metaDivider} />
                  <div style={s.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <div>
                      <div style={s.metaVal}>Instant</div>
                      <div style={s.metaLbl}>Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── What's Inside ── */}
            <div style={s.sectionBlock}>
              <h2 style={s.blockTitle}>
                <span style={s.blockTitleAccent}>What's</span> Inside
              </h2>
              <div style={s.insideGrid}>
                {product.whatInside.map((item, i) => (
                  <div key={i} style={s.insideCard}>
                    <div style={s.insideNum}>{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <h3 style={s.insideTitle}>{item.title}</h3>
                      <p style={s.insideDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Who It's For ── */}
            <div style={s.sectionBlock}>
              <h2 style={s.blockTitle}>
                <span style={s.blockTitleAccent}>Who</span> It's For
              </h2>
              <div style={s.whoGrid}>
                {product.whoFor.map((who) => (
                  <div key={who} style={s.whoCard}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M20 21a8 8 0 10-16 0" />
                    </svg>
                    <span style={s.whoLabel}>{who}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Highlights ── */}
            <div style={s.highlightsBox}>
              <h3 style={s.highlightsTitle}>Key Highlights</h3>
              <div style={s.highlightsList}>
                {product.highlights.map((h) => (
                  <div key={h} style={s.highlightItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={s.highlightText}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Buy Card ── */}
          <div style={s.rightCol}>
            <div style={s.buyCard}>
              <div style={s.buyCardTop}>
                <div style={s.priceRow}>
                  <span style={s.priceOnly}>Only</span>
                  <span style={s.priceAmount}>₹{product.price}</span>
                </div>
                <p style={s.priceNote}>One-time payment · Instant PDF delivery</p>
              </div>

              <div style={s.buyCardBody}>
                <label style={s.emailLabel}>Your Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  style={s.emailInput}
                />
                {emailError && <p style={s.emailError}>{emailError}</p>}
                <p style={s.emailHint}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  PDF will be sent to this email after payment
                </p>

                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="buy-btn"
                  style={{ ...s.buyBtn, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? (
                    "Processing…"
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Buy Now · ₹{product.price}
                    </>
                  )}
                </button>

                <div style={s.trustRow}>
                  <span style={s.trustItem}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Secure Payment
                  </span>
                  <span style={s.trustItem}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Instant Delivery
                  </span>
                  <span style={s.trustItem}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Razorpay Protected
                  </span>
                </div>
              </div>

              <div style={s.buyCardSupport}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Need help?{" "}
                <a href="mailto:support@onegrasp.com" style={s.supportLink}>support@onegrasp.com</a>
                {" "}or{" "}
                <a href="tel:+918977760441" style={s.supportLink}>+91 89777 60441</a>
              </div>
            </div>

            {/* ── Also Available ── */}
            {otherProduct && (
              <div style={s.alsoCard}>
                <p style={s.alsoLabel}>Also Available</p>
                <p style={s.alsoName}>{otherProduct.name}</p>
                <Link href={`/products/${otherId}`} style={s.alsoBtn}>
                  View Product →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const s = {
  main: {
    background: "#F8F9FA",
    minHeight: "100vh",
  },
  breadcrumbBar: {
    background: "#FFFFFF",
    borderBottom: "1px solid #E2E8F0",
    padding: "0 24px",
  },
  breadcrumbInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 0",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.82rem",
  },
  breadLink: {
    color: "#64748B",
    textDecoration: "none",
    fontWeight: 500,
  },
  breadSep: { color: "#CBD5E1" },
  breadCurrent: {
    color: "#0F172A",
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "200px",
  },

  pageInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px 80px",
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "40px",
    alignItems: "start",
  },

  /* ── Left Col ── */
  leftCol: { display: "flex", flexDirection: "column", gap: "32px" },

  heroCard: {
    background: "#FFFFFF",
    borderRadius: "20px",
    border: "1px solid #E2E8F0",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  },
  heroBanner: {
    height: "220px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px",
  },
  heroBadge: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(255,255,255,0.2)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "4px 14px",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(6px)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  heroBannerCenter: { textAlign: "center" },
  heroCategoryTag: {
    display: "inline-block",
    background: "rgba(255,255,255,0.18)",
    color: "rgba(255,255,255,0.9)",
    padding: "3px 12px",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    border: "1px solid rgba(255,255,255,0.25)",
  },
  heroName: {
    fontSize: "1.6rem",
    fontWeight: 800,
    color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: "8px",
    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  heroTagline: {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
  heroCardBody: { padding: "28px" },
  heroDesc: {
    fontSize: "0.93rem",
    color: "#475569",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.75,
    marginBottom: "24px",
  },
  metaRow: {
    display: "flex",
    gap: "0",
    background: "#F8F9FA",
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
    overflow: "hidden",
  },
  metaItem: {
    flex: 1,
    padding: "16px 12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  metaDivider: { width: "1px", background: "#E2E8F0", flexShrink: 0 },
  metaVal: {
    fontSize: "1rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.2,
  },
  metaLbl: {
    fontSize: "0.72rem",
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },

  sectionBlock: {
    background: "#FFFFFF",
    borderRadius: "20px",
    border: "1px solid #E2E8F0",
    padding: "32px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  blockTitle: {
    fontSize: "1.3rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.02em",
    marginBottom: "24px",
  },
  blockTitleAccent: { color: "#D42626" },

  insideGrid: { display: "flex", flexDirection: "column", gap: "16px" },
  insideCard: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    padding: "16px",
    background: "#F8F9FA",
    borderRadius: "12px",
    border: "1px solid #F1F5F9",
  },
  insideNum: {
    fontSize: "1.1rem",
    fontWeight: 800,
    color: "#D42626",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.02em",
    flexShrink: 0,
    minWidth: "32px",
    opacity: 0.5,
  },
  insideTitle: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "4px",
  },
  insideDesc: {
    fontSize: "0.83rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.6,
  },

  whoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  whoCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: "10px",
    padding: "12px 16px",
  },
  whoLabel: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
  },

  highlightsBox: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    borderRadius: "20px",
    padding: "32px",
  },
  highlightsTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#F1F5F9",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "20px",
    letterSpacing: "-0.01em",
  },
  highlightsList: { display: "flex", flexDirection: "column", gap: "12px" },
  highlightItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  highlightText: {
    fontSize: "0.88rem",
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },

  /* ── Right Col ── */
  rightCol: { display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "88px" },

  buyCard: {
    background: "#FFFFFF",
    borderRadius: "20px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  buyCardTop: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    padding: "28px 28px 24px",
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    marginBottom: "4px",
  },
  priceOnly: {
    fontSize: "0.85rem",
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
  priceAmount: {
    fontSize: "3rem",
    fontWeight: 900,
    color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.05em",
    lineHeight: 1,
  },
  priceNote: {
    fontSize: "0.78rem",
    color: "#475569",
    fontFamily: "'Poppins', sans-serif",
  },
  buyCardBody: { padding: "24px 28px" },
  emailLabel: {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: 700,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "8px",
  },
  emailInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #E2E8F0",
    fontSize: "0.9rem",
    fontFamily: "'Poppins', sans-serif",
    color: "#0F172A",
    background: "#F8F9FA",
    boxSizing: "border-box",
    marginBottom: "6px",
  },
  emailError: {
    color: "#D42626",
    fontSize: "0.78rem",
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "8px",
  },
  emailHint: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.75rem",
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "20px",
  },
  buyBtn: {
    width: "100%",
    background: "#D42626",
    color: "#FFFFFF",
    border: "none",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 6px 20px rgba(212,38,38,0.35)",
    marginBottom: "16px",
    letterSpacing: "0.01em",
    transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
  },
  trustRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.78rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
  buyCardSupport: {
    padding: "16px 28px",
    background: "#F8F9FA",
    borderTop: "1px solid #F1F5F9",
    fontSize: "0.78rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  supportLink: {
    color: "#D42626",
    textDecoration: "none",
    fontWeight: 600,
  },

  alsoCard: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "14px",
    padding: "20px",
  },
  alsoLabel: {
    fontSize: "0.72rem",
    color: "#94A3B8",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "6px",
  },
  alsoName: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "12px",
    lineHeight: 1.4,
  },
  alsoBtn: {
    display: "inline-flex",
    alignItems: "center",
    color: "#D42626",
    textDecoration: "none",
    fontSize: "0.82rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
  },
};
