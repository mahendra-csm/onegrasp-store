import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoBg from "../components/VideoBg";
import { RW_BATCH, RW_TITLE } from "../lib/format";

const SKILLS = [
  "Research methodology", "Academic writing", "Literature review", "Citations",
  "Data analysis", "Publishing", "Financial literacy", "Entrepreneurship", "Digital products",
];

const TOOLKIT = [
  {
    href: "/research-writing", featured: true, tag: "Programme materials", chip: `${RW_BATCH} batch`,
    name: "Research Writing",
    desc: "The complete batch folder — session materials, templates, tests and guides. Unlock it with your batch coupon code.",
  },
  {
    href: "/products/research-guide", tag: "Research skills", chip: "Bestseller", meta: "40+ pages · 12+ sections",
    name: "Student Research Programme Guide",
    desc: "Methodology, literature review, analysis, citations and academic writing — high school to PhD.",
  },
  {
    href: "/products/research-topics", tag: "Research topics", chip: "Most popular", meta: "30+ pages · 100+ topics",
    name: "Student Research Topics",
    desc: "Trending, publishable topics across CS, medicine, business, environment and more.",
  },
  {
    href: "/products/researcher-to-entrepreneur", tag: "Entrepreneurship", chip: "Masterclass", meta: "Validation · IP · Funding · Pitching",
    name: "Researcher to Entrepreneur Mastery",
    desc: "Take your research from the lab to the market and build your first venture.",
  },
  {
    href: "/products/digital-product", tag: "Creator economy", chip: "Premium", meta: "Idea · Pricing · Launch",
    name: "Digital Product",
    desc: "Turn your expertise into digital products that sell — from idea to launch.",
  },
  {
    href: "/products/financial-literacy", tag: "Personal finance", chip: "Essential", meta: "Budgeting · Saving · Investing",
    name: "Financial Literacy",
    desc: "The money basics every student and young researcher should know.",
  },
];

const TRUST = [
  { title: "Instant downloads", desc: "Unlock programme materials with your coupon code." },
  { title: "Verified access", desc: "Resources shared only with authenticated emails." },
  { title: "Expert-curated", desc: "Crafted by researchers and academics." },
  { title: "Every level", desc: "From high school to PhD." },
];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function Counter({ to, delay = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (reducedMotion()) { setVal(to); return; }
    let raf;
    let start;
    const tick = (now) => {
      start ??= now + delay;
      const t = Math.max(0, Math.min(1, (now - start) / 1800));
      setVal(Math.round(to * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay]);
  return <>{val}</>;
}

function useTypewriter(text) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reducedMotion()) { setN(text.length); return; }
    let t;
    const step = (i) => {
      setN(i);
      const done = i >= text.length;
      t = setTimeout(() => step(done ? 0 : i + 1), done ? 2200 : 150);
    };
    step(0);
    return () => clearTimeout(t);
  }, [text]);
  return text.slice(0, n);
}

function Tile({ href, className = "", children }) {
  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <Link href={href} className={`og2-tile ${className}`} onMouseMove={onMove}>
      {children}
    </Link>
  );
}

const Arrow = () => (
  <span className="og2-arrow" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  </span>
);

