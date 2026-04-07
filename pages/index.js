import Head from "next/head";

const products = [
  {
    id: "research-guide",
    name: "Student Research Programme Guide",
    headline: "Master Research from Day One",
    adCopy:
      "Struggling with where to start your research project? Our step-by-step guide covers methodology, citation tools, and best practices used by top university students.",
    price: 1,
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #D42626 100%)",
    bannerLabel: "Research Guide",
    paymentLink: "https://rzp.io/rzp/a0AJLnLf",
    bannerIcon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: "research-topics",
    name: "Student Research Topics",
    headline: "Find Your Perfect Research Topic",
    adCopy:
      "Handpicked, trending research topics across all academic domains. Stop wasting time searching — get a curated list with domain insights and scope suggestions.",
    price: 1,
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #8B1A1A 100%)",
    bannerLabel: "100+ Topics",
    paymentLink: "https://rzp.io/rzp/ATDmGXva",
    bannerIcon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>OneGrasp — Student Research Store</title>
        <meta name="description" content="Buy student research guides and topics from OneGrasp." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={s.page}>
        {/* Meta Ad Cards */}
        <section style={s.adsSection}>
          <div className="product-grid" style={s.adsGrid}>
            {products.map((p) => (
              <div key={p.id} style={s.adCard}>

                {/* ── Ad Header ── */}
                <div style={s.adHeader}>
                  <div style={s.adAvatar}>
                    <span style={s.adAvatarOne}>O</span>
                    <span style={s.adAvatarG}>G</span>
                  </div>
                  <div style={s.adHeaderText}>
                    <div style={s.adPageName}>OneGrasp</div>
                    <div style={s.adSponsored}>
                      Sponsored ·
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                  </div>
                  <div style={s.adDotsMenu}>
                    <span style={s.adDot} />
                    <span style={s.adDot} />
                    <span style={s.adDot} />
                  </div>
                </div>

                {/* ── Ad Copy ── */}
                <p style={s.adCopy}>{p.adCopy}</p>

                {/* ── Ad Banner ── */}
                <div style={{ ...s.adBanner, background: p.gradient }}>
                  <div style={s.adBannerOverlay}>
                    {p.bannerIcon}
                    <div style={s.adBannerLabel}>{p.bannerLabel}</div>
                    <div style={s.adBannerPrice}>₹{p.price} only</div>
                  </div>
                </div>

                {/* ── CTA Row ── */}
                <div style={s.adCTARow}>
                  <div style={s.adCTAText}>
                    <div style={s.adDomain}>onegrasp.com</div>
                    <div style={s.adHeadline}>{p.headline}</div>
                  </div>
                  <a
                    href={p.paymentLink}
                    style={s.shopNowBtn}
                  >
                    Shop Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>

                {/* ── Engagement Row ── */}
                <div style={s.engagementRow}>
                  <span style={s.engBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    Like
                  </span>
                  <span style={s.engBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Comment
                  </span>
                  <span style={s.engBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    Share
                  </span>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

const s = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "#F0F2F5",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
  },

  /* ── Ads Grid ── */
  adsSection: {
    width: "100%",
    maxWidth: "860px",
  },
  adsGrid: {
    display: "flex",
    gap: "24px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  /* ── Meta Ad Card ── */
  adCard: {
    background: "#FFFFFF",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    border: "1px solid #DAE0E8",
    overflow: "hidden",
  },

  /* Ad Header */
  adHeader: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    gap: "10px",
  },
  adAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#1A1A2E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  adAvatarOne: {
    fontSize: "0.9rem",
    fontWeight: 800,
    color: "#AAAAAA",
  },
  adAvatarG: {
    fontSize: "0.9rem",
    fontWeight: 800,
    color: "#D42626",
  },
  adHeaderText: { flex: 1 },
  adPageName: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#0F172A",
    lineHeight: 1.3,
  },
  adSponsored: {
    fontSize: "0.75rem",
    color: "#65676B",
    display: "flex",
    alignItems: "center",
  },
  adDotsMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    padding: "4px",
  },
  adDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#65676B",
    display: "block",
  },

  /* Ad Copy */
  adCopy: {
    fontSize: "0.88rem",
    color: "#1C1E21",
    lineHeight: 1.6,
    padding: "0 16px 12px",
    fontWeight: 400,
  },

  /* Ad Banner */
  adBanner: {
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  adBannerOverlay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  adBannerLabel: {
    fontSize: "1.3rem",
    fontWeight: 800,
    color: "#FFFFFF",
    letterSpacing: "-0.02em",
    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  adBannerPrice: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
    background: "rgba(0,0,0,0.25)",
    padding: "4px 14px",
    borderRadius: "100px",
  },

  /* CTA Row */
  adCTARow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    background: "#F0F2F5",
    borderTop: "1px solid #DAE0E8",
    borderBottom: "1px solid #DAE0E8",
    gap: "12px",
  },
  adCTAText: { flex: 1, minWidth: 0 },
  adDomain: {
    fontSize: "0.72rem",
    color: "#65676B",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    marginBottom: "2px",
  },
  adHeadline: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#0F172A",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  shopNowBtn: {
    background: "#D42626",
    color: "#FFFFFF",
    textDecoration: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    flexShrink: 0,
    boxShadow: "0 3px 10px rgba(212,38,38,0.25)",
  },

  /* Engagement Row */
  engagementRow: {
    display: "flex",
    borderTop: "1px solid #DAE0E8",
    padding: "4px 8px",
  },
  engBtn: {
    flex: 1,
    padding: "8px 4px",
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "#65676B",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    borderRadius: "6px",
  },
};
