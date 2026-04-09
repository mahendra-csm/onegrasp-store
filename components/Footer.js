import Link from "next/link";

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        {/* Top grid */}
        <div style={s.grid}>
          {/* Brand */}
          <div style={s.brand}>
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
            <Link href="/products/research-guide" style={s.colLink}>Research Programme Guide</Link>
            <Link href="/products/research-topics" style={s.colLink}>Research Topics</Link>
          </div>

          {/* Contact */}
          <div style={s.col}>
            <h4 style={s.colTitle}>Contact Us</h4>
            <a href="mailto:support@onegrasp.com" style={s.colLink}>support@onegrasp.com</a>
            <a href="tel:+918977760441" style={s.colLink}>+91 89777 60441</a>
            <a href="tel:+918977760442" style={s.colLink}>+91 89777 60442</a>
            <a href="tel:+918977760443" style={s.colLink}>+91 89777 60443</a>
            <p style={s.address}>Hyderabad, Telangana, India</p>
          </div>
        </div>

        {/* Divider */}
        <div style={s.divider} />

        {/* Bottom bar */}
        <div style={s.bottom}>
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
    color: "#94A3B8",
    paddingTop: "64px",
    paddingBottom: "32px",
    marginTop: "80px",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr",
    gap: "48px",
  },
  brand: {},
  logo: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: "16px",
  },
  logoOne: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#94A3B8",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.5px",
  },
  logoGrasp: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#D42626",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.5px",
  },
  tagline: {
    fontSize: "0.87rem",
    lineHeight: 1.7,
    color: "#64748B",
    marginBottom: "20px",
    maxWidth: "320px",
  },
  badges: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  badge: {
    background: "#1E293B",
    color: "#94A3B8",
    padding: "5px 12px",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: 500,
    border: "1px solid #334155",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  colTitle: {
    color: "#F1F5F9",
    fontSize: "0.9rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "4px",
  },
  colLink: {
    color: "#64748B",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontFamily: "'Poppins', sans-serif",
    transition: "color 0.2s",
  },
  address: {
    color: "#475569",
    fontSize: "0.85rem",
    fontFamily: "'Poppins', sans-serif",
    marginTop: "4px",
  },
  divider: {
    borderTop: "1px solid #1E293B",
    margin: "40px 0 24px",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  copy: {
    fontSize: "0.8rem",
    color: "#475569",
    fontFamily: "'Poppins', sans-serif",
  },
};
