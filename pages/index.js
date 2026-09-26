import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RW_BATCH, RW_TITLE } from "../lib/format";

const RED = "#DB3433";
const icon = (children) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

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
    chips: ["40+ pages", "12+ sections", "Instant PDF"],
    icon: icon(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>),
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
    chips: ["30+ pages", "100+ topics", "Instant PDF"],
    icon: icon(<><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></>),
  },
  {
    id: "research-writing",
    kind: "coupon",
    href: "/research-writing",
    name: `${RW_TITLE} — ${RW_BATCH}`,
    category: "Programme Materials",
    badge: "New Batch",
    tagline: "Batch materials, templates & resources in one place",
    description:
      "Access the complete Research Writing programme folder. Enter the coupon code shared with your batch to unlock and download.",
    chips: ["Folders", "Coupon access", "Download"],
    icon: icon(<><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>),
  },
  {
    id: "digital-product",
    kind: "static",
    name: "Digital Product",
    category: "Creator Economy",
    badge: "Premium",
    tagline: "Build, package and sell your own digital products",
    description:
      "A practical playbook for turning your knowledge into digital products — from idea validation and creation to pricing, launch and selling online.",
    price: 1999,
    chips: ["Practical", "Launch-ready"],
    icon: icon(<><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>),
  },
  {
    id: "financial-literacy",
    kind: "static",
    name: "Financial Literacy",
    category: "Personal Finance",
    badge: "Essential",
    tagline: "Master money basics every student should know",
    description:
      "Budgeting, saving, investing, credit and taxes explained simply — build the money habits and confidence to make smart financial decisions early.",
    price: 599,
    chips: ["Budgeting", "Investing"],
    icon: icon(<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>),
  },
  {
    id: "researcher-to-entrepreneur",
    kind: "static",
    name: "Researcher to Entrepreneur Mastery",
    category: "Entrepreneurship",
    badge: "Masterclass",
    tagline: "Turn your research into a real-world venture",
    description:
      "Learn how to identify commercial potential in your research, validate the market, protect your ideas, and take the first steps to building a startup.",
    price: 799,
    chips: ["Ideation", "Startup"],
    icon: icon(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>),
  },
];

// World Economic Forum, Future of Jobs Report 2025 (2025–2030 outlook).
const jobStats = [
  { value: 92, suffix: "M", label: "jobs will disappear by 2030", arrow: "▼" },
  { value: 170, suffix: "M", label: "new jobs will be created", arrow: "▲" },
  { value: 39, suffix: "%", label: "of core skills will change" },
  { value: 59, suffix: "/100", label: "workers will need new training" },
];

const features = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, title: "Instant Delivery", desc: "Resources delivered within seconds — no waiting." },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Secure Payments", desc: "Protected by Razorpay, India's trusted gateway." },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>, title: "Expert-Curated", desc: "Crafted by experienced researchers and academics." },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "All Levels", desc: "High school to PhD — for every academic stage." },
];

