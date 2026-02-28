export default function ExperienceSection({ experience }) {
  const initialsFromCompany = (companyName = "") =>
    companyName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <section id="experience" className="content-section" aria-labelledby="experience-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title">Career timeline</h2>
      </div>

      <div className="experience-list">
        {experience.map((item, index) => (
          <div className="experience-item" key={`${item.role}-${item.company}-${item.dates}`}>
            <article className="experience-card" data-reveal>
              <div className="experience-company">
                {item.logo ? (
                  <img
                    className="experience-logo"
                    src={item.logo}
                    alt={item.logoAlt || `${item.company} logo`}
                  />
                ) : (
                  <div className="experience-logo-fallback" aria-hidden="true">
                    {initialsFromCompany(item.company)}
                  </div>
                )}
                <div className="experience-company-info">
                  <div className="experience-company-top">
                    <p className="experience-company-name">{item.company}</p>
                    <p className="experience-dates">{item.dates}</p>
                  </div>
                  <p className="experience-meta">{item.location}</p>
                </div>
              </div>
              <div className="experience-header">
                <h3>{item.role}</h3>
              </div>
              <p className="experience-story">
                {item.story || (item.highlights ? item.highlights.join(" ") : "")}
              </p>
            </article>

            {index < experience.length - 1 ? (
              <div className="experience-divider" aria-hidden="true" data-reveal>
                <span className="experience-divider-line" />
                <span className="experience-divider-dot" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
