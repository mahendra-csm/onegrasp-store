import Link from "next/link";

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        {/* Grid */}
        <div className="og-footer-grid">
          {/* Brand */}
          <div>
            <div style={s.logo}>
              <span style={s.logoOne}>One</span>
              <span style={s.logoGrasp}>Grasp</span>
            </div>
            <p style={s.tagline}>
              Premium digital resources for students, researchers, and academics across India and beyond.
            </p>
            <div style={s.badges}>
              <span style={s.badge}>Secure Payments</span>
              <span style={s.badge}>Instant Delivery</span>
            </div>
          </div>

          {/* Products */}
          <div style={s.col}>
            <h4 style={s.colTitle}>Products</h4>
            <Link href="/products/research-guide" className="og-footer-link" style={s.colLink}>Research Programme Guide</Link>
            <Link href="/products/research-topics" className="og-footer-link" style={s.colLink}>Research Topics</Link>
          </div>

          {/* Contact */}
          <div style={s.col}>
            <h4 style={s.colTitle}>Contact Us</h4>
            <a href="mailto:support@onegrasp.com" className="og-footer-link" style={s.colLink}>support@onegrasp.com</a>
            <a href="tel:+918977760441" className="og-footer-link" style={s.colLink}>+91 89777 60441</a>
            <a href="tel:+918977760442" className="og-footer-link" style={s.colLink}>+91 89777 60442</a>
            <a href="tel:+918977760443" className="og-footer-link" style={s.colLink}>+91 89777 60443</a>
            <p style={s.address}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Hyderabad, Telangana, India
            </p>
          </div>
        </div>

        <div style={s.divider} />

        <div className="og-footer-bottom">
          <p style={s.copy}>© {new Date().getFullYear()} OneGrasp. All rights reserved.</p>
          <p style={s.copy}>Made with ❤️ in Hyderabad, India</p>
        </div>
      </div>
    </footer>
  );
}

const s = {
  footer: {
    background: "#0F172A",
    paddingTop: "56px",
    paddingBottom: "32px",
    marginTop: "80px",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
  logo: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: "14px",
  },
  logoOne: {
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.5px",
  },
  logoGrasp: {
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#D42626",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.5px",
  },
  tagline: {
    fontSize: "0.84rem",
    lineHeight: 1.7,
    color: "#64748B",
    marginBottom: "18px",
    maxWidth: "300px",
  },
  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  badge: {
    background: "#1E293B",
    color: "#94A3B8",
    padding: "4px 12px",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontWeight: 500,
    border: "1px solid #334155",
    fontFamily: "'Poppins', sans-serif",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  colTitle: {
    color: "#F1F5F9",
    fontSize: "0.88rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "4px",
  },
  colLink: {
    color: "#64748B",
    textDecoration: "none",
    fontSize: "0.83rem",
    fontFamily: "'Poppins', sans-serif",
    transition: "color 0.2s",
  },
  address: {
    color: "#475569",
    fontSize: "0.83rem",
    fontFamily: "'Poppins', sans-serif",
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  divider: {
    borderTop: "1px solid #1E293B",
    margin: "36px 0 22px",
  },
  copy: {
    fontSize: "0.78rem",
    color: "#475569",
    fontFamily: "'Poppins', sans-serif",
  },
};
