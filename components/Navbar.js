import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={s.nav}>
      <div style={s.inner}>
        {/* Logo */}
        <Link href="/" style={s.logo}>
          <img src="/images/onegrasp-logo.png" alt="OneGrasp" width="81" height="48" style={{ height: 48, width: "auto", display: "block" }} />
        </Link>

        {/* Desktop links — hidden on mobile via CSS class */}
        <div className="og-nav-links">
          <Link href="/" className="og-nav-link" style={s.link}>Home</Link>
          <Link href="/#products" className="og-nav-link" style={s.link}>Products</Link>
          <a href="mailto:support@onegrasp.com" className="og-nav-link" style={s.link}>Support</a>
          <a href="tel:+918977760441" style={s.phonePill}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +91 89777 60441
          </a>
        </div>

        {/* Hamburger — shown on mobile via CSS class */}
        <button
          className="og-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span style={{ ...s.bar, transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ ...s.bar, opacity: open ? 0 : 1 }} />
          <span style={{ ...s.bar, transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`og-mobile-menu${open ? " open" : ""}`} style={s.mobileMenu}>
        <Link href="/" style={s.mobileLink} onClick={() => setOpen(false)}>Home</Link>
        <Link href="/#products" style={s.mobileLink} onClick={() => setOpen(false)}>Products</Link>
        <a href="mailto:support@onegrasp.com" style={s.mobileLink} onClick={() => setOpen(false)}>Support</a>
        <a href="tel:+918977760441" style={s.mobileLinkPhone} onClick={() => setOpen(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          +91 89777 60441
        </a>
      </div>
    </nav>
  );
}

const s = {
  nav: {
    background: "#FFFFFF",
    borderBottom: "1px solid #E5E7EB",
    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#4B5563",
    fontSize: "0.88rem",
    fontWeight: 500,
    fontFamily: "'Poppins', sans-serif",
    transition: "color 0.2s",
  },
  phonePill: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    background: "#DB3433",
    color: "#FFFFFF",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "0.8rem",
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    whiteSpace: "nowrap",
  },
  bar: {
    display: "block",
    width: "22px",
    height: "2px",
    background: "#1F2937",
    borderRadius: "2px",
    transition: "all 0.25s",
  },
  mobileMenu: {
    flexDirection: "column",
    background: "#FFFFFF",
    borderTop: "1px solid #F3F4F6",
    padding: "8px 20px 20px",
    gap: "2px",
  },
  mobileLink: {
    textDecoration: "none",
    color: "#1F2937",
    fontSize: "0.95rem",
    fontWeight: 500,
    fontFamily: "'Poppins', sans-serif",
    padding: "12px 0",
    borderBottom: "1px solid #F3F4F6",
    display: "block",
  },
  mobileLinkPhone: {
    textDecoration: "none",
    color: "#DB3433",
    fontSize: "0.95rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    padding: "14px 0 4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};
