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
      "A comprehensive step-by-step guide — from choosing a topic to writing & citing. Covers methodology, literature review, data analysis, and ethics.",
    price: 1,
    pages: "40+",
    topicsCount: 12,
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #D42626 100%)",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="12" y2="15" />
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
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
];

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Instant Digital Delivery",
    desc: "PDF delivered to your inbox within seconds of payment — no waiting, no shipping.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Secure Razorpay Payments",
    desc: "All transactions are protected by Razorpay — India's most trusted payment gateway.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    title: "Expert-Curated Content",
    desc: "Resources crafted by experienced researchers and academics for real academic impact.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "For All Student Levels",
    desc: "From high school to PhD — our resources are structured for every academic stage.",
  },
];

const stats = [
  { value: "500+", label: "Students Served" },
  { value: "2", label: "Premium Products" },
  { value: "₹1", label: "Starting Price" },
  { value: "100%", label: "Digital Delivery" },
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
          <div style={s.heroInner}>
            <span style={s.heroPill}>🎓 Academic Marketplace · Hyderabad, India</span>
            <h1 style={s.heroTitle}>
              Your Shortcut to<br />
              <span style={s.heroAccent}>Academic Excellence</span>
            </h1>
            <p style={s.heroSub}>
              Premium digital resources for students, researchers, PhD scholars, and academics at every level. Instant delivery. Expert-curated. Priced for students.
            </p>
            <div style={s.heroCTAs}>
              <a href="#products" style={s.heroBtnPrimary}>Explore Products</a>
              <a href="mailto:support@onegrasp.com" style={s.heroBtnOutline}>Contact Us</a>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={s.statsBar}>
          <div style={s.statsInner}>
            {stats.map((st) => (
              <div key={st.label} style={s.statItem}>
                <div style={s.statValue}>{st.value}</div>
                <div style={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Products ── */}
        <section id="products" style={s.section}>
          <div style={s.sectionInner}>
            <div style={s.sectionHeader}>
              <span style={s.sectionPill}>Our Products</span>
              <h2 style={s.sectionTitle}>Digital Resources for Every Student</h2>
              <p style={s.sectionSub}>
                Carefully crafted PDFs to help you research better, write stronger, and achieve more.
              </p>
            </div>

            <div className="product-grid" style={s.productsGrid}>
              {products.map((p) => (
                <div key={p.id} style={s.productCard}>
                  {/* Card Banner */}
                  <div style={{ ...s.cardBanner, background: p.gradient }}>
                    <div style={s.cardBannerIcon}>{p.icon}</div>
                    <span style={s.cardBadge}>{p.badge}</span>
                  </div>

                  {/* Card Body */}
                  <div style={s.cardBody}>
                    <span style={s.cardCategory}>{p.category}</span>
                    <h3 style={s.cardName}>{p.name}</h3>
                    <p style={s.cardTagline}>{p.tagline}</p>
                    <p style={s.cardDesc}>{p.description}</p>

                    {/* Meta */}
                    <div style={s.cardMeta}>
                      <span style={s.cardMetaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        {p.pages} pages
                      </span>
                      <span style={s.cardMetaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        {p.topicsCount}+ {p.id === "research-guide" ? "sections" : "topics"}
                      </span>
                      <span style={s.cardMetaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        PDF Format
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div style={s.cardFooter}>
                    <div style={s.cardPrice}>
                      <span style={s.cardPriceLabel}>Only</span>
                      <span style={s.cardPriceValue}>₹{p.price}</span>
                    </div>
                    <Link href={`/products/${p.id}`} style={s.viewBtn}>
                      View Product
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
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
              <span style={s.sectionPill}>Why OneGrasp</span>
              <h2 style={s.sectionTitle}>Built for Students, by Researchers</h2>
            </div>
            <div style={s.featuresGrid}>
              {features.map((f) => (
                <div key={f.title} style={s.featureCard}>
                  <div style={s.featureIcon}>{f.icon}</div>
                  <h3 style={s.featureTitle}>{f.title}</h3>
                  <p style={s.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={s.ctaBanner}>
          <div style={s.ctaInner}>
            <h2 style={s.ctaTitle}>Ready to Level Up Your Research?</h2>
            <p style={s.ctaSub}>Get instant access to expert-curated academic resources at just ₹1.</p>
            <a href="#products" style={s.ctaBtn}>Browse Products</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const s = {
  /* ── Hero ── */
  hero: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1a1a2e 100%)",
    padding: "100px 24px 80px",
    textAlign: "center",
  },
  heroInner: {
    maxWidth: "760px",
    margin: "0 auto",
  },
  heroPill: {
    display: "inline-block",
    background: "rgba(212,38,38,0.15)",
    color: "#FCA5A5",
    border: "1px solid rgba(212,38,38,0.3)",
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "0.8rem",
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "28px",
    letterSpacing: "0.03em",
  },
  heroTitle: {
    fontSize: "3.2rem",
    fontWeight: 800,
    color: "#F8FAFC",
    lineHeight: 1.15,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "24px",
    letterSpacing: "-0.03em",
  },
  heroAccent: {
    color: "#D42626",
  },
  heroSub: {
    fontSize: "1.05rem",
    color: "#94A3B8",
    lineHeight: 1.8,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "40px",
    maxWidth: "600px",
    margin: "0 auto 40px",
  },
  heroCTAs: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  heroBtnPrimary: {
    display: "inline-block",
    background: "#D42626",
    color: "#FFFFFF",
    padding: "14px 32px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.95rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 8px 24px rgba(212,38,38,0.35)",
    letterSpacing: "0.01em",
  },
  heroBtnOutline: {
    display: "inline-block",
    background: "transparent",
    color: "#94A3B8",
    padding: "14px 32px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    fontFamily: "'Poppins', sans-serif",
    border: "1.5px solid #334155",
    letterSpacing: "0.01em",
  },

  /* ── Stats Bar ── */
  statsBar: {
    background: "#FFFFFF",
    borderBottom: "1px solid #E2E8F0",
    padding: "0",
  },
  statsInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    borderLeft: "1px solid #E2E8F0",
  },
  statItem: {
    padding: "28px 24px",
    textAlign: "center",
    borderRight: "1px solid #E2E8F0",
  },
  statValue: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#D42626",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    marginTop: "4px",
  },

  /* ── Sections ── */
  section: {
    padding: "80px 24px",
    background: "#F8F9FA",
  },
  featuresSection: {
    padding: "80px 24px",
    background: "#FFFFFF",
  },
  sectionInner: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "56px",
  },
  sectionPill: {
    display: "inline-block",
    background: "#FEF2F2",
    color: "#D42626",
    border: "1px solid #FECACA",
    padding: "5px 14px",
    borderRadius: "100px",
    fontSize: "0.78rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "16px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: "14px",
  },
  sectionSub: {
    fontSize: "0.97rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "540px",
    margin: "0 auto",
    lineHeight: 1.7,
  },

  /* ── Products Grid ── */
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "32px",
    justifyContent: "center",
  },
  productCard: {
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardBanner: {
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardBannerIcon: {
    opacity: 0.9,
  },
  cardBadge: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "rgba(255,255,255,0.2)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "4px 12px",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(6px)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  cardBody: {
    padding: "24px",
    flex: 1,
  },
  cardCategory: {
    display: "inline-block",
    background: "#FEF2F2",
    color: "#D42626",
    padding: "3px 10px",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  cardName: {
    fontSize: "1.15rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
  },
  cardTagline: {
    fontSize: "0.82rem",
    color: "#D42626",
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "10px",
  },
  cardDesc: {
    fontSize: "0.87rem",
    color: "#475569",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.65,
    marginBottom: "16px",
  },
  cardMeta: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  cardMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.78rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderTop: "1px solid #F1F5F9",
    background: "#FAFAFA",
  },
  cardPrice: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
  },
  cardPriceLabel: {
    fontSize: "0.75rem",
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
  cardPriceValue: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.04em",
  },
  viewBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#D42626",
    color: "#FFFFFF",
    padding: "12px 22px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.88rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 4px 14px rgba(212,38,38,0.25)",
    letterSpacing: "0.01em",
  },

  /* ── Features ── */
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "28px",
  },
  featureCard: {
    background: "#F8F9FA",
    border: "1px solid #E2E8F0",
    borderRadius: "14px",
    padding: "28px 24px",
  },
  featureIcon: {
    width: "52px",
    height: "52px",
    background: "#FEF2F2",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  featureTitle: {
    fontSize: "0.97rem",
    fontWeight: 700,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "8px",
  },
  featureDesc: {
    fontSize: "0.85rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.7,
  },

  /* ── CTA Banner ── */
  ctaBanner: {
    background: "linear-gradient(135deg, #D42626 0%, #B91C1C 100%)",
    padding: "80px 24px",
    textAlign: "center",
  },
  ctaInner: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: "14px",
  },
  ctaSub: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "32px",
    lineHeight: 1.6,
  },
  ctaBtn: {
    display: "inline-block",
    background: "#FFFFFF",
    color: "#D42626",
    padding: "14px 36px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.95rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    letterSpacing: "0.01em",
  },
};
