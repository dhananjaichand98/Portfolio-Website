export default function AboutSection({ profile }) {
  return (
    <section id="about" className="content-section" aria-labelledby="about-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">About</p>
        <h2 id="about-title">Building mindset.</h2>
      </div>

      <div className="about-grid">
        <div className="about-copy" data-reveal>
          {profile.about.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
