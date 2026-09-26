import Link from "next/link";

export default function Footer() {
  return (
    <footer className="og2-footer">
      <div className="og2-footer-card">
        <div className="og2-footer-cta">
          <h2>Grasp what&apos;s <em>next.</em></h2>
          <a href="mailto:support@onegrasp.com" className="og2-btn">
            support@onegrasp.com
            <span className="og2-btn-arrow">→</span>
          </a>
        </div>

        <div className="og2-footer-grid">
          <div>
            <img src="/images/onegrasp-logo.png" alt="OneGrasp" width="85" height="50" style={{ height: 50, width: "auto", display: "block" }} />
            <p className="og2-footer-about">
              Premium digital resources for students, researchers, and academics across India and beyond.
            </p>
          </div>

          <div className="og2-footer-col">
            <h4>Toolkit</h4>
            <Link href="/research-writing">Research Writing</Link>
            <Link href="/products/research-guide">Research Programme Guide</Link>
            <Link href="/products/research-topics">Research Topics</Link>
            <Link href="/products/digital-product">Digital Product</Link>
            <Link href="/products/financial-literacy">Financial Literacy</Link>
            <Link href="/products/researcher-to-entrepreneur">Researcher to Entrepreneur</Link>
          </div>

          <div className="og2-footer-col">
            <h4>Contact</h4>
            <a href="mailto:support@onegrasp.com">support@onegrasp.com</a>
            
            <a href="tel:+918977760442">+91 89777 60442</a>
            <a href="tel:+918977760443">+91 89777 60443</a>
            <span>Hyderabad, Telangana, India</span>
          </div>
        </div>

        <div className="og2-footer-bottom">
          <span>© {new Date().getFullYear()} OneGrasp. All rights reserved.</span>
          <span>Made in Hyderabad, India</span>
        </div>
      </div>
    </footer>
  );
}
