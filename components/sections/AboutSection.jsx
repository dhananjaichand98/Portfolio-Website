export default function AboutSection({ profile }) {
  return (
    <section id="story" className="content-section origin-section" aria-labelledby="story-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Origin Note</p>
        <h2 id="story-title">The job title changes. The instinct keeps showing up.</h2>
      </div>

      <div className="origin-layout">
        <div className="origin-letter" data-reveal>
          {profile.about.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
        </div>

        <div className="principle-stack" aria-label="Working principles">
          {profile.principles.map((principle) => (
            <article className="principle-card" key={principle.title} data-reveal>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="origin-ribbon" data-reveal>
        Every role changed the domain. The underlying instinct stayed the same.
      </p>
    </section>
  );
}
