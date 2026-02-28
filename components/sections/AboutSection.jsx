export default function AboutSection({ profile }) {
  return (
    <section id="about" className="content-section" aria-labelledby="about-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">About</p>
        <h2 id="about-title">Engineer mindset. Human story.</h2>
      </div>

      <div className="about-grid">
        <div className="about-copy" data-reveal>
          {profile.about.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
        </div>

        <div className="personality-grid" data-reveal>
          {profile.personality.map((item) => (
            <article className="personality-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
