export default function ExperienceSection({ experience }) {
  const initialsFromCompany = (companyName = "") =>
    companyName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <section id="work" className="content-section chapters-section" aria-labelledby="work-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Chapters</p>
        <h2 id="work-title">A career is just a trail of problems you learned how to read.</h2>
      </div>

      <ol className="chapter-list">
        {experience.map((item, index) => (
          <li className="chapter-item" key={`${item.role}-${item.company}-${item.dates}`}>
            <article className="chapter-card" data-reveal>
              <div className="chapter-index" aria-hidden="true">
                {String(experience.length - index).padStart(2, "0")}
              </div>

              <div className="chapter-company">
                {item.logo ? (
                  <img
                    className="chapter-logo"
                    src={item.logo}
                    alt={item.logoAlt || `${item.company} logo`}
                  />
                ) : (
                  <div className="chapter-logo-fallback" aria-hidden="true">
                    {initialsFromCompany(item.company)}
                  </div>
                )}
                <div className="chapter-company-info">
                  <div className="chapter-company-top">
                    <p className="chapter-company-name">{item.company}</p>
                    <p className="chapter-dates">{item.dates}</p>
                  </div>
                  <p className="chapter-meta">{item.role} / {item.location}</p>
                </div>
              </div>

              <div className="chapter-body">
                <h3>{item.chapter || item.role}</h3>
                {item.focus ? <p className="chapter-focus">{item.focus}</p> : null}
                <p className="chapter-story">
                  {item.story || (item.highlights ? item.highlights.join(" ") : "")}
                </p>
              </div>

              {item.lesson ? (
                <aside className="chapter-lesson">
                  <span>Field note</span>
                  <p>{item.lesson}</p>
                </aside>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
