import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/#products", label: "Toolkit" },
  { href: "/research-writing", label: "Research Writing" },
  { href: "mailto:support@onegrasp.com", label: "Support", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="og2-nav">
      <div className="og2-nav-inner">
        <Link href="/" className="og2-nav-logo" aria-label="OneGrasp home">
          <img src="/images/onegrasp-logo.png" alt="OneGrasp" width="71" height="42" />
        </Link>

        <nav className="og2-nav-links">
          {LINKS.map((l) =>
            l.external ? (
              <a key={l.label} href={l.href} className="og2-nav-link">{l.label}</a>
            ) : (
              <Link key={l.label} href={l.href} className="og2-nav-link">{l.label}</Link>
            )
          )}
        </nav>

        <div className="og2-nav-right">
          <a href="tel:+918977760441" className="og2-nav-cta">
            <span className="og2-nav-cta-dot" />
            +91 89777 60441
          </a>
          <button className="og2-burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            <span style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }} />
            <span style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {open && (
        <div className="og2-menu">
          {LINKS.map((l) =>
            l.external ? (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ) : (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            )
          )}
          <a href="tel:+918977760441" className="og2-menu-phone" onClick={() => setOpen(false)}>Call +91 89777 60441</a>
        </div>
      )}
    </header>
  );
}
