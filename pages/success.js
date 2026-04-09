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
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Thank You — OneGrasp</title>
      </Head>

      <Navbar />

      <main style={s.main}>
        <div style={s.card}>
          {/* Check icon */}
          <div style={s.iconWrap}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span style={s.pill}>Payment Successful</span>
          <h1 style={s.title}>Thank You!</h1>

          <p style={s.body}>
            Your purchase was successful. The PDF has been sent to{" "}
            <strong style={s.emailHighlight}>{email || "your email"}</strong>.
          </p>

          <div style={s.steps}>
            <div style={s.step}>
              <div style={s.stepIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p style={s.stepTitle}>Check Your Inbox</p>
                <p style={s.stepDesc}>Open the email from OneGrasp and download your PDF.</p>
              </div>
            </div>
            <div style={s.step}>
              <div style={s.stepIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <p style={s.stepTitle}>Check Spam / Junk Folder</p>
                <p style={s.stepDesc}>If you don't see it in inbox, check your spam folder.</p>
              </div>
            </div>
            <div style={s.step}>
              <div style={s.stepIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p style={s.stepTitle}>Need Help?</p>
                <p style={s.stepDesc}>
                  Email{" "}
                  <a href="mailto:support@onegrasp.com" style={s.link}>support@onegrasp.com</a>
                  {" "}or call{" "}
                  <a href="tel:+918977760441" style={s.link}>+91 89777 60441</a>
                </p>
              </div>
            </div>
          </div>

          <div style={s.countdownBox}>
            <div style={s.countdownCircle}>{countdown}</div>
            <p style={s.countdownText}>Redirecting to home in {countdown}s</p>
          </div>

          <button onClick={() => router.push("/")} style={s.homeBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
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
    padding: "60px 24px",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "56px 48px",
    maxWidth: "520px",
    width: "100%",
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
    border: "1px solid #E2E8F0",
    textAlign: "center",
  },
  iconWrap: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 12px 32px rgba(22, 163, 74, 0.3)",
  },
  pill: {
    display: "inline-block",
    background: "#F0FDF4",
    color: "#16a34a",
    border: "1px solid #BBF7D0",
    padding: "5px 14px",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "16px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: "12px",
  },
  body: {
    fontSize: "0.95rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.7,
    marginBottom: "28px",
  },
  emailHighlight: {
    color: "#0F172A",
    fontWeight: 700,
  },
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    background: "#F8F9FA",
    border: "1px solid #E2E8F0",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "28px",
    textAlign: "left",
  },
  step: {
    display: "flex",
    gap: "14px",
    padding: "16px 20px",
    alignItems: "flex-start",
    borderBottom: "1px solid #F1F5F9",
  },
  stepIcon: {
    width: "36px",
    height: "36px",
    background: "#FEF2F2",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#0F172A",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "2px",
  },
  stepDesc: {
    fontSize: "0.78rem",
    color: "#64748B",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.5,
  },
  link: {
    color: "#D42626",
    textDecoration: "none",
    fontWeight: 600,
  },
  countdownBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  countdownCircle: {
    width: "36px",
    height: "36px",
    background: "#FEF2F2",
    border: "2px solid #FECACA",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    fontWeight: 800,
    color: "#D42626",
    fontFamily: "'Poppins', sans-serif",
  },
  countdownText: {
    fontSize: "0.82rem",
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "italic",
  },
  homeBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 32px",
    background: "#D42626",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.95rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 4px 16px rgba(212, 38, 38, 0.3)",
    letterSpacing: "0.01em",
  },
};
