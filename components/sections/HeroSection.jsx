export default function HeroSection({ profile, site }) {
  return (
    <section id="start" className="hero field-hero" aria-labelledby="hero-title">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">Personal notes from a software engineer</p>
        <h1 id="hero-title">{profile.thesis || profile.name}</h1>
        <p className="hero-intro">{profile.intro}</p>
        <p className="hero-role">{site.heroTagline}</p>
        <p className="hero-subtitle">{site.heroSubtitle}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href={site.primaryCta.href}>
            {site.primaryCta.label}
          </a>
          <a className="btn btn-secondary" href={site.secondaryCta.href}>
            {site.secondaryCta.label}
          </a>
          <a className="btn btn-tertiary" href="/photography">
            Park Photography
          </a>
        </div>

        <ul className="social-list hero-links" aria-label="Social links">
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
          {site.resumeUrl ? (
            <li>
              <a href={site.resumeUrl} download>
                Resume
              </a>
            </li>
          ) : null}
        </ul>
      </div>

      <div className="hero-visual field-visual" data-reveal>
        <div className="visual-tag visual-tag-primary">Acadia National Park</div>

        <figure className="hero-photo">
          <img src={profile.photo} alt={`${profile.name} profile portrait`} />
          <figcaption>
            <span>{profile.location}</span>
            <p>{profile.photoCaption}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
