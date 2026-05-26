export default function HeroSection({ profile, site }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-text" data-reveal>
        <p className="eyebrow">Open to Software and AI opportunities</p>
        <h1 id="hero-title">{profile.helloText || profile.name}</h1>
        <p className="hero-role">{site.heroTagline}</p>
        <p className="hero-subtitle">{site.heroSubtitle}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href={site.primaryCta.href}>
            {site.primaryCta.label}
          </a>
          <a className="btn btn-secondary" href={site.secondaryCta.href}>
            {site.secondaryCta.label}
          </a>
          {site.resumeUrl ? (
            <a className="btn btn-secondary" href={site.resumeUrl} download>
              Resume
            </a>
          ) : null}
        </div>

        <ul className="social-list" aria-label="Social links">
          {profile.socials.map((social) => {
            const external = social.url.startsWith("http");

            return (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  {social.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hero-visual" data-reveal>
        <article className="profile-card">
          <img src={profile.photo} alt={`${profile.name} profile portrait`} />
          <div className="profile-meta">
            <p>{profile.location}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
