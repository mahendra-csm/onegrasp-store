import VideoBg from "./VideoBg";

export default function PageHero({ crumbs, kicker, title, subtitle }) {
  return (
    <section className="og2-hero og2-hero-sm">
      <div className="og2-hero-card">
        <VideoBg />
        <div className="og2-shade" />
        <div className="og2-page-hero">
          {crumbs && <nav className="og2-crumbs" aria-label="Breadcrumb">{crumbs}</nav>}
          {kicker && <span className="og2-eyebrow"><b>{kicker}</b></span>}
          <h1 className="og2-page-title">{title}</h1>
          {subtitle && <p className="og2-page-sub">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