const Lock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function Home() {
  const typed = useTypewriter("RW-SEP2026");

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (reducedMotion() || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>OneGrasp — From Research Question to Real-World Impact</title>
        <meta name="description" content="Guides, programme materials and masterclasses for researchers and PhD scholars — write stronger papers, publish with confidence, and turn research into impact." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="og2-hero">
          <div className="og2-hero-card">
            <VideoBg />
            <div className="og2-shade" />

            <div className="og2-hero-grid">
              <div className="og2-hero-copy">
                <Link href="/research-writing" className="og2-eyebrow">
                  <b>New</b> {RW_TITLE} · {RW_BATCH} batch is live <span aria-hidden="true">→</span>
                </Link>
                <h1 className="og2-h1">
                  <span className="og2-line"><span>From research question</span></span>
                  <span className="og2-line"><span className="og2-h1-soft">to real-world impact.</span></span>
                </h1>
                <p className="og2-hero-sub">
                  Guides, programme materials and masterclasses for researchers and PhD scholars — to write stronger papers, publish with confidence, and turn your research into impact.
                </p>
                <div className="og2-hero-ctas">
                  <a href="#products" className="og2-btn">Explore the toolkit <span className="og2-btn-arrow">→</span></a>
                  <Link href="/research-writing" className="og2-btn-glass">Have a coupon code?</Link>
                </div>
              </div>

              <aside className="og2-shift" aria-label="The great job shift, 2025 to 2030">
                <div className="og2-shift-head">
                  <span>The great job shift</span>
                  <span>2025 → 2030</span>
                </div>
                <div className="og2-shift-nums">
                  <div>
                    <div className="og2-shift-num is-loss">−<Counter to={92} delay={600} />M</div>
                    <div className="og2-shift-lbl">jobs disappearing</div>
                  </div>
                  <div>
                    <div className="og2-shift-num is-gain">+<Counter to={170} delay={800} /><small>M</small></div>
                    <div className="og2-shift-lbl">new jobs emerging</div>
                  </div>
                </div>
                <div className="og2-shift-bar" aria-hidden="true">
                  <span className="loss" />
                  <span className="gain" />
                </div>
                <p className="og2-shift-foot">
                  <strong><Counter to={39} delay={1000} />%</strong> of core skills will change. The researchers who adapt will lead.
                </p>
                <p className="og2-src">Source: World Economic Forum, Future of Jobs Report 2025</p>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Skills marquee ── */}
        <div className="og2-marquee" aria-hidden="true">
          <div className="og2-marquee-track">
            {[...SKILLS, ...SKILLS].map((w, i) => (
              <span key={i} className={i % 2 ? "is-muted" : ""}>{w}<i>✦</i></span>
            ))}
          </div>
        </div>

        {/* ── Toolkit ── */}
        <section className="og2-section" id="products">
          <header className="og2-head" data-reveal>
            <div>
              <span className="og2-kicker">The toolkit — 06</span>
              <h2 className="og2-h2">Six resources. <span className="og2-h2-soft">One unfair advantage.</span></h2>
            </div>
            <p>Handpicked guides, programme materials and masterclasses — built by researchers, priced for students.</p>
          </header>

          <div className="og2-grid">
            {TOOLKIT.map((p, i) => (
              <div key={p.href} data-reveal style={{ transitionDelay: `${0.06 * i}s` }}>
                <Tile href={p.href} className={p.featured ? "og2-t-dark" : ""}>
                  <div className="og2-tile-top">
                    <span className="og2-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="og2-chip">{p.chip}</span>
                  </div>
                  <span className="og2-tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  {p.featured ? (
                    <div className="og2-code" aria-hidden="true">
                      <Lock />
                      <span className="og2-code-text">{typed}</span>
                      <span className="og2-caret" />
                    </div>
                  ) : (
                    <span className="og2-meta">{p.meta}</span>
                  )}
                  <div className="og2-tile-foot">
                    {p.featured
                      ? <span className="og2-price">Coupon access</span>
                      : <span className="og2-price">₹999<small>on request</small></span>}
                    <Arrow />
                  </div>
                </Tile>
              </div>
            ))}
          </div>

          <p className="og2-note" data-reveal>
            <Lock />
            <span>
              <strong>Guides &amp; masterclasses — ₹999, on request:</strong> due to high volume, we&apos;re offering them only to authenticated emails.
              Want access? Email <a href="mailto:support@onegrasp.com">support@onegrasp.com</a>
            </span>
          </p>
        </section>

        {/* ── Trust strip ── */}
        <section className="og2-trust" data-reveal>
          {TRUST.map((t, i) => (
            <div key={t.title}>
              <span className="og2-trust-num">0{i + 1}</span>
              <b>{t.title}</b>
              <span>{t.desc}</span>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
