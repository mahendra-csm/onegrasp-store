import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Figures: World Economic Forum, Future of Jobs Report 2025 (2025–2030 outlook).
const DECLINING = [
  "Data Entry Clerks", "Bank Tellers", "Cashiers & Ticket Clerks", "Administrative Assistants",
  "Accounting & Bookkeeping Clerks", "Postal Service Clerks", "Printing Workers", "Material-Recording Clerks",
];
const RISING = [
  "Big Data Specialists", "FinTech Engineers", "AI & Machine Learning Specialists", "Software Developers",
  "Security Management Specialists", "UI & UX Designers", "Renewable Energy Engineers", "Environmental Engineers",
];

const PATHS = [
  { href: "/research-writing", title: "Research Writing", desc: "Publish work that gets noticed" },
  { href: "/products/digital-product", title: "Digital Product", desc: "Turn your expertise into income" },
  { href: "/products/financial-literacy", title: "Financial Literacy", desc: "Make your money work for you" },
  { href: "/products/researcher-to-entrepreneur", title: "Researcher → Entrepreneur", desc: "Take your research to market" },
];

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Counter({ to, run, duration = 1800 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setVal(to); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);
  return <>{val}</>;
}

function Ticker({ items, reverse, tone }) {
  const list = [...items, ...items];
  return (
    <div className="og-ticker">
      <div className={`og-ticker-track${reverse ? " og-ticker-reverse" : ""}`}>
        {list.map((r, i) => (
          <span key={i} className={`og-ticker-chip og-chip-${tone}`}>{r}</span>
        ))}
      </div>
    </div>
  );
}

export default function FutureOfWork() {
  const [ref, inView] = useInView(0.2);
  const on = inView ? " og-in" : "";

  return (
    <section ref={ref} className="og-fow">
      <div className="og-orb og-orb-1" />
      <div className="og-orb og-orb-2" />

      <div className="og-fow-inner">
        <div className={`og-reveal${on}`} style={{ textAlign: "center" }}>
          <span className="og-fow-pill"><span className="og-live-dot" /> The Future of Work · 2025 → 2030</span>
          <h2 className="og-fow-title">
            The job market is being <span className="og-strike">rewritten</span>.<br />
            <span className="og-grad-text">Will your research keep up?</span>
          </h2>
          <p className="og-fow-sub">
            AI, automation and the green economy are reshaping careers faster than ever. By 2030, the world of work will look completely different.
          </p>
        </div>

        <div className="og-fow-cards">
          <div className={`og-fow-card og-card-down og-reveal${on}`} style={{ transitionDelay: "0.1s" }}>
            <div className="og-card-top">
              <span className="og-arrow og-arrow-down">▼</span>
              <span className="og-card-label">Jobs disappearing</span>
            </div>
            <div className="og-big og-big-down"><Counter to={92} run={inView} />M</div>
            <p className="og-card-text">jobs will be <strong>displaced</strong> by 2030 as routine work is automated.</p>
            <Ticker items={DECLINING} tone="down" />
          </div>

          <div className={`og-fow-card og-card-up og-reveal${on}`} style={{ transitionDelay: "0.25s" }}>
            <div className="og-card-top">
              <span className="og-arrow og-arrow-up">▲</span>
              <span className="og-card-label">Jobs emerging</span>
            </div>
            <div className="og-big og-big-up"><Counter to={170} run={inView} />M</div>
            <p className="og-card-text">new jobs will be <strong>created</strong> — for people with the right skills.</p>
            <Ticker items={RISING} tone="up" reverse />
          </div>
        </div>

        <div className={`og-bars og-reveal${on}`} style={{ transitionDelay: "0.35s" }}>
          <div className="og-bar-row">
            <span className="og-bar-label">Displaced</span>
            <div className="og-bar-track"><div className="og-bar og-bar-down" style={{ width: inView ? "54%" : 0 }} /></div>
            <span className="og-bar-val">92M</span>
          </div>
          <div className="og-bar-row">
            <span className="og-bar-label">Created</span>
            <div className="og-bar-track"><div className="og-bar og-bar-up" style={{ width: inView ? "100%" : 0 }} /></div>
            <span className="og-bar-val">170M</span>
          </div>
          <p className="og-bar-note">
            Net <strong>+<Counter to={78} run={inView} />M</strong> jobs — but only for those who adapt.
          </p>
        </div>

        <div className="og-mini-grid">
          {[
            { v: 39, s: "%", t: "of today's core skills will change by 2030" },
            { v: 59, s: " in 100", t: "workers will need new training by 2030" },
            { v: 1, p: "#", t: "fastest-growing skill: AI & big data" },
          ].map((m, i) => (
            <div key={i} className={`og-mini og-reveal${on}`} style={{ transitionDelay: `${0.45 + i * 0.1}s` }}>
              <div className="og-mini-val">{m.p}<Counter to={m.v} run={inView} duration={1400} />{m.s}</div>
              <div className="og-mini-text">{m.t}</div>
            </div>
          ))}
        </div>

        <div className={`og-hook og-reveal${on}`} style={{ transitionDelay: "0.7s" }}>
          <h3 className="og-hook-title">
            The researchers who win won't just <em>study</em> the future — <span className="og-grad-text">they'll build it.</span>
          </h3>
          <p className="og-hook-sub">
            Writing, research, money sense and entrepreneurship are the skills automation can't replace. Start building yours today.
          </p>
          <div className="og-path-grid">
            {PATHS.map((p) => (
              <Link key={p.href} href={p.href} className="og-path">
                <span className="og-path-title">{p.title}</span>
                <span className="og-path-desc">{p.desc}</span>
                <span className="og-path-arrow">→</span>
              </Link>
            ))}
          </div>
          <a href="#products" className="og-hook-btn">Future-proof your career</a>
        </div>

        <p className="og-source">Source: World Economic Forum, <em>Future of Jobs Report 2025</em>.</p>
      </div>
    </section>
  );
}
