function renderAuthors(authors) {
  const highlightedName = "Dhananjai Chand";
  const parts = authors.split(highlightedName);

  if (parts.length === 1) {
    return authors;
  }

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? <strong>{highlightedName}</strong> : null}
    </span>
  ));
}

export default function PublicationsSection({ publications, education }) {
  return (
    <section id="research" className="content-section research-section" aria-labelledby="research-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Research Wall</p>
        <h2 id="research-title">Before product systems, I was studying what machines can notice.</h2>
      </div>

      <p className="section-lede" data-reveal>
        My early work sat at the intersection of computer vision, road safety, and autonomous
        vehicle support systems. That research background still shapes how I think about signals,
        edge cases, and feedback loops in product interfaces.
      </p>

      <div className="research-wall">
        {publications.map((item) => (
          <article className="publication-card" key={`${item.title}-${item.date}`} data-reveal>
            <div className="publication-header">
              <div>
                <h3>{item.title}</h3>
                <p>{renderAuthors(item.authors)}</p>
              </div>
              <span>{item.date}</span>
            </div>

            <p className="publication-meta">
              {item.venue}
              {item.publication ? <span>{item.publication}</span> : null}
            </p>

            <p className="publication-summary">{item.summary}</p>

            <div className="publication-footer">
              <ul className="publication-tags" aria-label={`${item.title} topics`}>
                {item.tags.map((tag) => (
                  <li key={`${item.title}-${tag}`}>{tag}</li>
                ))}
              </ul>

              {item.url ? (
                <a className="publication-link" href={item.url} target="_blank" rel="noreferrer">
                  View publication
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="education-strip" data-reveal aria-label="Education">
        {education.map((item) => (
          <article className="education-card" key={`${item.school}-${item.dates}`}>
            <span>{item.dates}</span>
            <h3>{item.school}</h3>
            <p>{item.degree}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
