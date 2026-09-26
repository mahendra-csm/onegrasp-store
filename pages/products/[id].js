import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { RW_BATCH, RW_TITLE } from "../../lib/format";

const PRODUCTS_DATA = {
  "research-guide": {
    name: "Student Research Programme Guide",
    category: "Research Skills",
    badge: "Bestseller",
    tagline: "Your complete roadmap to academic research excellence",
    description:
      "A comprehensive, step-by-step guide designed for students at every level — from high school to PhD. Master research methodology, academic writing, and citation practices used by top researchers worldwide.",
    price: 999,
    pages: "40+",
    topicsCount: 12,
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
    highlights: ["Step-by-step methodology", "Real-world examples included", "All major citation formats", "Beginner to advanced level", "PDF on request"],
  },
  "research-topics": {
    name: "Student Research Topics",
    category: "Research Topics",
    badge: "Most Popular",
    tagline: "100+ handpicked research topics across every academic domain",
    description:
      "Stop wasting time searching for research topics. Get a curated collection of trending, relevant, and publishable research topics across all major academic fields — with scope descriptions to help you start instantly.",
    price: 999,
    pages: "30+",
    topicsCount: 100,
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
  "digital-product": {
    name: "Digital Product",
    category: "Creator Economy",
    badge: "Premium",
    tagline: "Build, package and sell your own digital products",
    description:
      "A practical playbook for turning your knowledge into digital products — from idea validation and creation to pricing, launch and selling online. Built for students, researchers and educators who want to create an independent income stream.",
    price: 999,
    whatInside: [
      { title: "Finding Your Product Idea", desc: "Identify what you know that others will pay for, and pick the right product format." },
      { title: "Validating Demand", desc: "Test your idea with real people before investing time in building it." },
      { title: "Creating the Product", desc: "Structure and produce e-books, templates, courses and toolkits efficiently." },
      { title: "Pricing Strategy", desc: "Set prices that reflect value, with tiers, bundles and launch offers." },
      { title: "Selling Online", desc: "Set up storefronts, payment gateways and instant digital delivery." },
      { title: "Launch & Marketing", desc: "Plan a launch, grow an audience and market through social media and email." },
    ],
    whoFor: ["Students", "Researchers", "Educators", "Freelancers", "Aspiring Creators", "Working Professionals"],
    highlights: ["Idea-to-launch roadmap", "Pricing & positioning frameworks", "Online selling setup", "Marketing playbook", "Practical templates"],
  },
  "financial-literacy": {
    name: "Financial Literacy",
    category: "Personal Finance",
    badge: "Essential",
    tagline: "Master money basics every student should know",
    description:
      "Budgeting, saving, investing, credit and taxes explained simply. Build the money habits and confidence to make smart financial decisions early — with examples relevant to students and young professionals in India.",
    price: 999,
    whatInside: [
      { title: "Budgeting Basics", desc: "Track income and expenses and build a budget you can actually stick to." },
      { title: "Saving & Emergency Funds", desc: "How much to save, where to keep it, and why an emergency fund comes first." },
      { title: "Banking & Digital Payments", desc: "Accounts, UPI, cards and staying safe from common financial frauds." },
      { title: "Credit & Loans", desc: "Credit scores, education loans, EMIs and using credit responsibly." },
      { title: "Introduction to Investing", desc: "Mutual funds, SIPs, stocks, and the power of compounding." },
      { title: "Taxes & Financial Planning", desc: "Income tax basics and setting long-term financial goals." },
    ],
    whoFor: ["High School Students", "College Students", "Postgraduates", "Young Professionals", "First-time Earners", "Parents"],
    highlights: ["Beginner-friendly", "India-specific examples", "Budgeting templates", "Investing fundamentals", "Fraud-safety tips"],
  },
  "researcher-to-entrepreneur": {
    name: "Researcher to Entrepreneur Mastery",
    category: "Entrepreneurship",
    badge: "Masterclass",
    tagline: "Turn your research into a real-world venture",
    description:
      "Learn how to identify commercial potential in your research, validate the market, protect your ideas, and take the first steps toward building a startup — a structured path from lab or library to launch.",
    price: 999,
    whatInside: [
      { title: "Research Commercialisation", desc: "Spot the problems your research solves and who would pay for the solution." },
      { title: "Market Validation", desc: "Customer discovery, competitor analysis and product–market fit." },
      { title: "Intellectual Property", desc: "Patents, copyrights and protecting your ideas before you share them." },
      { title: "Business Models", desc: "Choose how your venture creates, delivers and captures value." },
      { title: "Funding & Grants", desc: "Startup India, incubators, research grants, angels and early-stage funding." },
      { title: "Pitching Your Venture", desc: "Build a compelling pitch deck and present to investors and incubators." },
    ],
    whoFor: ["PhD Scholars", "Postgraduate Researchers", "Faculty Members", "Research Assistants", "Student Innovators", "Aspiring Founders"],
    highlights: ["Research-to-startup roadmap", "IP & patent basics", "Funding & grant guidance", "Pitch deck framework", "Real-world case studies"],
  },
};

// Same order as the homepage toolkit; Research Writing is the highlighted coupon folder.
const TOOLKIT_ORDER = ["research-guide", "research-topics", "researcher-to-entrepreneur", "digital-product", "financial-literacy"];

const STATIC_META = [
  { icon: "🎓", val: "Expert", lbl: "Curated" },
  { icon: "🔒", val: "Verified", lbl: "Emails only" },
  { icon: "📩", val: "Email", lbl: "Request" },
  { icon: "💳", val: "One-time", lbl: "Price" },
];

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = id ? PRODUCTS_DATA[id] : null;
  const others = TOOLKIT_ORDER.filter((pid) => pid !== id);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", color: "#6B7280" }}>Loading…</p>
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
        <PageHero
          crumbs={<><Link href="/">Home</Link><span>/</span><Link href="/#products">Toolkit</Link><span>/</span><strong>{product.name}</strong></>}
          kicker={`${product.category} · ${product.badge}`}
          title={product.name}
          subtitle={product.tagline}
        />

        {/* Two-col layout — stacks on mobile via CSS, buy card first on mobile */}
        <div style={s.pageWrap}>
          <div className="og-page-grid">

            {/* LEFT: product info */}
            <div className="og-left-col">
              {/* Hero card */}
              <div style={s.heroCard}>
                <div style={s.heroCardBody}>
                  <p style={s.heroDesc}>{product.description}</p>
                  {/* Meta row */}
                  <div className="og-meta-row">
                    {(product.pages ? [
                      { icon: "📄", val: product.pages, lbl: "Pages" },
                      { icon: "✅", val: `${product.topicsCount}+`, lbl: id === "research-guide" ? "Sections" : "Topics" },
                      { icon: "⚡", val: "PDF", lbl: "Format" },
                      { icon: "📩", val: "Email", lbl: "Request" },
                    ] : STATIC_META).map((m, i, arr) => (
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DB3433" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DB3433" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    <span style={s.priceOnly}>Price</span>
                    <span style={s.priceAmt}>₹{product.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p style={s.priceNote}>One-time · Available on request</p>
                </div>

                  <div style={s.buyBody}>
                    <div style={s.volumeNote}>
                      <strong style={{ display: "block", marginBottom: 4 }}>High demand notice</strong>
                      Due to high volume, we are currently offering this only to authenticated emails. If you would like access, please send us an email at{" "}
                      <a href="mailto:support@onegrasp.com" style={s.supportLink}>support@onegrasp.com</a>.
                    </div>
                    <a
                      href={`mailto:support@onegrasp.com?subject=${encodeURIComponent(`Access request: ${product.name}`)}`}
                      className="og-request-btn"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                      Request Access by Email
                    </a>
                  </div>

                {/* Support */}
                <div style={s.buySupport}>
                  <p style={s.supportText}>
                    Need help?{" "}
                    <a href="mailto:support@onegrasp.com" style={s.supportLink}>support@onegrasp.com</a>
                    {" · "}
                    <a href="tel:+918977760442" style={s.supportLink}>+91 89777 60442</a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          <section className="og2-more">
            <h2 className="og2-more-title">More from the toolkit</h2>
            <div className="og2-grid">
              <Link href="/research-writing" className="og2-tile og2-tile-sm og2-t-dark">
                <div className="og2-tile-top">
                  <span className="og2-tag">Programme materials</span>
                  <span className="og2-chip">{RW_BATCH} batch</span>
                </div>
                <h3>{RW_TITLE}</h3>
                <p>The complete batch folder — unlock it with your coupon code.</p>
                <div className="og2-tile-foot">
                  <span className="og2-price">Coupon access</span>
                  <span className="og2-arrow" aria-hidden="true">→</span>
                </div>
              </Link>
              {others.map((pid) => {
                const p = PRODUCTS_DATA[pid];
                return (
                  <Link key={pid} href={`/products/${pid}`} className="og2-tile og2-tile-sm">
                    <div className="og2-tile-top">
                      <span className="og2-tag">{p.category}</span>
                      <span className="og2-chip">{p.badge}</span>
                    </div>
                    <h3>{p.name}</h3>
                    <p>{p.tagline}</p>
                    <div className="og2-tile-foot">
                      <span className="og2-price">₹{p.price.toLocaleString("en-IN")}<small>on request</small></span>
                      <span className="og2-arrow" aria-hidden="true">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

const s = {
  main: { background: "#FFFFFF", minHeight: "100vh", overflowX: "clip" },

  pageWrap: { maxWidth: "1240px", margin: "0 auto", padding: "24px 16px 48px", width: "100%" },

  heroCard: {
    background: "#F5F5F6", borderRadius: "24px",
    border: "1px solid #E7E7EA", overflow: "hidden",
  },
  heroCardBody: { padding: "24px" },
  heroDesc: {
    fontSize: "0.9rem", color: "#4B5563", fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.75, marginBottom: "20px",
  },

  /* Meta row */
  metaItem: { flex: 1, padding: "14px 10px", display: "flex", alignItems: "center", gap: "8px" },
  metaIcon: { fontSize: "1.1rem" },
  metaVal: { fontSize: "0.95rem", fontWeight: 800, color: "#1F2937", fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 },
  metaLbl: { fontSize: "0.68rem", color: "#9CA3AF", fontFamily: "'Poppins', sans-serif", fontWeight: 500 },

  /* Blocks */
  block: {
    background: "#F5F5F6", borderRadius: "24px", border: "1px solid #E7E7EA",
    padding: "24px",
  },
  blockTitle: {
    fontSize: "1.1rem", fontWeight: 800, color: "#1F2937",
    fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.02em", marginBottom: "14px",
  },
  red: { color: "#DB3433" },

  insideCard: {
    display: "flex", gap: "14px", alignItems: "flex-start",
    padding: "14px", background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E7E7EA",
  },
  insideNum: {
    fontSize: "1rem", fontWeight: 800, color: "#DB3433",
    fontFamily: "'Poppins', sans-serif", flexShrink: 0, opacity: 0.45, minWidth: "28px",
  },
  insideTitle: { fontSize: "0.87rem", fontWeight: 700, color: "#1F2937", fontFamily: "'Poppins', sans-serif", marginBottom: "4px" },
  insideDesc: { fontSize: "0.8rem", color: "#6B7280", fontFamily: "'Poppins', sans-serif", lineHeight: 1.6 },

  whoCard: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "#FFFFFF", border: "1px solid #E7E7EA",
    borderRadius: "999px", padding: "10px 16px",
  },
  whoLabel: { fontSize: "0.82rem", fontWeight: 600, color: "#1F2937", fontFamily: "'Poppins', sans-serif" },

  highlightsBox: {
    background: "#F5F5F6", border: "1px solid #E7E7EA",
    borderRadius: "24px", padding: "24px",
  },
  highlightsTitle: {
    fontSize: "1.1rem", fontWeight: 800, color: "#1F2937",
    fontFamily: "'Poppins', sans-serif", marginBottom: "14px",
  },
  highlightsList: { display: "flex", flexDirection: "column", gap: "10px" },
  highlightItem: { display: "flex", alignItems: "center", gap: "10px" },
  highlightText: { fontSize: "0.85rem", color: "#4B5563", fontFamily: "'Poppins', sans-serif", fontWeight: 500 },

  /* Buy card */
  buyCard: {
    background: "#FFFFFF", borderRadius: "24px",
    border: "1px solid #E7E7EA", boxShadow: "0 30px 60px -30px rgba(14,14,17,0.25)",
    overflow: "hidden", marginBottom: "14px",
  },
  buyTop: {
    padding: "24px", background: "#0E0E11",
    backgroundImage: "radial-gradient(circle at 100% 0%, rgba(219,52,51,0.45), transparent 55%)",
  },
  priceRow: { display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "6px" },
  priceOnly: { fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", fontFamily: "'Poppins', sans-serif", fontWeight: 500 },
  priceAmt: {
    fontSize: "2.8rem", fontWeight: 700, color: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.05em", lineHeight: 1,
  },
  priceNote: { fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", fontFamily: "'Poppins', sans-serif" },

  buyBody: { padding: "22px 24px" },
  volumeNote: {
    background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#4B5563",
    borderRadius: "10px", padding: "12px 14px", fontSize: "0.8rem", lineHeight: 1.6,
    fontFamily: "'Poppins', sans-serif", marginBottom: "16px",
  },

  buySupport: {
    padding: "14px 24px", background: "#FFFFFF", borderTop: "1px solid #F3F4F6",
  },
  supportText: { fontSize: "0.75rem", color: "#6B7280", fontFamily: "'Poppins', sans-serif", lineHeight: 1.6 },
  supportLink: { color: "#DB3433", textDecoration: "none", fontWeight: 600 },
};
