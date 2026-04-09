import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const products = [
  {
    id: "research-guide",
    name: "Student Research Programme Guide",
    category: "Research Skills",
    badge: "Bestseller",
    tagline: "Your complete roadmap to academic research excellence",
    description:
      "Step-by-step guide covering methodology, literature review, data analysis, citations, and academic writing. From high school to PhD.",
    price: 1,
    pages: "40+",
    topicsCount: 12,
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #D42626 100%)",
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: "research-topics",
    name: "Student Research Topics",
    category: "Research Topics",
    badge: "Most Popular",
    tagline: "100+ handpicked topics across every academic domain",
    description:
      "Curated, trending, and publishable research topics across CS, Medical, Business, Environment, Social Sciences, Engineering and more.",
    price: 1,
    pages: "30+",
    topicsCount: 100,
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #8B1A1A 100%)",
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
];

const features = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    title: "Instant Delivery",
    desc: "PDF sent to your inbox within seconds of payment — no waiting.",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Razorpay Secured",
    desc: "All transactions protected by India's most trusted payment gateway.",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    title: "Expert-Curated",
    desc: "Crafted by experienced researchers and academics for real impact.",
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "All Levels",
    desc: "High school to PhD — structured for every academic stage.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>OneGrasp — Student Research Marketplace</title>
        <meta name="description" content="Premium digital research resources for students, researchers, and academics. Instant PDF delivery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section style={s.hero}>
          {/* YouTube video background — autoplay, muted, looping */}
          <div style={s.videoBg}>
            <iframe
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&loop=1&playlist=LXb3EKWsInQ&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&playsinline=1"
              style={s.videoIframe}
              allow="autoplay; encrypted-media"
              title="Hero background video"
              frameBorder="0"
            />
          </div>
          <div style={s.videoOverlay} />

          <div style={s.heroInner}>
            <span style={s.heroPill}>🎓 Academic Marketplace · Hyderabad, India</span>
            <h1 className="og-hero-title">
              Your Shortcut to{" "}
              <span style={s.heroAccent}>Academic Excellence</span>
            </h1>
            <p style={s.heroSub}>
              Premium digital resources for students, researchers, PhD scholars, and academics at every level. Instant delivery. Expert-curated. Priced for students.
            </p>
            <div className="og-hero-btns">
              <a href="#products" className="og-hero-btn-primary" style={s.heroBtnPrimary}>Explore Products</a>
              <a href="mailto:support@onegrasp.com" style={s.heroBtnOutline}>Contact Us</a>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={s.statsSection}>
          <div style={s.statsWrap}>
            <div className="og-stats-grid" style={s.statsBorder}>
              {[
                { value: "500+", label: "Students Served" },
                { value: "2", label: "Premium Products" },
                { value: "₹1", label: "Starting Price" },
                { value: "100%", label: "Digital Delivery" },
              ].map((st) => (
                <div key={st.label} style={s.statItem}>
                  <div style={s.statValue}>{st.value}</div>
                  <div style={s.statLabel}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        <section id="products" style={s.section}>
          <div style={s.sectionInner}>
            <div style={s.sectionHeader}>
              <span style={s.pill}>Our Products</span>
              <h2 style={s.sectionTitle}>Digital Resources for Every Student</h2>
              <p style={s.sectionSub}>Carefully crafted PDFs to help you research better, write stronger, and achieve more.</p>
            </div>

            <div className="og-products-grid">
              {products.map((p) => (
                <div key={p.id} style={s.productCard}>
                  {/* Banner */}
                  <div style={{ ...s.cardBanner, background: p.gradient }}>
                    <div>{p.icon}</div>
                    <span style={s.cardBadge}>{p.badge}</span>
                  </div>

                  {/* Body */}
                  <div style={s.cardBody}>
                    <span style={s.cardCategory}>{p.category}</span>
                    <h3 style={s.cardName}>{p.name}</h3>
                    <p style={s.cardTagline}>{p.tagline}</p>
                    <p style={s.cardDesc}>{p.description}</p>

                    <div style={s.cardMeta}>
                      <span style={s.metaChip}>📄 {p.pages} pages</span>
                      <span style={s.metaChip}>✅ {p.topicsCount}+ {p.id === "research-guide" ? "sections" : "topics"}</span>
                      <span style={s.metaChip}>⚡ Instant PDF</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={s.cardFooter}>
                    <div style={s.priceWrap}>
                      <span style={s.priceOnly}>Only</span>
                      <span style={s.priceVal}>₹{p.price}</span>
                    </div>
                    <Link href={`/products/${p.id}`} className="og-view-btn" style={s.viewBtn}>
                      View Product
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section style={s.featuresSection}>
          <div style={s.sectionInner}>
            <div style={s.sectionHeader}>
              <span style={s.pill}>Why OneGrasp</span>
              <h2 style={s.sectionTitle}>Built for Students, by Researchers</h2>
            </div>
            <div className="og-features-grid">
              {features.map((f) => (
                <div key={f.title} style={s.featureCard}>
                  <div style={s.featureIconWrap}>{f.icon}</div>
                  <h3 style={s.featureTitle}>{f.title}</h3>
                  <p style={s.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={s.ctaBanner}>
          <div style={s.ctaInner}>
            <h2 style={s.ctaTitle}>Ready to Level Up Your Research?</h2>
            <p style={s.ctaSub}>Expert-curated academic resources at just ₹1. Instant PDF delivery.</p>
            <a href="#products" className="og-cta-btn" style={s.ctaBtn}>Browse Products</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const s = {
  /* Hero */
  hero: {
    position: "relative",
    padding: "80px 20px 72px",
    textAlign: "center",
    overflow: "hidden",
    minHeight: "520px",
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
    background: "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,41,59,0.82) 50%, rgba(26,26,46,0.90) 100%)",
    zIndex: 1,
  },
  heroInner: { maxWidth: "720px", margin: "0 auto", width: "100%", position: "relative", zIndex: 2 },
  heroPill: {
    display: "inline-block",
    background: "rgba(212,38,38,0.15)",
    color: "#FCA5A5",
    border: "1px solid rgba(212,38,38,0.3)",
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "0.78rem",
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "24px",
    letterSpacing: "0.03em",
  },
  heroAccent: { color: "#D42626" },
  heroSub: {
    fontSize: "0.97rem",
    color: "#94A3B8",
    lineHeight: 1.8,
    fontFamily: "'Poppins', sans-serif",
    margin: "0 auto 36px",
    maxWidth: "580px",
  },
  heroBtnPrimary: {
    display: "inline-block",
    background: "#D42626",
    color: "#FFFFFF",
    padding: "13px 30px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.93rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 8px 24px rgba(212,38,38,0.35)",
    transition: "background 0.2s, transform 0.15s",
  },
  heroBtnOutline: {
    display: "inline-block",
    background: "transparent",
    color: "#94A3B8",
    padding: "13px 30px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.93rem",
    fontFamily: "'Poppins', sans-serif",
    border: "1.5px solid #334155",
  },

  /* Stats */
  statsSection: { background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" },
  statsWrap: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px" },
  statsBorder: { borderLeft: "1px solid #E2E8F0" },
  statItem: {
    padding: "24px 16px",
    textAlign: "center",
    borderRight: "1px solid #E2E8F0",
  },
  statValue: {
    fontSize: "1.7rem",
    fontWeight: 800,
    color: "#D42626",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    marginTop: "4px",
  },

  /* Sections */
  section: { padding: "72px 20px", background: "#F8F9FA", overflow: "hidden" },
  featuresSection: { padding: "72px 20px", background: "#FFFFFF", overflow: "hidden" },
  sectionInner: { maxWidth: "1200px", margin: "0 auto", width: "100%" },
  sectionHeader: { textAlign: "center", marginBottom: "48px" },
  pill: {
    display: "inline-block",
    background: "#FEF2F2",
    color: "#D42626",
    border: "1px solid #FECACA",
    padding: "4px 14px",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "14px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: "12px",
  },
  sectionSub: {
    fontSize: "0.92rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: 1.7,
  },

  /* Product Card */
  productCard: {
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cardBanner: {
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(255,255,255,0.2)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "3px 10px",
    borderRadius: "100px",
    fontSize: "0.68rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(6px)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  cardBody: { padding: "20px", flex: 1 },
  cardCategory: {
    display: "inline-block",
    background: "#FEF2F2",
    color: "#D42626",
    padding: "2px 10px",
    borderRadius: "100px",
    fontSize: "0.68rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  cardName: {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "6px",
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
  },
  cardTagline: {
    fontSize: "0.78rem",
    color: "#D42626",
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "8px",
  },
  cardDesc: {
    fontSize: "0.83rem",
    color: "#475569",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.65,
    marginBottom: "14px",
  },
  cardMeta: { display: "flex", gap: "8px", flexWrap: "wrap" },
  metaChip: {
    background: "#F1F5F9",
    color: "#64748B",
    padding: "3px 10px",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderTop: "1px solid #F1F5F9",
    background: "#FAFAFA",
    gap: "12px",
  },
  priceWrap: { display: "flex", alignItems: "baseline", gap: "4px" },
  priceOnly: {
    fontSize: "0.72rem",
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
  priceVal: {
    fontSize: "1.7rem",
    fontWeight: 900,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.04em",
  },
  viewBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#D42626",
    color: "#FFFFFF",
    padding: "10px 18px",
    borderRadius: "9px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.83rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 4px 12px rgba(212,38,38,0.25)",
    whiteSpace: "nowrap",
    transition: "background 0.2s, transform 0.15s",
  },

  /* Features */
  featureCard: {
    background: "#F8F9FA",
    border: "1px solid #E2E8F0",
    borderRadius: "14px",
    padding: "24px 20px",
  },
  featureIconWrap: {
    width: "48px",
    height: "48px",
    background: "#FEF2F2",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
  },
  featureTitle: {
    fontSize: "0.93rem",
    fontWeight: 700,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "6px",
  },
  featureDesc: {
    fontSize: "0.82rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.7,
  },

  /* CTA */
  ctaBanner: {
    background: "linear-gradient(135deg, #D42626 0%, #B91C1C 100%)",
    padding: "72px 20px",
    textAlign: "center",
    overflow: "hidden",
  },
  ctaInner: { maxWidth: "580px", margin: "0 auto" },
  ctaTitle: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: "12px",
  },
  ctaSub: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "28px",
    lineHeight: 1.6,
  },
  ctaBtn: {
    display: "inline-block",
    background: "#FFFFFF",
    color: "#D42626",
    padding: "13px 34px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.93rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
};
