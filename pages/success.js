import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const stored = localStorage.getItem("og_success_email") || "";
    setEmail(stored);
    localStorage.removeItem("og_success_email");
  }, []);

  // Countdown → redirect to home
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
      <div style={s.page}>
        {/* Header */}
        <header style={s.header}>
          <div style={s.headerInner}>
            <div style={s.logoWrap}>
              <span style={s.logoOne}>One</span>
              <span style={s.logoGrasp}>Grasp</span>
            </div>
          </div>
        </header>

        {/* Success Card */}
        <main style={s.main}>
          <div style={s.card}>
            <div style={s.iconWrap}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 style={s.title}>Thank You!</h1>

            <p style={s.body}>
              Your payment was successful. The PDF has been sent to{" "}
              <strong>{email || "your email"}</strong>. Check your inbox — and your{" "}
              <strong>spam/junk folder</strong> just in case.
            </p>

            <div style={s.infoBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D42626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={s.infoText}>
                Need help? Reach us at{" "}
                <a href="mailto:support@onegrasp.com" style={s.link}>
                  support@onegrasp.com
                </a>
              </p>
            </div>

            <p style={s.redirectNote}>
              Redirecting to home in {countdown} second{countdown !== 1 ? "s" : ""}…
            </p>

            <button onClick={() => router.push("/")} style={s.backBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Store
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

const s = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "#F8F9FA",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#FFFFFF",
    borderBottom: "1px solid #EEF0F4",
    boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
  },
  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "16px 28px",
  },
  logoWrap: {
    display: "inline-flex",
    alignItems: "baseline",
    lineHeight: 1,
  },
  logoOne: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#555555",
    letterSpacing: "-0.5px",
  },
  logoGrasp: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#D42626",
    letterSpacing: "-0.5px",
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 24px",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "56px 48px",
    maxWidth: "480px",
    width: "100%",
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    border: "1px solid #EEF0F4",
    textAlign: "center",
  },
  iconWrap: {
    width: "72px",
    height: "72px",
    background: "#16a34a",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 28px",
    boxShadow: "0 8px 24px rgba(22, 163, 74, 0.3)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#0F172A",
    marginBottom: "16px",
    letterSpacing: "-0.03em",
  },
  body: {
    color: "#64748B",
    fontSize: "0.95rem",
    lineHeight: 1.7,
    marginBottom: "24px",
    fontWeight: 400,
  },
  infoBox: {
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: "12px",
    padding: "14px 18px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "20px",
    textAlign: "left",
  },
  infoText: {
    color: "#64748B",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    fontWeight: 400,
    margin: 0,
  },
  link: {
    color: "#D42626",
    textDecoration: "none",
    fontWeight: 600,
  },
  redirectNote: {
    color: "#94A3B8",
    fontSize: "0.82rem",
    marginBottom: "28px",
    fontStyle: "italic",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 32px",
    background: "#D42626",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 4px 14px rgba(212, 38, 38, 0.25)",
    letterSpacing: "0.01em",
  },
};
