import Head from "next/head";

export default function Success() {
  return (
    <>
      <Head>
        <title>Purchase Successful — OneGrasp</title>
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

            <h1 style={s.title}>Payment Successful!</h1>

            <p style={s.body}>
              Your PDF has been sent to your email address. Please check your inbox — and your <strong>spam/junk folder</strong> just in case.
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

            <a href="/" className="back-btn" style={s.backBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Store
            </a>
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
    marginBottom: "32px",
    textAlign: "left",
  },
  infoText: {
    color: "#64748B",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    fontWeight: 400,
  },
  link: {
    color: "#D42626",
    textDecoration: "none",
    fontWeight: 600,
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 32px",
    background: "#D42626",
    color: "#FFFFFF",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 4px 14px rgba(212, 38, 38, 0.25)",
    transition: "background 0.2s, transform 0.2s",
    letterSpacing: "0.01em",
  },
};
