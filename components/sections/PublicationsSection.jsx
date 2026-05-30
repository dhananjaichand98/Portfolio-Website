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

export default function PublicationsSection({ publications }) {
  return (
    <section id="publications" className="content-section" aria-labelledby="publications-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Publications</p>
        <h2 id="publications-title">Research work</h2>
      </div>

      <div className="publications-list">
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
    </section>
  );
}
