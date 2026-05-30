export default function ProjectsSection({ projects }) {
  const featuredProjects = projects.slice(0, 4);
  const archivedProjects = projects.slice(4);

  return (
    <section id="projects" className="content-section cases-section" aria-labelledby="projects-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Case Files</p>
        <h2 id="projects-title">Projects I would rather explain as questions than trophies.</h2>
      </div>

      <div className="case-grid">
        {featuredProjects.map((project, index) => {
          const hasSource = project.repoUrl && project.repoUrl !== "#";

          return (
            <article className="case-file" key={project.title} data-reveal>
              <div className="case-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="case-header">
                <h3>{project.title}</h3>
                <span className="project-status">{project.status}</span>
              </div>

              {project.angle ? <p className="project-angle">{project.angle}</p> : null}
              {project.question ? <p className="case-question">{project.question}</p> : null}
              <p>{project.summary}</p>
              {project.lesson ? <p className="project-lesson">{project.lesson}</p> : null}

              <ul className="stack-list" aria-label={`${project.title} tech stack`}>
                {project.stack.map((tech, index) => (
                  <li key={`${project.title}-${index}-${tech}`}>{tech}</li>
                ))}
              </ul>

              {hasSource ? (
                <div className="project-links">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {archivedProjects.length ? (
        <div className="case-archive" data-reveal>
          <p className="archive-label">Earlier experiments</p>
          <ul>
            {archivedProjects.map((project) => (
              <li key={`${project.title}-${project.status}`}>
                <span>{project.title}</span>
                <small>{project.status}</small>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
