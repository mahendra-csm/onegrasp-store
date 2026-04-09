import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Success() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const stored = localStorage.getItem("og_success_email") || "";
    setEmail(stored);
    localStorage.removeItem("og_success_email");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); router.push("/"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head><title>Thank You — OneGrasp</title></Head>

      <Navbar />

      <main style={s.main}>
        <div className="og-success-card">
          {/* Icon */}
          <div style={s.iconWrap}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span style={s.pill}>Payment Successful</span>
          <h1 style={s.title}>Thank You!</h1>

          <p style={s.body}>
            Your purchase was successful. The PDF has been sent to{" "}
            <strong style={s.emailHL}>{email || "your email"}</strong>.
          </p>

          {/* Steps */}
          <div style={s.steps}>
            {[
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                title: "Check Your Inbox",
                desc: "Open the email from OneGrasp and download your PDF.",
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                title: "Check Spam / Junk Folder",
                desc: "If not in inbox, it may be in your spam folder.",
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                title: "Need Help?",
                desc: (
                  <>
                    <a href="mailto:support@onegrasp.com" style={s.link}>support@onegrasp.com</a>
                    {" · "}
                    <a href="tel:+918977760441" style={s.link}>+91 89777 60441</a>
                  </>
                ),
              },
            ].map((step) => (
              <div key={step.title} style={s.step}>
                <div style={s.stepIconWrap}>{step.icon}</div>
                <div>
                  <p style={s.stepTitle}>{step.title}</p>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div style={s.countdownRow}>
            <div style={s.countdownCircle}>{countdown}</div>
            <p style={s.countdownText}>Redirecting to home in {countdown}s…</p>
          </div>

          <button onClick={() => router.push("/")} className="og-home-btn" style={s.homeBtn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Go to Home
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

const s = {
  main: {
    background: "#F8F9FA",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
  },
  iconWrap: {
    width: "76px", height: "76px",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 18px",
    boxShadow: "0 10px 30px rgba(22,163,74,0.3)",
  },
  pill: {
    display: "inline-block",
    background: "#F0FDF4", color: "#16a34a",
    border: "1px solid #BBF7D0",
    padding: "4px 14px", borderRadius: "100px",
    fontSize: "0.72rem", fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "14px", letterSpacing: "0.04em", textTransform: "uppercase",
  },
  title: {
    fontSize: "1.9rem", fontWeight: 800, color: "#0F172A",
    fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.03em", marginBottom: "12px",
  },
  body: {
    fontSize: "0.92rem", color: "#64748B",
    fontFamily: "'Poppins', sans-serif", lineHeight: 1.7, marginBottom: "24px",
  },
  emailHL: { color: "#0F172A", fontWeight: 700 },

  steps: {
    display: "flex", flexDirection: "column",
    background: "#F8F9FA", border: "1px solid #E2E8F0",
    borderRadius: "14px", overflow: "hidden", marginBottom: "24px", textAlign: "left",
  },
  step: {
    display: "flex", gap: "12px", padding: "14px 18px",
    alignItems: "flex-start", borderBottom: "1px solid #F1F5F9",
  },
  stepIconWrap: {
    width: "34px", height: "34px",
    background: "#FEF2F2", borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  stepTitle: {
    fontSize: "0.83rem", fontWeight: 700, color: "#0F172A",
    fontFamily: "'Poppins', sans-serif", marginBottom: "2px",
  },
  stepDesc: {
    fontSize: "0.76rem", color: "#64748B",
    fontFamily: "'Poppins', sans-serif", lineHeight: 1.5,
  },
  link: { color: "#D42626", textDecoration: "none", fontWeight: 600 },

  countdownRow: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "10px", marginBottom: "22px",
  },
  countdownCircle: {
    width: "34px", height: "34px",
    background: "#FEF2F2", border: "2px solid #FECACA",
    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.88rem", fontWeight: 800, color: "#D42626", fontFamily: "'Poppins', sans-serif",
  },
  countdownText: {
    fontSize: "0.8rem", color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif", fontStyle: "italic",
  },
  homeBtn: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "13px 30px",
    background: "#D42626", color: "#FFFFFF",
    border: "none", borderRadius: "10px", cursor: "pointer",
    fontWeight: 700, fontSize: "0.93rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 4px 16px rgba(212,38,38,0.3)",
    transition: "background 0.2s, transform 0.15s",
  },
};
