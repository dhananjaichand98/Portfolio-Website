export default function HeroSection({ profile, site }) {
  return (
    <section id="start" className="hero field-hero" aria-labelledby="hero-title">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">Field notes from a frontend systems builder</p>
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
        <figure className="hero-photo">
          <img src={profile.photo} alt={`${profile.name} profile portrait`} />
          <figcaption>
            <span>{profile.location}</span>
            <p>{profile.photoCaption}</p>
          </figcaption>
        </figure>

        <div className="photo-slot-grid" aria-label="Future photo slots">
          {profile.photoSlots.map((slot) => (
            <article className="photo-slot" key={slot.label}>
              <span>{slot.label}</span>
              <p>{slot.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="signal-board" aria-label="Current signals" data-reveal>
        {profile.signals.map((signal) => (
          <article className="signal-tile" key={signal.label}>
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