function Counter({ to }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setVal(to); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1600);
      setVal(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{val}</>;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>OneGrasp — Student Research Marketplace</title>
        <meta name="description" content="Premium digital research resources for students, researchers, and academics." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main style={{ background: "#FFFFFF" }}>
        {/* ── Hero ── */}
        <section style={s.hero}>
          <div style={s.heroInner} className="og-hero-anim">
            <h1 className="og-hero-title">
              Your Shortcut to <span style={{ color: RED }}>Academic Excellence</span>
            </h1>
            <p style={s.heroSub}>
              Premium digital resources for students, researchers, PhD scholars, and academics at every level. Instant delivery. Expert-curated. Priced for students.
            </p>
            <div className="og-hero-btns">
              <a href="#products" className="og-hero-btn-primary" style={s.heroBtnPrimary}>Explore Products</a>
              <a href="mailto:support@onegrasp.com" style={s.heroBtnOutline}>Contact Us</a>
            </div>
          </div>

          <p style={s.statsHeading}>The future of work · 2025 → 2030</p>
          <div className="og-hero-stats">
            {jobStats.map((st) => (
              <div key={st.label} style={s.statItem}>
                <div style={s.statValue}>
                  {st.arrow && <span style={s.statArrow}>{st.arrow}</span>}
                  <Counter to={st.value} />{st.suffix}
                </div>
                <div style={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>
          <p style={s.source}>Source: World Economic Forum, Future of Jobs Report 2025</p>
        </section>

        {/* ── Products ── */}
        <section id="products" style={s.section}>
          <div style={s.sectionInner}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Our Products</h2>
              <p style={s.sectionSub}>Resources to help you research better, write stronger, and achieve more.</p>
            </div>

            <div className="og-products-grid">
              {products.map((p) => (
                <div key={p.id} style={s.card}>
                  <div style={s.cardBody}>
                    <div style={s.cardTop}>
                      <div style={s.iconWrap}>{p.icon}</div>
                      <span style={s.badge}>{p.badge}</span>
                    </div>
                    <span style={s.category}>{p.category}</span>
                    <h3 style={s.cardName}>{p.name}</h3>
                    <p style={s.cardTagline}>{p.tagline}</p>
                    <p style={s.cardDesc}>{p.description}</p>
                    <div style={s.chips}>
                      {p.chips.map((c) => <span key={c} style={s.chip}>{c}</span>)}
                    </div>
                    {p.kind === "static" && (
                      <p style={s.note}>
                        Due to high volume, available only for authenticated emails. Email{" "}
                        <a href="mailto:support@onegrasp.com" style={s.noteLink}>support@onegrasp.com</a>
                      </p>
                    )}
                  </div>

                  <div style={s.cardFooter}>
                    {p.kind === "coupon" ? (
                      <span style={s.couponLabel}>Coupon access</span>
                    ) : (
                      <span style={s.price}>₹{p.price.toLocaleString("en-IN")}</span>
                    )}
                    <Link href={p.href || `/products/${p.id}`} className="og-view-btn" style={s.viewBtn}>
                      {p.kind === "coupon" ? "Open Folder" : "View Product"} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section style={{ ...s.section, paddingTop: 0 }}>
          <div className="og-features-grid" style={s.sectionInner}>
            {features.map((f) => (
              <div key={f.title} style={s.feature}>
                <div style={s.featureIcon}>{f.icon}</div>
                <div>
                  <h3 style={s.featureTitle}>{f.title}</h3>
                  <p style={s.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const font = "'Poppins', sans-serif";

const s = {
  hero: { padding: "48px 20px 32px", textAlign: "center", borderBottom: "1px solid #E5E7EB" },
  heroInner: { maxWidth: "720px", margin: "0 auto" },
  heroSub: { fontSize: "0.95rem", color: "#6B7280", lineHeight: 1.7, fontFamily: font, margin: "0 auto 24px", maxWidth: "560px" },
  heroBtnPrimary: {
    display: "inline-block", background: RED, color: "#FFFFFF", padding: "12px 28px", borderRadius: "10px",
    textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", fontFamily: font, transition: "background 0.2s",
  },
  heroBtnOutline: {
    display: "inline-block", background: "#FFFFFF", color: "#4B5563", padding: "12px 28px", borderRadius: "10px",
    textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", fontFamily: font, border: "1.5px solid #E5E7EB",
  },
  statsHeading: { fontSize: "0.72rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: font, margin: "36px 0 8px" },
  statItem: { padding: "16px 12px", textAlign: "center" },
  statValue: { fontSize: "1.9rem", fontWeight: 800, color: RED, fontFamily: font, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1.1 },
  statArrow: { fontSize: "0.9rem", marginRight: "4px", verticalAlign: "middle" },
  statLabel: { fontSize: "0.78rem", color: "#6B7280", fontFamily: font, marginTop: "4px" },
  source: { fontSize: "0.68rem", color: "#9CA3AF", fontFamily: font, marginTop: "10px" },

  section: { padding: "40px 20px" },
  sectionInner: { maxWidth: "1200px", margin: "0 auto", width: "100%" },
  sectionHeader: { textAlign: "center", marginBottom: "24px" },
  sectionTitle: { fontSize: "1.6rem", fontWeight: 800, color: "#1F2937", fontFamily: font, letterSpacing: "-0.02em", marginBottom: "6px" },
  sectionSub: { fontSize: "0.9rem", color: "#6B7280", fontFamily: font },

  card: { background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", overflow: "hidden" },
  cardBody: { padding: "20px", flex: 1 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" },
  iconWrap: { width: "48px", height: "48px", borderRadius: "12px", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" },
  badge: { fontSize: "0.66rem", fontWeight: 700, color: "#6B7280", border: "1px solid #E5E7EB", padding: "3px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: font },
  category: { display: "block", fontSize: "0.68rem", fontWeight: 700, color: RED, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: font, marginBottom: "4px" },
  cardName: { fontSize: "1.05rem", fontWeight: 800, color: "#1F2937", fontFamily: font, lineHeight: 1.3, marginBottom: "4px" },
  cardTagline: { fontSize: "0.8rem", color: "#4B5563", fontWeight: 600, fontFamily: font, marginBottom: "8px" },
  cardDesc: { fontSize: "0.82rem", color: "#6B7280", fontFamily: font, lineHeight: 1.6, marginBottom: "12px" },
  chips: { display: "flex", gap: "6px", flexWrap: "wrap" },
  chip: { background: "#F3F4F6", color: "#4B5563", padding: "3px 10px", borderRadius: "100px", fontSize: "0.72rem", fontFamily: font, fontWeight: 500 },
  note: { marginTop: "12px", background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#4B5563", borderRadius: "8px", padding: "8px 12px", fontSize: "0.74rem", lineHeight: 1.55, fontFamily: font },
  noteLink: { color: RED, fontWeight: 700, textDecoration: "none" },
  cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #E5E7EB", gap: "12px" },
  price: { fontSize: "1.5rem", fontWeight: 800, color: "#1F2937", fontFamily: font, letterSpacing: "-0.03em" },
  couponLabel: { fontSize: "0.85rem", fontWeight: 700, color: "#4B5563", fontFamily: font },
  viewBtn: {
    display: "inline-flex", alignItems: "center", background: RED, color: "#FFFFFF", padding: "9px 16px", borderRadius: "9px",
    textDecoration: "none", fontWeight: 700, fontSize: "0.82rem", fontFamily: font, whiteSpace: "nowrap", transition: "background 0.2s",
  },

  feature: { display: "flex", gap: "12px", alignItems: "flex-start", padding: "16px", border: "1px solid #E5E7EB", borderRadius: "12px" },
  featureIcon: { width: "40px", height: "40px", flexShrink: 0, background: "#FEF2F2", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  featureTitle: { fontSize: "0.88rem", fontWeight: 700, color: "#1F2937", fontFamily: font, marginBottom: "2px" },
  featureDesc: { fontSize: "0.78rem", color: "#6B7280", fontFamily: font, lineHeight: 1.55 },
};
