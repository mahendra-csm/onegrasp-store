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

const OTHER = { "research-guide": "research-topics", "research-topics": "research-guide" };

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = id ? PRODUCTS_DATA[id] : null;
  const otherId = id ? OTHER[id] : null;
  const otherProduct = otherId ? PRODUCTS_DATA[otherId] : null;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!email.trim()) { setEmailError("Please enter your email address."); return; }
    if (!validateEmail(email)) { setEmailError("Please enter a valid email address."); return; }
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
            alert("Payment done but email delivery failed. Contact support@onegrasp.com");
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
        <meta property="og:title" content={`${product.name} — OneGrasp`} />
        <meta property="og:description" content={product.tagline} />
        <meta property="og:type" content="product" />
      </Head>

      <Navbar />

      <main style={s.main}>
        {/* ── Video Hero Banner ── */}
        <section style={s.videoHero}>
          <div style={s.videoBg}>
            <iframe
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&loop=1&playlist=LXb3EKWsInQ&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&playsinline=1"
              style={s.videoIframe}
              allow="autoplay; encrypted-media"
              title="Product background video"
              frameBorder="0"
            />
          </div>
          <div style={s.videoOverlay} />
          <div style={{ position: "absolute", inset: 0, background: product.gradient, opacity: 0.6, zIndex: 2 }} />
          <div style={s.videoHeroContent}>
            <span style={s.videoHeroBadge}>{product.badge}</span>
            <h1 style={s.videoHeroTitle}>{product.name}</h1>
            <p style={s.videoHeroTagline}>{product.tagline}</p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div style={s.breadBar}>
          <div style={s.breadInner}>
            <Link href="/" style={s.breadLink}>Home</Link>
            <span style={s.breadSep}>/</span>
            <Link href="/#products" style={s.breadLink}>Products</Link>
            <span style={s.breadSep}>/</span>
            <span style={s.breadCurrent}>{product.name}</span>
          </div>
        </div>

        {/* Two-col layout — stacks on mobile via CSS, buy card first on mobile */}
        <div style={s.pageWrap}>
          <div className="og-page-grid">

            {/* LEFT: product info */}
            <div className="og-left-col">
              {/* Hero card */}
              <div style={s.heroCard}>
                <div style={{ ...s.heroBanner, background: product.gradient }}>
                  <span style={s.heroBadge}>{product.badge}</span>
                  <div style={s.heroBannerBody}>
                    <span style={s.heroCatTag}>{product.category}</span>
                    <h1 style={s.heroName}>{product.name}</h1>
                    <p style={s.heroTagline}>{product.tagline}</p>
                  </div>
                </div>
                <div style={s.heroCardBody}>
                  <p style={s.heroDesc}>{product.description}</p>
                  {/* Meta row */}
                  <div className="og-meta-row">
                    {[
                      { icon: "📄", val: product.pages, lbl: "Pages" },
                      { icon: "✅", val: `${product.topicsCount}+`, lbl: id === "research-guide" ? "Sections" : "Topics" },
                      { icon: "⚡", val: "PDF", lbl: "Format" },
                      { icon: "🚀", val: "Instant", lbl: "Delivery" },
                    ].map((m, i, arr) => (
                      <>
                        <div key={m.lbl} style={s.metaItem}>
                          <span style={s.metaIcon}>{m.icon}</span>
                          <div>
                            <div style={s.metaVal}>{m.val}</div>
                            <div style={s.metaLbl}>{m.lbl}</div>
                          </div>
                        </div>
                        {i < arr.length - 1 && <div key={`div-${i}`} className="og-meta-divider" />}
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's Inside */}
              <div style={s.block}>
                <h2 style={s.blockTitle}><span style={s.red}>What's</span> Inside</h2>
                <div className="og-inside-grid">
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

              {/* Who It's For */}
              <div style={s.block}>
                <h2 style={s.blockTitle}><span style={s.red}>Who</span> It's For</h2>
                <div className="og-who-grid">
                  {product.whoFor.map((who) => (
                    <div key={who} style={s.whoCard}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/>
                      </svg>
                      <span style={s.whoLabel}>{who}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div style={s.highlightsBox}>
                <h3 style={s.highlightsTitle}>Key Highlights</h3>
                <div style={s.highlightsList}>
                  {product.highlights.map((h) => (
                    <div key={h} style={s.highlightItem}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span style={s.highlightText}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: buy card — appears FIRST on mobile via CSS order:-1 */}
            <div className="og-right-col">
              <div style={s.buyCard}>
                {/* Price header */}
                <div style={s.buyTop}>
                  <div style={s.priceRow}>
                    <span style={s.priceOnly}>Only</span>
                    <span style={s.priceAmt}>₹{product.price}</span>
                  </div>
                  <p style={s.priceNote}>One-time · Instant PDF delivery</p>
                </div>

                {/* Form */}
                <div style={s.buyBody}>
                  <label style={s.emailLabel}>Your Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    style={s.emailInput}
                  />
                  {emailError && <p style={s.emailError}>{emailError}</p>}
                  <p style={s.emailHint}>PDF will be sent to this email after payment</p>

                  <button
                    onClick={handleBuy}
                    disabled={loading}
                    className="og-buy-btn"
                  >
                    {loading ? "Processing…" : (
                      <>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        Buy Now · ₹{product.price}
                      </>
                    )}
                  </button>

                  <div style={s.trustList}>
                    {["Secure Razorpay Payment", "Instant PDF Delivery", "No Hidden Charges"].map((t) => (
                      <div key={t} style={s.trustItem}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div style={s.buySupport}>
                  <p style={s.supportText}>
                    Need help?{" "}
                    <a href="mailto:support@onegrasp.com" style={s.supportLink}>support@onegrasp.com</a>
                    {" · "}
                    <a href="tel:+918977760441" style={s.supportLink}>+91 89777 60441</a>
                  </p>
                </div>
              </div>

              {/* Also available */}
              {otherProduct && (
                <div style={s.alsoCard}>
                  <p style={s.alsoLabel}>Also Available</p>
                  <p style={s.alsoName}>{otherProduct.name}</p>
                  <Link href={`/products/${otherId}`} style={s.alsoBtn}>View Product →</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const s = {
  main: { background: "#F8F9FA", minHeight: "100vh", overflow: "hidden" },

  /* Video Hero Banner */
  videoHero: {
    position: "relative",
    height: "300px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videoBg: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  videoIframe: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "177.78vh",
    height: "56.25vw",
    minWidth: "100%",
    minHeight: "100%",
    transform: "translate(-50%, -50%)",
    border: "none",
    pointerEvents: "none",
  },
  videoOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(5, 10, 25, 0.65)",
    zIndex: 1,
  },
  videoHeroContent: {
    position: "relative",
    zIndex: 3,
    textAlign: "center",
    padding: "0 20px",
    maxWidth: "700px",
  },
  videoHeroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "4px 14px",
    borderRadius: "100px",
    fontSize: "0.7rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    backdropFilter: "blur(6px)",
  },
  videoHeroTitle: {
    fontSize: "clamp(1.4rem, 3vw, 2rem)",
    fontWeight: 800,
    color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: "10px",
    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
    lineHeight: 1.2,
  },
  videoHeroTagline: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.82)",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.6,
    textShadow: "0 1px 6px rgba(0,0,0,0.3)",
  },

  /* Breadcrumb */
  breadBar: { background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" },
  breadInner: {
    maxWidth: "1200px", margin: "0 auto", padding: "12px 20px",
    display: "flex", alignItems: "center", gap: "8px",
    fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", flexWrap: "wrap",
  },
  breadLink: { color: "#64748B", textDecoration: "none", fontWeight: 500 },
  breadSep: { color: "#CBD5E1" },
  breadCurrent: { color: "#0F172A", fontWeight: 600, maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },

  pageWrap: { maxWidth: "1200px", margin: "0 auto", padding: "32px 20px 80px", width: "100%" },

  /* Hero card */
  heroCard: {
    background: "#FFFFFF", borderRadius: "18px",
    border: "1px solid #E2E8F0", overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  heroBanner: {
    minHeight: "180px", position: "relative",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "28px 20px", overflow: "hidden",
  },
  heroBadge: {
    position: "absolute", top: "14px", right: "14px",
    background: "rgba(255,255,255,0.2)", color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.3)", padding: "4px 12px",
    borderRadius: "100px", fontSize: "0.68rem", fontWeight: 700,
    fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em",
  },
  heroBannerBody: { textAlign: "center" },
  heroCatTag: {
    display: "inline-block", background: "rgba(255,255,255,0.18)",
    color: "rgba(255,255,255,0.9)", padding: "3px 12px", borderRadius: "100px",
    fontSize: "0.68rem", fontWeight: 700, fontFamily: "'Poppins', sans-serif",
    marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em",
    border: "1px solid rgba(255,255,255,0.25)",
  },
  heroName: {
    fontSize: "1.5rem", fontWeight: 800, color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.03em",
    marginBottom: "8px", textShadow: "0 2px 8px rgba(0,0,0,0.25)",
    lineHeight: 1.25,
  },
  heroTagline: { fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", fontFamily: "'Poppins', sans-serif" },
  heroCardBody: { padding: "24px" },
  heroDesc: {
    fontSize: "0.9rem", color: "#475569", fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.75, marginBottom: "20px",
  },

  /* Meta row */
  metaItem: { flex: 1, padding: "14px 10px", display: "flex", alignItems: "center", gap: "8px" },
  metaIcon: { fontSize: "1.1rem" },
  metaVal: { fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 },
  metaLbl: { fontSize: "0.68rem", color: "#94A3B8", fontFamily: "'Poppins', sans-serif", fontWeight: 500 },

  /* Blocks */
  block: {
    background: "#FFFFFF", borderRadius: "18px", border: "1px solid #E2E8F0",
    padding: "28px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },
  blockTitle: {
    fontSize: "1.2rem", fontWeight: 800, color: "#0F172A",
    fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.02em", marginBottom: "20px",
  },
  red: { color: "#D42626" },

  insideCard: {
    display: "flex", gap: "14px", alignItems: "flex-start",
    padding: "14px", background: "#F8F9FA", borderRadius: "10px", border: "1px solid #F1F5F9",
  },
  insideNum: {
    fontSize: "1rem", fontWeight: 800, color: "#D42626",
    fontFamily: "'Poppins', sans-serif", flexShrink: 0, opacity: 0.45, minWidth: "28px",
  },
  insideTitle: { fontSize: "0.87rem", fontWeight: 700, color: "#0F172A", fontFamily: "'Poppins', sans-serif", marginBottom: "4px" },
  insideDesc: { fontSize: "0.8rem", color: "#64748B", fontFamily: "'Poppins', sans-serif", lineHeight: 1.6 },

  whoCard: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "#FEF2F2", border: "1px solid #FECACA",
    borderRadius: "10px", padding: "10px 14px",
  },
  whoLabel: { fontSize: "0.82rem", fontWeight: 600, color: "#0F172A", fontFamily: "'Poppins', sans-serif" },

  highlightsBox: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    borderRadius: "18px", padding: "28px 24px",
  },
  highlightsTitle: {
    fontSize: "0.95rem", fontWeight: 700, color: "#F1F5F9",
    fontFamily: "'Poppins', sans-serif", marginBottom: "18px",
  },
  highlightsList: { display: "flex", flexDirection: "column", gap: "12px" },
  highlightItem: { display: "flex", alignItems: "center", gap: "10px" },
  highlightText: { fontSize: "0.85rem", color: "#94A3B8", fontFamily: "'Poppins', sans-serif", fontWeight: 500 },

  /* Buy card */
  buyCard: {
    background: "#FFFFFF", borderRadius: "18px",
    border: "1px solid #E2E8F0", boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    overflow: "hidden", marginBottom: "16px",
  },
  buyTop: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    padding: "24px 24px 20px",
  },
  priceRow: { display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" },
  priceOnly: { fontSize: "0.82rem", color: "#94A3B8", fontFamily: "'Poppins', sans-serif", fontWeight: 500 },
  priceAmt: {
    fontSize: "2.8rem", fontWeight: 900, color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.05em", lineHeight: 1,
  },
  priceNote: { fontSize: "0.75rem", color: "#475569", fontFamily: "'Poppins', sans-serif" },

  buyBody: { padding: "22px 24px" },
  emailLabel: {
    display: "block", fontSize: "0.8rem", fontWeight: 700,
    color: "#0F172A", fontFamily: "'Poppins', sans-serif", marginBottom: "8px",
  },
  emailInput: {
    width: "100%", padding: "11px 14px", borderRadius: "9px",
    border: "1.5px solid #E2E8F0", fontSize: "0.88rem",
    fontFamily: "'Poppins', sans-serif", color: "#0F172A",
    background: "#F8F9FA", boxSizing: "border-box", marginBottom: "6px",
  },
  emailError: { color: "#D42626", fontSize: "0.75rem", fontWeight: 600, fontFamily: "'Poppins', sans-serif", marginBottom: "6px" },
  emailHint: { fontSize: "0.72rem", color: "#94A3B8", fontFamily: "'Poppins', sans-serif", marginBottom: "18px" },

  trustList: { display: "flex", flexDirection: "column", gap: "8px" },
  trustItem: {
    display: "flex", alignItems: "center", gap: "7px",
    fontSize: "0.75rem", color: "#64748B", fontFamily: "'Poppins', sans-serif", fontWeight: 500,
  },

  buySupport: {
    padding: "14px 24px", background: "#F8F9FA", borderTop: "1px solid #F1F5F9",
  },
  supportText: { fontSize: "0.75rem", color: "#64748B", fontFamily: "'Poppins', sans-serif", lineHeight: 1.6 },
  supportLink: { color: "#D42626", textDecoration: "none", fontWeight: 600 },

  alsoCard: {
    background: "#FFFFFF", border: "1px solid #E2E8F0",
    borderRadius: "14px", padding: "18px 20px",
  },
  alsoLabel: {
    fontSize: "0.68rem", color: "#94A3B8", fontWeight: 700,
    fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px",
  },
  alsoName: {
    fontSize: "0.85rem", fontWeight: 700, color: "#0F172A",
    fontFamily: "'Poppins', sans-serif", marginBottom: "10px", lineHeight: 1.4,
  },
  alsoBtn: {
    display: "inline-flex", alignItems: "center", color: "#D42626",
    textDecoration: "none", fontSize: "0.8rem", fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
  },
};
